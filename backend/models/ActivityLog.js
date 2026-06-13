/**
 * models/ActivityLog.js
 * Immutable audit trail of admin actions.
 * Written after every admin operation — never updated, never deleted.
 * Used for accountability and debugging.
 *
 * Examples:
 *   ORDER_ACCEPTED, ORDER_CANCELLED, MENU_ITEM_ADDED,
 *   PRICE_CHANGED, ITEM_HIDDEN, ITEM_RESTORED
 */

const mongoose = require('mongoose')

const activityLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Admin',
      // nullable for system-triggered events
    },
    action: {
      type:     String,
      required: true,
      // e.g. 'ORDER_ACCEPTED', 'MENU_ITEM_DELETED', 'PRICE_CHANGED'
    },
    entityType: {
      type: String,
      enum: ['ORDER', 'MENU_ITEM', 'TABLE', 'ADMIN', 'SYSTEM'],
    },
    entityId: {
      type: String, // can be ObjectId string or orderId
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      // e.g. { from: 'PENDING', to: 'ACCEPTED' } or { oldPrice: 99, newPrice: 119 }
    },
    timestamp: {
      type:    Date,
      default: Date.now,
      index:   true,
    },
  },
  {
    // No updatedAt — logs are immutable
    timestamps: { createdAt: 'timestamp', updatedAt: false },
  }
)

activityLogSchema.index({ adminId: 1, timestamp: -1 })
activityLogSchema.index({ entityType: 1, entityId: 1 })

module.exports = mongoose.model('ActivityLog', activityLogSchema)
