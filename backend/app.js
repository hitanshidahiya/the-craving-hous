/**
 * app.js
 * Express application setup.
 * Configures all middleware, mounts all routes, and registers the error handler.
 * Does NOT start the HTTP server — that's server.js.
 *
 * Middleware order matters:
 *   1. Security headers (Helmet)
 *   2. CORS
 *   3. Rate limiting
 *   4. Body parsing
 *   5. Security sanitisation (mongo sanitize, xss)
 *   6. Routes
 *   7. 404 handler
 *   8. Global error handler  ← MUST be last
 */

const express       = require('express')
const helmet        = require('helmet')
const cors          = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean      = require('xss-clean')

const { client, isProduction } = require('./config/env')
const { apiLimiter }           = require('./middleware/rateLimiter')
const errorHandler             = require('./middleware/errorHandler')
const logger                   = require('./utils/logger')

// Route modules
const authRoutes    = require('./routes/auth')
const menuRoutes    = require('./routes/menu')
const orderRoutes   = require('./routes/orders')
const paymentRoutes = require('./routes/payments')
const adminRoutes   = require('./routes/admin')

const app = express()

// ── 1. Security headers ──────────────────────────────────────
app.use(helmet())

// ── 2. CORS ──────────────────────────────────────────────────
app.use(cors({
  origin:      client.url,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── 3. Global rate limit ─────────────────────────────────────
app.use('/api', apiLimiter)

// ── 4. Body parsing ──────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ── 5. Security sanitisation ─────────────────────────────────
// Prevents NoSQL injection: { "$gt": "" } → sanitised
app.use(mongoSanitize())
// Prevents XSS: <script>alert('xss')</script> → stripped
app.use(xssClean())

// ── 6. Request logging (dev only) ────────────────────────────
if (!isProduction) {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.originalUrl}`)
    next()
  })
}

// ── 7. Health check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 8. Routes ─────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/menu',     menuRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin',    adminRoutes)

// ── 9. 404 handler ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` })
})

// ── 10. Global error handler (MUST be last) ───────────────────
app.use(errorHandler)

module.exports = app
