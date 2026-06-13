/**
 * middleware/upload.js
 * Multer configuration for in-memory image upload.
 * Files are stored in memory (buffer) and passed to Cloudinary.
 * Enforces file type and size limits.
 */

const multer   = require('multer')
const AppError = require('../utils/AppError')

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_MB   = 5

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new AppError('Only JPEG, PNG, and WebP images are allowed', 400), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE_MB * 1024 * 1024,
    files:    1,
  },
})

module.exports = upload
