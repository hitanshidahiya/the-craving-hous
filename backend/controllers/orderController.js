/**
 * controllers/orderController.js
 * Handles HTTP for order routes.
 * Normalises frontend field values to backend enums before passing to service.
 */

const orderService = require('../services/orderService')
const catchAsync   = require('../utils/catchAsync')
const { sendSuccess, sendCreated } = require('../utils/response')

// Normalise frontend values to backend enums
const normaliseOrderType    = (t) => (t === 'dine-in' ? 'DINE_IN' : t === 'takeaway' ? 'TAKE_AWAY' : t)
const normalisePaymentMethod = (p) => (p === 'cash' ? 'CASH' : p === 'online' ? 'RAZORPAY' : p)

// POST /api/orders
const placeOrder = catchAsync(async (req, res) => {
  const io = req.app.get('io')

  const payload = {
    ...req.body,
    orderType:     normaliseOrderType(req.body.orderType),
    paymentMethod: normalisePaymentMethod(req.body.paymentMethod),
  }

  const { order, isDuplicate } = await orderService.placeOrder(payload, io)

  if (isDuplicate) {
    return sendSuccess(res, { order }, 'Order already placed (duplicate request)')
  }

  sendCreated(res, { order }, 'Order placed successfully')
})

// GET /api/orders/:orderId  — customer tracking
const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrder(req.params.orderId)
  sendSuccess(res, { order }, 'Order fetched')
})

// GET /api/admin/orders  [protected]
const getAdminOrders = catchAsync(async (req, res) => {
  const { status, page = 1, limit = 20, date } = req.query
  const result = await orderService.getAdminOrders({
    status,
    date,
    page:  parseInt(page,  10),
    limit: parseInt(limit, 10),
  })
  sendSuccess(res, result, 'Orders fetched')
})

// PATCH /api/admin/orders/:orderId/status  [protected]
const updateStatus = catchAsync(async (req, res) => {
  const io    = req.app.get('io')
  const order = await orderService.updateOrderStatus(
    req.params.orderId,
    req.body.status,
    req.admin._id,
    io
  )
  sendSuccess(res, { order }, `Order status updated to ${order.orderStatus}`)
})

module.exports = { placeOrder, getOrder, getAdminOrders, updateStatus }
