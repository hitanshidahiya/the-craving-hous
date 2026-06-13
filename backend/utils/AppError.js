/**
 * utils/AppError.js
 * Custom error class for all operational errors.
 * Carries an HTTP status code so the global error handler
 * can send the right response without guessing.
 *
 * Usage:
 *   throw new AppError('Order not found', 404)
 *   throw new AppError('Unauthorized', 401)
 */

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode  = statusCode
    this.isOperational = true // distinguishes from programming errors
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
