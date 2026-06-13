/**
 * repositories/paymentRepository.js
 * All database operations for Payment (Razorpay records).
 */

const Payment = require('../models/Payment')

class PaymentRepository {
  async create(data) {
    const payment = await Payment.create(data)
    return payment.toObject()
  }

  async findByRazorpayOrderId(razorpayOrderId) {
    return Payment.findOne({ razorpayOrderId }).lean()
  }

  async markPaid(razorpayOrderId, razorpayPaymentId) {
    return Payment.findOneAndUpdate(
      { razorpayOrderId },
      { razorpayPaymentId, status: 'PAID' },
      { new: true }
    ).lean()
  }

  async markFailed(razorpayOrderId) {
    return Payment.findOneAndUpdate(
      { razorpayOrderId },
      { status: 'FAILED' },
      { new: true }
    ).lean()
  }
}

module.exports = new PaymentRepository()
