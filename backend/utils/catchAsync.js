/**
 * utils/catchAsync.js
 * Wraps async route handlers so they don't need try/catch blocks.
 * Any rejected promise is forwarded to Express's next(err) handler.
 *
 * Usage:
 *   router.get('/route', catchAsync(async (req, res) => { ... }))
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = catchAsync
