/**
 * middleware/authenticate.js
 * Verifies JWT on protected admin routes.
 * Attaches the decoded admin payload to req.admin.
 *
 * Usage:
 *   router.use(authenticate)        — protect entire router
 *   router.post('/route', authenticate, handler)  — single route
 */

const Admin      = require('../models/Admin')
const authService = require('../services/authService')
const AppError   = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

const authenticate = catchAsync(async (req, res, next) => {
  // Accept token from Authorization header or cookie
  let token

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.token) {
    token = req.cookies.token
  }

  if (!token) {
    throw new AppError('Authentication required. Please log in.', 401)
  }

  // Verify token
  let decoded
  try {
    decoded = authService.verifyToken(token)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Session expired. Please log in again.', 401)
    }
    throw new AppError('Invalid token. Please log in again.', 401)
  }

  // Check admin still exists
  const admin = await Admin.findById(decoded.id).lean()
  if (!admin) {
    throw new AppError('Admin no longer exists.', 401)
  }

  req.admin = admin
  next()
})

module.exports = authenticate
