/**
 * utils/response.js
 * Helper functions for sending consistent API responses.
 * All responses follow the same envelope:
 *   { success: true/false, message, data? }
 */

const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  const payload = { success: true, message }
  if (data !== null) payload.data = data
  return res.status(statusCode).json(payload)
}

const sendCreated = (res, data = null, message = 'Created') => {
  return sendSuccess(res, data, message, 201)
}

const sendError = (res, message = 'Something went wrong', statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message })
}

module.exports = { sendSuccess, sendCreated, sendError }
