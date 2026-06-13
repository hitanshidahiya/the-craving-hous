/**
 * socket/index.js
 * Socket.IO event handling.
 *
 * Rooms:
 *   'admin-room'        — all connected admin panel instances
 *   'order-{orderId}'   — customer tracking a specific order
 *
 * Admin receives:
 *   orderCreated        — new order placed
 *   paymentSuccess      — Razorpay payment verified
 *
 * Customer receives (in their order room):
 *   orderAccepted       — admin accepted
 *   orderPreparing      — kitchen started
 *   orderReady          — food is ready
 *   orderCompleted      — order completed
 */

const logger = require('../utils/logger')

function initSocket(io) {
  io.on('connection', (socket) => {
    logger.debug(`Socket connected: ${socket.id}`)

    // ── Admin joins the admin room ───────────────────────────
    socket.on('joinAdmin', () => {
      socket.join('admin-room')
      logger.debug(`Socket ${socket.id} joined admin-room`)
    })

    // ── Customer joins their order's room ───────────────────
    // Frontend calls: socket.emit('trackOrder', { orderId })
    socket.on('trackOrder', ({ orderId }) => {
      if (!orderId) return
      const room = `order-${orderId}`
      socket.join(room)
      logger.debug(`Socket ${socket.id} tracking order: ${orderId}`)

      // Acknowledge
      socket.emit('trackingStarted', { orderId, message: 'Now tracking your order' })
    })

    socket.on('disconnect', () => {
      logger.debug(`Socket disconnected: ${socket.id}`)
    })
  })
}

module.exports = initSocket
