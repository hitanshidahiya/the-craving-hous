/**
 * repositories/customerRepository.js
 * All database operations for Customer.
 */

const Customer = require('../models/Customer')

class CustomerRepository {
  async findByPhone(phone) {
    return Customer.findOne({ phone }).lean()
  }

  /**
   * Upsert: create customer if first order, update stats atomically otherwise.
   * Uses $inc and $set for atomic updates — safe under concurrent orders.
   */
  async upsertFromOrder(phone, name, totalAmount) {
    return Customer.findOneAndUpdate(
      { phone },
      {
        $set:  { name, lastOrderDate: new Date() },
        $inc:  { totalOrders: 1, totalSpent: totalAmount },
      },
      { upsert: true, new: true }
    ).lean()
  }

  async findAll({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit
    const [customers, total] = await Promise.all([
      Customer.find().sort({ lastOrderDate: -1 }).skip(skip).limit(limit).lean(),
      Customer.countDocuments(),
    ])
    return { customers, total, page, limit, pages: Math.ceil(total / limit) }
  }

  async countRepeat() {
    return Customer.countDocuments({ totalOrders: { $gt: 1 } })
  }

  async getTopSpenders(limit = 5) {
    return Customer.find().sort({ totalSpent: -1 }).limit(limit).lean()
  }
}

module.exports = new CustomerRepository()
