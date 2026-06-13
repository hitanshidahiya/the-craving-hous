/**
 * controllers/menuController.js
 * Handles HTTP for public and admin menu routes.
 */

const menuService = require('../services/menuService')
const catchAsync  = require('../utils/catchAsync')
const { sendSuccess, sendCreated } = require('../utils/response')

// GET /api/menu
const getMenu = catchAsync(async (req, res) => {
  const { category, search, page = 1, limit = 50 } = req.query

  const result = await menuService.getMenu({
    category,
    search,
    available: true, // public endpoint always shows only available items
    page:  parseInt(page,  10),
    limit: parseInt(limit, 10),
  })

  sendSuccess(res, result, 'Menu fetched')
})

// GET /api/menu/:id
const getItem = catchAsync(async (req, res) => {
  const item = await menuService.getItem(req.params.id)
  sendSuccess(res, { item }, 'Item fetched')
})

// POST /api/admin/menu  [protected]
const createItem = catchAsync(async (req, res) => {
  const item = await menuService.createItem(req.body, req.file)
  sendCreated(res, { item }, 'Menu item created')
})

// PUT /api/admin/menu/:id  [protected]
const updateItem = catchAsync(async (req, res) => {
  const item = await menuService.updateItem(req.params.id, req.body, req.file)
  sendSuccess(res, { item }, 'Menu item updated')
})

// PATCH /api/admin/menu/:id/availability  [protected]
const toggleAvailability = catchAsync(async (req, res) => {
  const item = await menuService.toggleAvailability(req.params.id)
  sendSuccess(res, { item }, `Item marked ${item.available ? 'available' : 'unavailable'}`)
})

// DELETE /api/admin/menu/:id  [protected — soft delete]
const deleteItem = catchAsync(async (req, res) => {
  await menuService.deleteItem(req.params.id)
  sendSuccess(res, null, 'Menu item deleted')
})

module.exports = { getMenu, getItem, createItem, updateItem, toggleAvailability, deleteItem }
