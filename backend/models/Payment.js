/**
 * models/Payment.js
 * Stores Razorpay payment records.
 * Created when a Razorpay order is initiated, updated after verification.
 * CASH orders do not create a Payment document.
 *
 * IMPORTANT: Payment verification happens ONLY server-side via
 * signature comparison. Frontend "success" callbacks are NEVER trusted.
 */

const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
  {
    // Reference to Order (both formats)
    orderId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    orderRef:        { type: String, required: true }, // human-readable orderId e.g. TCH1A2B

    // Razorpay IDs
    razorpayOrderId:   { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, default: '' },

    // Amount in paise (Razorpay uses smallest currency unit)
    amount: { type: Number, required: true },

    // Status mirrors Order.paymentStatus
    status: {
      type:    String,
      enum:    ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
)

paymentSchema.index({ razorpayOrderId: 1 })
paymentSchema.index({ orderId: 1 })

module.exports = mongoose.model('Payment', paymentSchema)
