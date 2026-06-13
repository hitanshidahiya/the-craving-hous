/**
 * services/menuService.js
 * Business logic for menu management.
 * Delegates DB access to menuRepository.
 * Handles image upload/deletion via imageService.
 */

const menuRepository = require('../repositories/menuRepository')
const imageService   = require('./imageService')
const AppError       = require('../utils/AppError')

class MenuService {
  async getMenu({ category, search, available = true, page, limit }) {
    return menuRepository.findAll({ category, search, available, page, limit })
  }

  async getItem(id) {
    const item = await menuRepository.findById(id)
    if (!item) throw new AppError('Menu item not found', 404)
    return item
  }

  async createItem(data, file) {
    // Upload image if provided
    if (file) {
      const { url, publicId } = await imageService.uploadMenuImage(file)
      data.imageUrl      = url
      data.imagePublicId = publicId
    }
    return menuRepository.create(data)
  }

  async updateItem(id, data, file) {
    const existing = await menuRepository.findById(id)
    if (!existing) throw new AppError('Menu item not found', 404)

    // Replace image if a new one is uploaded
    if (file) {
      // Delete old image from Cloudinary if it exists
      if (existing.imagePublicId) {
        await imageService.deleteImage(existing.imagePublicId).catch(() => {})
      }
      const { url, publicId } = await imageService.uploadMenuImage(file)
      data.imageUrl      = url
      data.imagePublicId = publicId
    }

    return menuRepository.update(id, data)
  }

  async toggleAvailability(id) {
    const item = await menuRepository.findById(id)
    if (!item) throw new AppError('Menu item not found', 404)
    return menuRepository.setAvailability(id, !item.available)
  }

  async deleteItem(id) {
    const item = await menuRepository.findById(id)
    if (!item) throw new AppError('Menu item not found', 404)
    return menuRepository.softDelete(id)
  }

  async getBestSellers() {
    return menuRepository.findBestSellers()
  }
}

module.exports = new MenuService()
