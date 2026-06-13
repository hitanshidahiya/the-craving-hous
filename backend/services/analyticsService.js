/**
 * services/analyticsService.js
 * Computes admin dashboard statistics.
 * All queries are async and run in parallel where possible.
 */

const orderRepository    = require('../repositories/orderRepository')
const customerRepository = require('../repositories/customerRepository')

class AnalyticsService {
  async getDashboardStats() {
    const now   = new Date()

    // Time boundaries
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0)
    const weekStart  = new Date(now); weekStart.setDate(now.getDate() - 7)
    const monthStart = new Date(now); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0)

    const [
      todayRevenue,
      weekRevenue,
      monthRevenue,
      statusCounts,
      popularItems,
      peakHours,
      repeatCustomers,
      topSpenders,
    ] = await Promise.all([
      orderRepository.getRevenueSince(todayStart),
      orderRepository.getRevenueSince(weekStart),
      orderRepository.getRevenueSince(monthStart),
      orderRepository.countByStatus(),
      orderRepository.getPopularItems(monthStart, 5),
      orderRepository.getPeakHours(monthStart),
      customerRepository.countRepeat(),
      customerRepository.getTopSpenders(5),
    ])

    // Build status map
    const statusMap = {}
    statusCounts.forEach(({ _id, count }) => { statusMap[_id] = count })

    // Average order value today
    const avgOrderValue = todayRevenue.count > 0
      ? Math.round(todayRevenue.total / todayRevenue.count)
      : 0

    return {
      revenue: {
        today:   todayRevenue.total,
        weekly:  weekRevenue.total,
        monthly: monthRevenue.total,
      },
      orders: {
        today:     todayRevenue.count,
        pending:   statusMap['PENDING']   || 0,
        accepted:  statusMap['ACCEPTED']  || 0,
        preparing: statusMap['PREPARING'] || 0,
        ready:     statusMap['READY']     || 0,
        completed: statusMap['COMPLETED'] || 0,
        cancelled: statusMap['CANCELLED'] || 0,
      },
      avgOrderValue,
      popularItems: popularItems.map((item) => ({
        name:    item._id,
        emoji:   item.emoji,
        count:   item.count,
        revenue: item.revenue,
      })),
      peakHours: peakHours.map(({ _id, count }) => ({
        hour:  _id,
        label: `${_id}:00`,
        count,
      })),
      repeatCustomers,
      topSpenders: topSpenders.map((c) => ({
        name:        c.name,
        phone:       c.phone,
        totalOrders: c.totalOrders,
        totalSpent:  c.totalSpent,
      })),
    }
  }
}

module.exports = new AnalyticsService()
