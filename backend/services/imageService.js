/**
 * services/imageService.js
 * Handles image upload and deletion via Cloudinary.
 * Used by MenuService when creating or updating items.
 */

const cloudinary = require('../config/cloudinary')
const AppError   = require('../utils/AppError')
const logger     = require('../utils/logger')

const FOLDER = 'craving-hous/menu'

class ImageService {
  /**
   * Upload a menu item image from a Multer file buffer.
   * @param {Express.Multer.File} file
   * @returns {{ url: string, publicId: string }}
   */
  async uploadMenuImage(file) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder:         FOLDER,
            resource_type:  'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
              { width: 800, height: 600, crop: 'fill', gravity: 'auto' },
              { quality: 'auto:good' },
              { fetch_format: 'auto' },
            ],
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        stream.end(file.buffer)
      })

      return {
        url:      result.secure_url,
        publicId: result.public_id,
      }
    } catch (err) {
      logger.error('Cloudinary upload error:', err.message)
      throw new AppError('Image upload failed', 500)
    }
  }

  /**
   * Delete an image from Cloudinary by its public_id.
   * Called when a menu item image is replaced or the item is deleted.
   */
  async deleteImage(publicId) {
    try {
      await cloudinary.uploader.destroy(publicId)
      logger.debug(`Cloudinary: deleted ${publicId}`)
    } catch (err) {
      // Non-fatal — log and continue
      logger.warn(`Cloudinary delete failed for ${publicId}: ${err.message}`)
    }
  }
}

module.exports = new ImageService()
