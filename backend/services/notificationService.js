/**
 * services/notificationService.js
 * Notification service with a provider abstraction layer.
 * Supported providers: WhatsApp (Twilio), Email (Nodemailer)
 *
 * Architecture:
 *   OrderService / PaymentService
 *         ↓
 *   NotificationService  (event methods)
 *         ↓
 *   WhatsApp / Email providers
 *
 * Providers are only active if their env vars are set.
 * Missing credentials = notifications silently skipped (never crash order flow).
 */

const logger = require('../utils/logger')
const { twilio, smtp } = require('../config/env')

// ── WhatsApp Provider (Twilio) ───────────────────────────────
class WhatsAppProvider {
  constructor() {
    this.enabled = !!(twilio.accountSid && twilio.authToken && twilio.cafeNumber)
    if (this.enabled) {
      this.client = require('twilio')(twilio.accountSid, twilio.authToken)
    }
  }

  async send(to, message) {
    if (!this.enabled) return
    try {
      await this.client.messages.create({
        from: twilio.from,
        to:   `whatsapp:+91${to}`,
        body: message,
      })
      logger.debug(`WhatsApp sent to ${to}`)
    } catch (err) {
      logger.warn(`WhatsApp failed: ${err.message}`)
    }
  }

  // Notify cafe staff about new order
  async notifyStaff(message) {
    if (!this.enabled || !twilio.cafeNumber) return
    try {
      await this.client.messages.create({
        from: twilio.from,
        to:   twilio.cafeNumber,
        body: message,
      })
    } catch (err) {
      logger.warn(`Staff WhatsApp failed: ${err.message}`)
    }
  }
}

// ── Email Provider (Nodemailer) ──────────────────────────────
class EmailProvider {
  constructor() {
    this.enabled = !!(smtp.host && smtp.user && smtp.pass)
    if (this.enabled) {
      const nodemailer = require('nodemailer')
      this.transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: { user: smtp.user, pass: smtp.pass },
      })
    }
  }

  async send(to, subject, html) {
    if (!this.enabled) return
    try {
      await this.transporter.sendMail({
        from:    `"The Craving Hous" <${smtp.user}>`,
        to,
        subject,
        html,
      })
      logger.debug(`Email sent to ${to}`)
    } catch (err) {
      logger.warn(`Email failed: ${err.message}`)
    }
  }
}

// ── Notification Service ─────────────────────────────────────
class NotificationService {
  constructor() {
    this.whatsapp = new WhatsAppProvider()
    this.email    = new EmailProvider()
  }

  async orderReceived(order) {
    const msg = this._formatOrderReceived(order)

    // Notify customer
    this.whatsapp.send(order.phone, msg.customer)

    // Notify cafe staff
    this.whatsapp.notifyStaff(msg.staff)

    // Email cafe
    if (smtp.cafeEmail) {
      this.email.send(smtp.cafeEmail, `New Order: ${order.orderId}`, msg.emailHtml)
    }
  }

  async orderStatusChanged(order, newStatus) {
    const messages = {
      ACCEPTED:  `✅ Your order ${order.orderId} has been accepted! We're preparing it now. Est. time: ${order.estimatedPreparationTime}.`,
      PREPARING: `👨‍🍳 Your order ${order.orderId} is being prepared. Hang tight!`,
      READY:     `🎉 Your order ${order.orderId} is ready! ${order.orderType === 'DINE_IN' ? `It's on its way to table ${order.tableNumber}.` : 'Please collect it at the counter.'}`,
      COMPLETED: `🌿 Order ${order.orderId} completed. Thank you for visiting The Craving Hous! Rate us on Google: https://share.google/rbjDuoKBnzPNi9ByT`,
      CANCELLED: `❌ Your order ${order.orderId} has been cancelled. For assistance, contact us on Instagram: @thecravinghous`,
    }

    const msg = messages[newStatus]
    if (msg) {
      this.whatsapp.send(order.phone, msg)
    }
  }

  async paymentConfirmed(order) {
    const msg = `💳 Payment of ₹${order.totalAmount} confirmed for order ${order.orderId}. Thank you!`
    this.whatsapp.send(order.phone, msg)
  }

  // ── Private message formatters ───────────────────────────────

  _formatOrderReceived(order) {
    const itemList = order.items
      .map((i) => `  ${i.emoji} ${i.itemName} ×${i.quantity} — ₹${i.subtotal}`)
      .join('\n')

    const typeInfo = order.orderType === 'DINE_IN'
      ? `🍽️ Dine In — Table ${order.tableNumber}`
      : '🥡 Take Away'

    const customer = `🎉 Order confirmed!\n\nOrder ID: ${order.orderId}\n${typeInfo}\n\nItems:\n${itemList}\n\nTotal: ₹${order.totalAmount}\nPayment: ${order.paymentMethod === 'CASH' ? 'Cash at Counter' : 'Online'}\nEst. Time: ${order.estimatedPreparationTime}\n\nThank you for choosing The Craving Hous! 🌿`

    const staff = `🔔 New Order!\n\nID: ${order.orderId}\nCustomer: ${order.customerName} (${order.phone})\n${typeInfo}\nTotal: ₹${order.totalAmount} (${order.paymentMethod})\n\nItems:\n${itemList}`

    const emailHtml = `
      <h2>New Order: ${order.orderId}</h2>
      <p><strong>Customer:</strong> ${order.customerName} (${order.phone})</p>
      <p><strong>Type:</strong> ${typeInfo}</p>
      <p><strong>Items:</strong></p>
      <ul>${order.items.map((i) => `<li>${i.emoji} ${i.itemName} ×${i.quantity} — ₹${i.subtotal}</li>`).join('')}</ul>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <p><strong>Payment:</strong> ${order.paymentMethod}</p>
    `

    return { customer, staff, emailHtml }
  }
}

module.exports = new NotificationService()
