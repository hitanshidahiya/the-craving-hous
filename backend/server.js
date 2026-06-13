/**
 * server.js
 * Entry point.
 * 1. Connects to MongoDB
 * 2. Creates HTTP server from Express app
 * 3. Attaches Socket.IO to the HTTP server
 * 4. Makes `io` available to route handlers via app.set('io', io)
 * 5. Starts listening
 *
 * Run: node server.js  (or: npm run dev)
 */

const http = require('http')
const { Server } = require('socket.io')

const app        = require('./app')
const connectDB  = require('./database/connect')
const initSocket = require('./socket/index')
const logger     = require('./utils/logger')
const { port, client } = require('./config/env')

async function start() {
  // ── Connect database first ───────────────────────────────
  await connectDB()

  // ── Create HTTP server ───────────────────────────────────
  const server = http.createServer(app)

  // ── Attach Socket.IO ─────────────────────────────────────
  const io = new Server(server, {
    cors: {
      origin:  client.url,
      methods: ['GET', 'POST'],
    },
    // Ping timeout/interval for connection health
    pingTimeout:  60000,
    pingInterval: 25000,
  })

  // Register socket event handlers
  initSocket(io)

  // Make io accessible in controllers via req.app.get('io')
  app.set('io', io)

  // ── Start listening ──────────────────────────────────────
  server.listen(port, () => {
    logger.info(`\n🚀 The Craving Hous backend running`)
    logger.info(`   Port:      ${port}`)
    logger.info(`   Env:       ${process.env.NODE_ENV || 'development'}`)
    logger.info(`   Client:    ${client.url}`)
    logger.info(`   Health:    http://localhost:${port}/health\n`)
  })

  // ── Graceful shutdown ────────────────────────────────────
  const shutdown = (signal) => {
    logger.info(`${signal} received — shutting down gracefully`)
    server.close(() => {
      logger.info('HTTP server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  // Catch unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled rejection:', err.message)
    shutdown('unhandledRejection')
  })
}

start()
