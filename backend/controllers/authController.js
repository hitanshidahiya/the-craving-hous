/**
 * controllers/authController.js
 * Handles HTTP for auth routes. Delegates logic to authService.
 */

const authService = require('../services/authService')
const catchAsync  = require('../utils/catchAsync')
const { sendSuccess } = require('../utils/response')

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const { token, admin } = await authService.login(email, password)

  sendSuccess(res, { token, admin }, 'Login successful')
})

// Lightweight token check — the middleware already verified it
const getMe = catchAsync(async (req, res) => {
  sendSuccess(res, { admin: req.admin }, 'Authenticated')
})

module.exports = { login, getMe }
