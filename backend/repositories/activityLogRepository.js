/**
 * repositories/activityLogRepository.js
 * Write-only audit log. Never update or delete entries.
 */

const ActivityLog = require('../models/ActivityLog')

class ActivityLogRepository {
  async log({ adminId, action, entityType, entityId, details = {} }) {
    // Fire-and-forget — never block the main flow on logging
    ActivityLog.create({ adminId, action, entityType, entityId, details }).catch(() => {})
  }

  async findRecent(limit = 50) {
    return ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('adminId', 'email role')
      .lean()
  }
}

module.exports = new ActivityLogRepository()
