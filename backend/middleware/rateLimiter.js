/**
 * middleware/rateLimiter.js
 * Rate limiting configurations for different route groups.
 * Prevents brute-force, DDoS, and order flooding.
 */

const rateLimit = require('express-rate-limit')

const handler = (req, res) => {
  res.status(429).json({
    success: false,
    message: 'Too many requests. Please slow down and try again later.',
  })
}

// General API limiter — 100 req/15 min per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      100,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
})

// Auth limiter — 10 attempts/15 min (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
  message: 'Too many login attempts. Please try again in 15 minutes.',
})

// Order creation — 20 orders/hour per IP (prevent spam)
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max:      20,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
})

module.exports = { apiLimiter, authLimiter, orderLimiter }
