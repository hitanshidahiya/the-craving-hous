/**
 * utils/generateOrderId.js
 * Generates a unique order ID matching the frontend's format:
 *   TCH + timestamp (base36, uppercase) + 3 random chars (base36, uppercase)
 *
 * Example: TCH1A2B3C4D
 *
 * The backend is the authoritative source of order IDs —
 * the frontend-generated ID from the confirmation screen is ONLY
 * a fallback for the offline/demo mode.
 */

function generateOrderId() {
  const ts     = Date.now().toString(36).toUpperCase()
  const rand   = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `TCH${ts}${rand}`
}

module.exports = generateOrderId
