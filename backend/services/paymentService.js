/**
 * services/paymentService.js
 * Handles Razorpay payment lifecycle:
 *   1. Create a Razorpay order (returns payment details to frontend)
 *   2. Verify payment signature (MUST happen server-side — never trust frontend)
 *   3. Update order payment status
 *
 * Flow:
 *   Frontend: placeOrder() → POST /payments/create-order → opens Razorpay modal
 *   User pays → Razorpay calls frontend callback with { razorpay_payment_id, ... }
 *   Frontend: POST /payments/verify → backend verifies → marks order PAID
 */

const crypto          = require('crypto')
const razorpay        = require('../config/razorpay')
const paymentRepository = require('../repositories/paymentRepository')
const orderRepository   = require('../repositories/orderRepository')
const activityLogRepo   = require('../repositories/activityLogRepository')
const notificationService = require('./notificationService')
const AppError          = require('../utils/AppError')
const { razorpay: rzpConfig } = require('../config/env')

class PaymentService {
  /**
   * Create a Razorpay order for a given cafe order.
   * @param {string} orderId - the TCH order ID
   * @returns Razorpay order details for the frontend SDK
   */
  async createRazorpayOrder(orderId) {
    const order = await orderRepository.findByOrderId(orderId)
    if (!order) throw new AppError('Order not found', 404)

    if (order.paymentMethod !== 'RAZORPAY') {
      throw new AppError('This order uses cash payment', 400)
    }
    if (order.paymentStatus === 'PAID') {
      throw new AppError('This order is already paid', 400)
    }

    // Razorpay amounts are in paise (1 INR = 100 paise)
    const amountInPaise = order.totalAmount * 100

    const razorpayOrder = await razorpay.orders.create({
      amount:   amountInPaise,
      currency: 'INR',
      receipt:  order.orderId,
      notes: {
        orderId:      order.orderId,
        customerName: order.customerName,
        phone:        order.phone,
      },
    })

    // Persist the Razorpay order record
    await paymentRepository.create({
      orderId:         order._id,
      orderRef:        order.orderId,
      razorpayOrderId: razorpayOrder.id,
      amount:          amountInPaise,
      status:          'PENDING',
    })

    return {
      razorpayOrderId: razorpayOrder.id,
      amount:          amountInPaise,
      currency:        'INR',
      keyId:           rzpConfig.keyId, // send to frontend for SDK init
      orderId:         order.orderId,
      customerName:    order.customerName,
      phone:           order.phone,
    }
  }

  /**
   * Verify Razorpay payment signature.
   * This is the ONLY authoritative payment verification.
   * Never mark an order as paid without this check.
   *
   * @param {string} razorpayOrderId   - from Razorpay
   * @param {string} razorpayPaymentId - from Razorpay
   * @param {string} razorpaySignature - from Razorpay
   */
  async verifyPayment({ razorpayOrderId, razorpayPaymentId, razorpaySignature }, io) {
    // ── Signature verification ───────────────────────────────────
    const body      = `${razorpayOrderId}|${razorpayPaymentId}`
    const expected  = crypto
      .createHmac('sha256', rzpConfig.keySecret)
      .update(body)
      .digest('hex')

    if (expected !== razorpaySignature) {
      // Mark failed in DB before throwing
      await paymentRepository.markFailed(razorpayOrderId).catch(() => {})
      throw new AppError('Payment verification failed: invalid signature', 400)
    }

    // ── Update payment record ────────────────────────────────────
    const payment = await paymentRepository.findByRazorpayOrderId(razorpayOrderId)
    if (!payment) throw new AppError('Payment record not found', 404)

    await paymentRepository.markPaid(razorpayOrderId, razorpayPaymentId)

    // ── Update order payment status ──────────────────────────────
    const order = await orderRepository.findById(payment.orderId)
    await orderRepository.updatePaymentStatus(order.orderId, 'PAID')

    // ── Emit socket event ────────────────────────────────────────
    if (io) {
      io.to('admin-room').emit('paymentSuccess', {
        orderId:         order.orderId,
        amount:          order.totalAmount,
        razorpayPaymentId,
      })
    }

    // ── Notification ─────────────────────────────────────────────
    notificationService.paymentConfirmed(order).catch(() => {})

    // ── Activity log ─────────────────────────────────────────────
    activityLogRepo.log({
      action:     'PAYMENT_VERIFIED',
      entityType: 'ORDER',
      entityId:   order.orderId,
      details:    { razorpayPaymentId, amount: order.totalAmount },
    })

    return { orderId: order.orderId, status: 'PAID' }
  }
}

module.exports = new PaymentService()
