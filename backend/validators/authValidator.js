/**
 * validators/authValidator.js
 * express-validator rules for auth routes.
 */

const { body, validationResult } = require('express-validator')

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required'),
]

/**
 * Middleware that reads validationResult and short-circuits with 422
 * if any rule failed. Reused across all validators.
 */
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

module.exports = { loginRules, validate }
