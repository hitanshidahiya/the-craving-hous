/**
 * middleware/errorHandler.js
 * Global Express error handler. Must be registered LAST in app.js.
 *
 * Handles:
 *   - AppError (operational errors with known status codes)
 *   - Mongoose validation errors
 *   - Mongoose duplicate key errors
 *   - JWT errors
 *   - Unknown errors (500)
 *
 * Always returns: { success: false, message: "..." }
 */

const logger   = require('../utils/logger')
const AppError = require('../utils/AppError')
const { isProduction } = require('../config/env')

// ── Error transformers ─────────────────────────────────────────

function handleCastError(err) {
  return new AppError(`Invalid value for field: ${err.path}`, 400)
}

function handleValidationError(err) {
  const messages = Object.values(err.errors).map((e) => e.message)
  return new AppError(`Validation failed: ${messages.join('. ')}`, 400)
}

function handleDuplicateKeyError(err) {
  const field = Object.keys(err.keyValue)[0]
  return new AppError(`Duplicate value for field: ${field}`, 409)
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again.', 401)
}

function handleJWTExpiredError() {
  return new AppError('Session expired. Please log in again.', 401)
}

// ── Main error handler ─────────────────────────────────────────

module.exports = (err, req, res, next) => {
  let error = err

  // Transform Mongoose / JWT errors into AppErrors
  if (err.name === 'CastError')             error = handleCastError(err)
  if (err.name === 'ValidationError')       error = handleValidationError(err)
  if (err.code === 11000)                   error = handleDuplicateKeyError(err)
  if (err.name === 'JsonWebTokenError')     error = handleJWTError()
  if (err.name === 'TokenExpiredError')     error = handleJWTExpiredError()

  // Log unexpected errors
  if (!error.isOperational) {
    logger.error('Unexpected error:', {
      message: err.message,
      stack:   err.stack,
      url:     req.originalUrl,
      method:  req.method,
    })
  }

  const statusCode = error.statusCode || 500
  const message    = error.isOperational ? error.message : 'Something went wrong. Please try again.'

  const response = { success: false, message }

  // Include stack trace in development (never in production)
  if (!isProduction && !error.isOperational) {
    response.stack = err.stack
  }

  res.status(statusCode).json(response)
}
