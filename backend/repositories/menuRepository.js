/**
 * repositories/menuRepository.js
 * All database operations for MenuItem.
 * Services call this — never touch Mongoose directly in a service.
 */

const MenuItem = require('../models/MenuItem')

class MenuRepository {
  /**
   * Find all available (non-deleted) menu items with optional filters.
   * @param {object} filters - { category, search, available }
   * @param {object} pagination - { page, limit }
   */
  async findAll({ category, search, available, page = 1, limit = 50 } = {}) {
    const query = {}

    if (category && category !== 'all') {
      query.category = category
    }
    if (available !== undefined) {
      query.available = available
    }
    if (search) {
      query.$text = { $search: search }
    }

    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      MenuItem.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ bestSeller: -1, name: 1 })
        .lean(),
      MenuItem.countDocuments(query),
    ])

    return { items, total, page, limit, pages: Math.ceil(total / limit) }
  }

  async findById(id) {
    return MenuItem.findById(id).lean()
  }

  async findByIdRaw(id) {
    // Used internally — skips the soft-delete pre hook
    return MenuItem.findOne({ _id: id }).lean()
  }

  async create(data) {
    const item = await MenuItem.create(data)
    return item.toObject()
  }

  async update(id, data) {
    return MenuItem.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()
  }

  /**
   * Toggle availability without a full update.
   */
  async setAvailability(id, available) {
    return MenuItem.findByIdAndUpdate(id, { available }, { new: true }).lean()
  }

  /**
   * Soft delete — sets isDeleted: true, never actually removes the document.
   * Existing order snapshots are unaffected.
   */
  async softDelete(id) {
    return MenuItem.findByIdAndUpdate(id, { isDeleted: true, available: false }, { new: true }).lean()
  }

  /**
   * Get all best sellers (for home page / analytics).
   */
  async findBestSellers(limit = 8) {
    return MenuItem.find({ bestSeller: true, available: true }).limit(limit).lean()
  }

  /**
   * Bulk insert for seeding.
   */
  async insertMany(items) {
    return MenuItem.insertMany(items, { ordered: false })
  }

  async deleteAll() {
    return MenuItem.deleteMany({})
  }
}

module.exports = new MenuRepository()
