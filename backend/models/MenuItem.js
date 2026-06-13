/**
 * models/MenuItem.js
 * Represents a single item on the cafe menu.
 * Categories match exactly the frontend data/index.js category IDs.
 *
 * Key design decisions:
 * - Soft delete (isDeleted flag) so historical orders aren't broken.
 * - available flag for 86-ing items without deleting.
 * - emoji field matches the frontend data structure.
 * - Designed for future: allergens[], nutrition{}, variants[].
 */

const mongoose = require('mongoose')

const VALID_CATEGORIES = [
  'combos', 'burgers', 'pasta', 'wraps', 'hotdog',
  'indo-chinese', 'sandwiches', 'garlic-bread', 'maggi',
  'fries', 'snacks', 'nachos', 'protein', 'frappe',
  'iced-coffee', 'hot-coffee', 'thick-shakes', 'mocktails',
  'chai', 'iced-tea', 'desserts',
]

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Item name is required'],
      trim:     true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    category: {
      type:     String,
      required: [true, 'Category is required'],
      enum:     { values: VALID_CATEGORIES, message: 'Invalid category: {VALUE}' },
    },
    description: {
      type:    String,
      trim:    true,
      default: '',
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    emoji: {
      type:    String,
      default: '🍽️',
    },
    imageUrl: {
      type:    String,
      default: '',
    },
    imagePublicId: {
      type:    String,
      default: '',
    },
    price: {
      type:     Number,
      required: [true, 'Price is required'],
      min:      [1, 'Price must be at least ₹1'],
    },
    rating: {
      type:    Number,
      default: 0,
      min:     0,
      max:     5,
    },
    bestSeller: {
      type:    Boolean,
      default: false,
    },
    available: {
      type:    Boolean,
      default: true,
    },
    isDeleted: {
      type:    Boolean,
      default: false,
    },
    // Future: allergens, nutrition, variants (size/add-ons)
  },
  { timestamps: true }
)

// Compound index for fast category + availability queries
menuItemSchema.index({ category: 1, available: 1, isDeleted: 1 })
// Text index for search
menuItemSchema.index({ name: 'text', description: 'text' })

// Default query filter: never return soft-deleted items
menuItemSchema.pre(/^find/, function () {
  if (!this._conditions.isDeleted) {
    this.where({ isDeleted: false })
  }
})

module.exports = mongoose.model('MenuItem', menuItemSchema)
