/**
 * routes/menu.js
 * Public menu endpoints.
 * GET /api/menu
 * GET /api/menu/:id
 */

const router = require('express').Router()
const { getMenu, getItem } = require('../controllers/menuController')

router.get('/',    getMenu)
router.get('/:id', getItem)

module.exports = router
