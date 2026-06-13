/**
 * database/connect.js
 * Establishes MongoDB Atlas connection via Mongoose.
 * Includes retry logic and connection event logging.
 * Called once from server.js before the HTTP server starts.
 */

const mongoose = require('mongoose')
const logger   = require('../utils/logger')
const { mongo } = require('../config/env')

const MAX_RETRIES    = 5
const RETRY_DELAY_MS = 3000

async function connectDB(attempt = 1) {
  try {
    await mongoose.connect(mongo.uri, {
      // These are the recommended Atlas connection options
      maxPoolSize:       10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:   45000,
    })
    logger.info(`MongoDB connected: ${mongoose.connection.host}`)
  } catch (err) {
    if (attempt <= MAX_RETRIES) {
      logger.warn(`MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${RETRY_DELAY_MS / 1000}s…`)
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS))
      return connectDB(attempt + 1)
    }
    logger.error('MongoDB connection failed after max retries:', err.message)
    process.exit(1)
  }
}

// Log connection events after initial connect
mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))
mongoose.connection.on('reconnected',  () => logger.info('MongoDB reconnected'))
mongoose.connection.on('error', (err) => logger.error('MongoDB error:', err.message))

module.exports = connectDB
