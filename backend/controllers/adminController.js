/**
 * controllers/adminController.js
 * Admin-only endpoints: analytics, customers, activity logs.
 */

const analyticsService   = require('../services/analyticsService')
const customerRepository = require('../repositories/customerRepository')
const activityLogRepo    = require('../repositories/activityLogRepository')
const catchAsync         = require('../utils/catchAsync')
const { sendSuccess }    = require('../utils/response')

// GET /api/admin/stats
const getStats = catchAsync(async (req, res) => {
  const stats = await analyticsService.getDashboardStats()
  sendSuccess(res, stats, 'Stats fetched')
})

// GET /api/admin/customers
const getCustomers = catchAsync(async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const result = await customerRepository.findAll({
    page:  parseInt(page,  10),
    limit: parseInt(limit, 10),
  })
  sendSuccess(res, result, 'Customers fetched')
})

// GET /api/admin/activity
const getActivityLog = catchAsync(async (req, res) => {
  const logs = await activityLogRepo.findRecent(50)
  sendSuccess(res, { logs }, 'Activity log fetched')
})

module.exports = { getStats, getCustomers, getActivityLog }
