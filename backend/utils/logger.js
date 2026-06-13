/**
 * utils/logger.js
 * Centralised structured logger using Winston.
 * In production: JSON format (easy to ingest into log services).
 * In development: colourised, human-readable format.
 * Used everywhere instead of console.log for consistent log levels.
 */

const { createLogger, format, transports } = require('winston')
const { env } = require('../config/env')

const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
    return `${timestamp} [${level}] ${message}${extra}`
  })
)

const prodFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
)

const logger = createLogger({
  level: env === 'production' ? 'warn' : 'debug',
  format: env === 'production' ? prodFormat : devFormat,
  transports: [
    new transports.Console(),
    // Add file transport in production if needed:
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' }),
  ],
})

module.exports = logger
