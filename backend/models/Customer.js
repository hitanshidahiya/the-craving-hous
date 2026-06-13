/**
 * models/Customer.js
 * Auto-created/updated when an order is placed.
 * Identified by phone number (no login required for customers).
 * Analytics are updated atomically in the Order service.
 *
 * Designed for future: loyalty points, preferences, saved addresses.
 */

const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
  {
    name: {
      type:  String,
      trim:  true,
    },
    phone: {
      type:     String,
      required: true,
      unique:   true,
      match:    [/^[6-9]\d{9}$/, 'Invalid Indian phone number'],
    },
    totalOrders: {
      type:    Number,
      default: 0,
    },
    totalSpent: {
      type:    Number,
      default: 0,
    },
    lastOrderDate: {
      type: Date,
    },
    // Future: loyaltyPoints, tier, preferences
  },
  { timestamps: true }
)

customerSchema.index({ phone: 1 })

module.exports = mongoose.model('Customer', customerSchema)
