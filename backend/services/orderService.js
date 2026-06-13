/**
 * services/orderService.js
 * The most important service in the system.
 * Handles the full order placement flow:
 *   1. Idempotency check (prevent duplicate orders)
 *   2. Validate & snapshot items (prices from DB, not frontend)
 *   3. Calculate totals server-side
 *   4. Save order
 *   5. Upsert customer record
 *   6. Emit socket event
 *   7. Trigger notifications
 *   8. Log activity
 */

const orderRepository    = require('../repositories/orderRepository')
const customerRepository = require('../repositories/customerRepository')
const menuRepository     = require('../repositories/menuRepository')
const activityLogRepo    = require('../repositories/activityLogRepository')
const notificationService = require('./notificationService')
const generateOrderId    = require('../utils/generateOrderId')
const AppError           = require('../utils/AppError')

// GST is currently disabled in the cafe (matches cafeInfo.gstEnabled: false)
const GST_ENABLED = false
const GST_RATE    = 0.05

class OrderService {
  /**
   * Place a new order.
   * @param {object} payload - validated request body
   * @param {object} io      - Socket.IO instance
   */
  async placeOrder(payload, io) {
    const {
      customerName,
      phone,
      orderType,
      tableNumber,
      items,          // [{ itemId, quantity }] — prices recalculated from DB
      paymentMethod,
      specialInstructions = '',
      idempotencyKey,
    } = payload

    // ── 1. Idempotency check ─────────────────────────────────────
    if (idempotencyKey) {
      const existing = await orderRepository.findByIdempotencyKey(idempotencyKey)
      if (existing) {
        // Return the existing order rather than creating a duplicate
        return { order: existing, isDuplicate: true }
      }
    }

    // ── 2. Validate table for dine-in ────────────────────────────
    if (orderType === 'DINE_IN' && !tableNumber) {
      throw new AppError('Table number is required for Dine In orders', 400)
    }

    // ── 3. Snapshot items from DB (authoritative prices) ─────────
    const snapshotItems = await this._snapshotItems(items)

    // ── 4. Calculate totals server-side ─────────────────────────
    const subtotal = snapshotItems.reduce((sum, i) => sum + i.subtotal, 0)
    const tax      = GST_ENABLED ? Math.round(subtotal * GST_RATE) : 0
    const total    = subtotal + tax

    // ── 5. Estimate prep time ────────────────────────────────────
    const totalQty = snapshotItems.reduce((s, i) => s + i.quantity, 0)
    const estimatedPreparationTime = this._estimatePrepTime(totalQty)

    // ── 6. Save order ────────────────────────────────────────────
    const orderId = generateOrderId()

    const order = await orderRepository.create({
      orderId,
      idempotencyKey: idempotencyKey || undefined,
      customerName,
      phone,
      orderType,
      tableNumber:    orderType === 'DINE_IN' ? tableNumber : null,
      items:          snapshotItems,
      subtotal,
      tax,
      totalAmount:    total,
      paymentMethod,
      paymentStatus:  'PENDING',
      orderStatus:    'PENDING',
      specialInstructions,
      estimatedPreparationTime,
    })

    // ── 7. Upsert customer analytics ────────────────────────────
    customerRepository.upsertFromOrder(phone, customerName, total).catch(() => {})

    // ── 8. Emit socket event to admin panel ──────────────────────
    if (io) {
      io.to('admin-room').emit('orderCreated', {
        orderId:      order.orderId,
        customerName: order.customerName,
        totalAmount:  order.totalAmount,
        orderType:    order.orderType,
        tableNumber:  order.tableNumber,
        itemCount:    snapshotItems.length,
        createdAt:    order.createdAt,
      })
    }

    // ── 9. Send notification ─────────────────────────────────────
    notificationService.orderReceived(order).catch(() => {})

    // ── 10. Activity log ─────────────────────────────────────────
    activityLogRepo.log({
      action:     'ORDER_CREATED',
      entityType: 'ORDER',
      entityId:   order.orderId,
      details:    { totalAmount: total, paymentMethod },
    })

    return { order, isDuplicate: false }
  }

  /**
   * Get order by orderId (for customer tracking page).
   */
  async getOrder(orderId) {
    const order = await orderRepository.findByOrderId(orderId)
    if (!order) throw new AppError('Order not found', 404)
    return order
  }

  /**
   * Admin: update order status with full side-effects.
   */
  async updateOrderStatus(orderId, newStatus, adminId, io) {
    const VALID_TRANSITIONS = {
      PENDING:   ['ACCEPTED', 'CANCELLED'],
      ACCEPTED:  ['PREPARING', 'CANCELLED'],
      PREPARING: ['READY'],
      READY:     ['COMPLETED'],
      COMPLETED: [],
      CANCELLED: [],
    }

    const order = await orderRepository.findByOrderId(orderId)
    if (!order) throw new AppError('Order not found', 404)

    const allowed = VALID_TRANSITIONS[order.orderStatus] || []
    if (!allowed.includes(newStatus)) {
      throw new AppError(
        `Cannot transition order from ${order.orderStatus} to ${newStatus}`,
        400
      )
    }

    const updated = await orderRepository.updateStatus(orderId, newStatus)

    // Emit to the customer's room (they join by orderId)
    if (io) {
      const eventMap = {
        ACCEPTED:  'orderAccepted',
        PREPARING: 'orderPreparing',
        READY:     'orderReady',
        COMPLETED: 'orderCompleted',
      }
      const event = eventMap[newStatus]
      if (event) {
        io.to(`order-${orderId}`).emit(event, {
          orderId,
          status: newStatus,
          message: this._statusMessage(newStatus),
        })
      }
    }

    // Notification
    notificationService.orderStatusChanged(updated, newStatus).catch(() => {})

    // Activity log
    activityLogRepo.log({
      adminId,
      action:     `ORDER_${newStatus}`,
      entityType: 'ORDER',
      entityId:   orderId,
      details:    { from: order.orderStatus, to: newStatus },
    })

    return updated
  }

  /**
   * Admin: get all orders with filters.
   */
  async getAdminOrders(filters) {
    return orderRepository.findAll(filters)
  }

  // ── Private helpers ──────────────────────────────────────────

  /**
   * Fetch items from DB and build snapshot array.
   * Uses DB price, not the price sent by the client.
   * Throws if any item is unavailable or not found.
   */
  async _snapshotItems(items) {
    const snapshots = []

    for (const { itemId, quantity } of items) {
      const menuItem = await menuRepository.findById(itemId)

      if (!menuItem) {
        throw new AppError(`Item not found: ${itemId}`, 400)
      }
      if (!menuItem.available) {
        throw new AppError(`"${menuItem.name}" is currently unavailable`, 400)
      }

      snapshots.push({
        itemId:    menuItem._id.toString(),
        itemName:  menuItem.name,
        itemPrice: menuItem.price,
        emoji:     menuItem.emoji,
        quantity,
        subtotal:  menuItem.price * quantity,
      })
    }

    return snapshots
  }

  _estimatePrepTime(totalQty) {
    if (totalQty <= 2) return '10–15 mins'
    if (totalQty <= 5) return '15–20 mins'
    return '20–30 mins'
  }

  _statusMessage(status) {
    const messages = {
      ACCEPTED:  'Your order has been accepted! We\'re getting started.',
      PREPARING: 'Our kitchen is working on your order 👨‍🍳',
      READY:     'Your order is ready! 🎉',
      COMPLETED: 'Order completed. Enjoy your meal! 🌿',
      CANCELLED: 'Your order has been cancelled.',
    }
    return messages[status] || ''
  }
}

module.exports = new OrderService()
