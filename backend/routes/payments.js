/**
 * routes/payments.js
 * POST /api/payments/create-order  — initiate Razorpay
 * POST /api/payments/verify        — verify signature
 */

const router = require('express').Router()
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController')

router.post('/create-order', createPaymentOrder)
router.post('/verify',       verifyPayment)

module.exports = router
