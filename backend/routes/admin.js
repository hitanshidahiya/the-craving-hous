/**
 * routes/admin.js
 * All routes here are protected by authenticate middleware.
 *
 * Menu management:
 *   POST   /api/admin/menu
 *   PUT    /api/admin/menu/:id
 *   PATCH  /api/admin/menu/:id/availability
 *   DELETE /api/admin/menu/:id
 *
 * Order management:
 *   GET    /api/admin/orders
 *   PATCH  /api/admin/orders/:orderId/status
 *
 * Dashboard:
 *   GET    /api/admin/stats
 *   GET    /api/admin/customers
 *   GET    /api/admin/activity
 */

const router       = require('express').Router()
const authenticate = require('../middleware/authenticate')
const upload       = require('../middleware/upload')

const {
  createItem, updateItem, toggleAvailability, deleteItem,
} = require('../controllers/menuController')

const { getAdminOrders, updateStatus } = require('../controllers/orderController')
const { getStats, getCustomers, getActivityLog } = require('../controllers/adminController')

const {
  createMenuItemRules, updateMenuItemRules, validate: menuValidate,
} = require('../validators/menuValidator')

const {
  updateStatusRules, validate: orderValidate,
} = require('../validators/orderValidator')

// All routes below require a valid JWT
router.use(authenticate)

// ── Menu ──────────────────────────────────────────────────────
router.post(
  '/menu',
  upload.single('image'),
  createMenuItemRules,
  menuValidate,
  createItem
)

router.put(
  '/menu/:id',
  upload.single('image'),
  updateMenuItemRules,
  menuValidate,
  updateItem
)

router.patch('/menu/:id/availability', toggleAvailability)
router.delete('/menu/:id',             deleteItem)

// ── Orders ────────────────────────────────────────────────────
router.get('/orders', getAdminOrders)
router.patch('/orders/:orderId/status', updateStatusRules, orderValidate, updateStatus)

// ── Dashboard ─────────────────────────────────────────────────
router.get('/stats',     getStats)
router.get('/customers', getCustomers)
router.get('/activity',  getActivityLog)

module.exports = router
