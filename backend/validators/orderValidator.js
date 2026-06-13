/**
 * validators/orderValidator.js
 * Validation rules for POST /api/orders.
 *
 * Maps frontend field names:
 *   orderType: 'dine-in' | 'takeaway'  →  we normalise to DINE_IN / TAKE_AWAY in controller
 *   paymentMethod: 'cash' | 'online'   →  normalised to CASH / RAZORPAY
 */

const { body, validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()[0].msg,
      errors:  errors.array().map((e) => ({ field: e.path, message: e.msg })),
    })
  }
  next()
}

const createOrderRules = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required')
    .isLength({ max: 80 }).withMessage('Name is too long'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),

  body('orderType')
    .notEmpty().withMessage('Order type is required')
    .isIn(['DINE_IN', 'TAKE_AWAY', 'dine-in', 'takeaway'])
    .withMessage('Order type must be DINE_IN or TAKE_AWAY'),

  body('tableNumber')
    .optional({ nullable: true })
    .isInt({ min: 1, max: 50 }).withMessage('Invalid table number'),

  body('items')
    .isArray({ min: 1 }).withMessage('At least one item is required'),

  body('items.*.itemId')
    .notEmpty().withMessage('Item ID is required'),

  body('items.*.quantity')
    .isInt({ min: 1, max: 20 }).withMessage('Item quantity must be between 1 and 20'),

  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['CASH', 'RAZORPAY', 'cash', 'online'])
    .withMessage('Payment method must be CASH or RAZORPAY'),

  body('specialInstructions')
    .optional()
    .isLength({ max: 300 }).withMessage('Instructions too long (max 300 chars)'),
]

const updateStatusRules = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'])
    .withMessage('Invalid order status'),
]

module.exports = { createOrderRules, updateStatusRules, validate }
