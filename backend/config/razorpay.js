/**
 * config/razorpay.js
 * Configures and exports the Razorpay SDK instance.
 * Used by PaymentService for order creation and signature verification.
 */

const Razorpay = require('razorpay')
const { razorpay } = require('./env')

const razorpayInstance = new Razorpay({
  key_id:     razorpay.keyId,
  key_secret: razorpay.keySecret,
})

module.exports = razorpayInstance
