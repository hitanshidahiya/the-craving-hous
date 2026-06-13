/**
 * validators/menuValidator.js
 * Validation rules for menu admin routes.
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

const VALID_CATEGORIES = [
  'combos', 'burgers', 'pasta', 'wraps', 'hotdog',
  'indo-chinese', 'sandwiches', 'garlic-bread', 'maggi',
  'fries', 'snacks', 'nachos', 'protein', 'frappe',
  'iced-coffee', 'hot-coffee', 'thick-shakes', 'mocktails',
  'chai', 'iced-tea', 'desserts',
]

const createMenuItemRules = [
  body('name')
    .trim().notEmpty().withMessage('Item name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(VALID_CATEGORIES).withMessage('Invalid category'),

  body('price')
    .isFloat({ min: 1 }).withMessage('Price must be a positive number'),

  body('description')
    .optional().isLength({ max: 300 }).withMessage('Description too long'),

  body('emoji')
    .optional().isLength({ max: 10 }).withMessage('Invalid emoji'),

  body('bestSeller')
    .optional().isBoolean().withMessage('bestSeller must be true or false'),
]

const updateMenuItemRules = [
  body('name')
    .optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name too long'),

  body('category')
    .optional().isIn(VALID_CATEGORIES).withMessage('Invalid category'),

  body('price')
    .optional().isFloat({ min: 1 }).withMessage('Price must be a positive number'),

  body('description')
    .optional().isLength({ max: 300 }).withMessage('Description too long'),

  body('bestSeller')
    .optional().isBoolean(),
]

module.exports = { createMenuItemRules, updateMenuItemRules, validate }
