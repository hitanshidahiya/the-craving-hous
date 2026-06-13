/**
 * controllers/paymentController.js
 * Handles Razorpay payment initiation and verification.
 */

const paymentService = require('../services/paymentService')
const catchAsync     = require('../utils/catchAsync')
const { sendSuccess, sendCreated } = require('../utils/response')

// POST /api/payments/create-order
const createPaymentOrder = catchAsync(async (req, res) => {
  const { orderId } = req.body

  if (!orderId) {
    return res.status(422).json({ success: false, message: 'orderId is required' })
  }

  const paymentDetails = await paymentService.createRazorpayOrder(orderId)
  sendCreated(res, paymentDetails, 'Payment order created')
})

// POST /api/payments/verify
const verifyPayment = catchAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(422).json({
      success: false,
      message: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are all required',
    })
  }

  const io = req.app.get('io')

  const result = await paymentService.verifyPayment(
    {
      razorpayOrderId:   razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    },
    io
  )

  sendSuccess(res, result, 'Payment verified successfully')
})

module.exports = { createPaymentOrder, verifyPayment }
