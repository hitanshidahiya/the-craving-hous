/**
 * routes/auth.js
 * POST /api/auth/login
 * GET  /api/auth/me  (protected)
 */

const router       = require('express').Router()
const { login, getMe } = require('../controllers/authController')
const authenticate     = require('../middleware/authenticate')
const { loginRules, validate } = require('../validators/authValidator')
const { authLimiter } = require('../middleware/rateLimiter')

router.post('/login', authLimiter, loginRules, validate, login)
router.get('/me',     authenticate, getMe)

module.exports = router
