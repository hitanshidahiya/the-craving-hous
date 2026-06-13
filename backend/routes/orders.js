/**
 * routes/orders.js
 * POST /api/orders       — place order (public)
 * GET  /api/orders/:id   — track order (public)
 */

const router = require('express').Router()
const { placeOrder, getOrder } = require('../controllers/orderController')
const { createOrderRules, validate } = require('../validators/orderValidator')
const { orderLimiter } = require('../middleware/rateLimiter')

router.post('/', orderLimiter, createOrderRules, validate, placeOrder)
router.get('/:orderId', getOrder)

module.exports = router
