/**
 * models/Table.js
 * Represents a physical table in the cafe.
 * Each table has a unique QR code URL that encodes /menu?table=N.
 * Currently supports tables 1-5 matching the frontend's table selector.
 * Designed to scale: just add more table documents.
 */

const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type:     Number,
      required: true,
      unique:   true,
      min:      1,
    },
    // Full URL encoded in the QR: https://yourdomain.com/menu?table=N
    qrCodeUrl: {
      type:    String,
      default: '',
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
    // Future: capacity, section (indoor/outdoor), status (occupied/free)
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

tableSchema.index({ tableNumber: 1 })

module.exports = mongoose.model('Table', tableSchema)
