/**
 * repositories/orderRepository.js
 * All database operations for Order.
 */

const Order = require('../models/Order')

class OrderRepository {
  async create(data) {
    const order = await Order.create(data)
    return order.toObject()
  }

  async findByOrderId(orderId) {
    return Order.findOne({ orderId }).lean()
  }

  async findById(id) {
    return Order.findById(id).lean()
  }

  async findByIdempotencyKey(key) {
    return Order.findOne({ idempotencyKey: key }).lean()
  }

  async updateStatus(orderId, orderStatus) {
    return Order.findOneAndUpdate(
      { orderId },
      { orderStatus },
      { new: true }
    ).lean()
  }

  async updatePaymentStatus(orderId, paymentStatus) {
    return Order.findOneAndUpdate(
      { orderId },
      { paymentStatus },
      { new: true }
    ).lean()
  }

  /**
   * Admin: paginated list with optional status filter.
   */
  async findAll({ status, page = 1, limit = 20, date } = {}) {
    const query = {}
    if (status) query.orderStatus = status

    if (date) {
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      const end = new Date(date)
      end.setHours(23, 59, 59, 999)
      query.createdAt = { $gte: start, $lte: end }
    }

    const skip = (page - 1) * limit
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ])

    return { orders, total, page, limit, pages: Math.ceil(total / limit) }
  }

  /**
   * Analytics helpers
   */
  async getRevenueSince(since) {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: since },
          orderStatus: { $nin: ['CANCELLED'] },
          paymentStatus: { $in: ['PAID', 'PENDING'] }, // include CASH orders
        },
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    ])
    return result[0] || { total: 0, count: 0 }
  }

  async getPopularItems(since, limit = 5) {
    return Order.aggregate([
      { $match: { createdAt: { $gte: since }, orderStatus: { $nin: ['CANCELLED'] } } },
      { $unwind: '$items' },
      {
        $group: {
          _id:      '$items.itemName',
          emoji:    { $first: '$items.emoji' },
          count:    { $sum: '$items.quantity' },
          revenue:  { $sum: '$items.subtotal' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ])
  }

  async getPeakHours(since) {
    return Order.aggregate([
      { $match: { createdAt: { $gte: since }, orderStatus: { $nin: ['CANCELLED'] } } },
      { $group: { _id: { $hour: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ])
  }

  async countByStatus() {
    return Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    ])
  }

  async getTodayOrders() {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return Order.find({ createdAt: { $gte: start } }).sort({ createdAt: -1 }).lean()
  }
}

module.exports = new OrderRepository()
