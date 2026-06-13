/**
 * models/Order.js
 * Core order schema.
 *
 * CRITICAL: Items are stored as complete snapshots (name, price at time of order).
 * This means historical orders remain accurate even if menu prices change later.
 * Do NOT store only itemId and look up the price at read time.
 *
 * orderId is the human-readable ID shown to customers (e.g. TCH1A2B3C).
 * _id is the internal MongoDB ObjectId used for internal references.
 *
 * idempotencyKey prevents duplicate orders on network retry / double-tap.
 */

const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    itemId:    { type: String, required: true },   // MenuItem._id (string) for reference
    itemName:  { type: String, required: true },   // snapshot
    itemPrice: { type: Number, required: true },   // snapshot — price at order time
    emoji:     { type: String, default: '🍽️' },   // snapshot — for display
    quantity:  { type: Number, required: true, min: 1 },
    subtotal:  { type: Number, required: true },   // itemPrice * quantity
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    // Human-readable order ID shown to customer
    orderId: {
      type:     String,
      required: true,
      unique:   true,
      index:    true,
    },

    // Idempotency — prevents duplicate orders on retry
    idempotencyKey: {
      type:   String,
      unique: true,
      sparse: true, // optional field, but unique when present
    },

    // Customer info (snapshot at order time)
    customerName: {
      type:     String,
      required: [true, 'Customer name is required'],
      trim:     true,
    },
    phone: {
      type:     String,
      required: [true, 'Phone is required'],
      match:    [/^[6-9]\d{9}$/, 'Invalid Indian phone number'],
      index:    true,
    },

    // Order type
    orderType: {
      type:    String,
      enum:    ['DINE_IN', 'TAKE_AWAY'],
      required: true,
    },

    tableNumber: {
      type:     Number,
      default:  null,
      // Required only for DINE_IN — validated in service layer
    },

    // Items (complete snapshots)
    items: {
      type:     [orderItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'Order must have at least one item',
      },
    },

    // Financials
    subtotal:    { type: Number, required: true },
    tax:         { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    // Payment
    paymentMethod: {
      type:    String,
      enum:    ['CASH', 'RAZORPAY'],
      required: true,
    },
    paymentStatus: {
      type:    String,
      enum:    ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },

    // Order lifecycle
    orderStatus: {
      type:    String,
      enum:    ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
      index:   true,
    },

    specialInstructions: {
      type:    String,
      default: '',
      trim:    true,
      maxlength: [300, 'Instructions too long'],
    },

    estimatedPreparationTime: {
      type:    String,
      default: '15–20 mins',
    },

    // Future: branch, assignedStaff, deliveryAddress, couponCode, discount
  },
  { timestamps: true }
)

orderSchema.index({ createdAt: -1 })
orderSchema.index({ orderStatus: 1, createdAt: -1 })
orderSchema.index({ phone: 1, createdAt: -1 })

module.exports = mongoose.model('Order', orderSchema)
