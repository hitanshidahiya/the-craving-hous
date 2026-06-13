/**
 * seed/index.js
 * Seeds the MenuItem collection with all cafe menu items.
 * Also seeds the Table collection (tables 1-5).
 *
 * Usage: npm run seed
 *
 * WARNING: Clears existing menu and table data before inserting.
 * Safe to re-run — idempotent.
 */

require('../config/env') // validate env vars first
const mongoose = require('mongoose')
const { mongo } = require('../config/env')
const menuRepository = require('../repositories/menuRepository')
const Table          = require('../models/Table')
const menuData       = require('./menuData')

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

async function seed() {
  console.log('\n🌱 Starting seed...\n')

  await mongoose.connect(mongo.uri)
  console.log('✅ Connected to MongoDB\n')

  // ── Menu items ────────────────────────────────────────────
  console.log(`⚙️  Clearing existing menu items...`)
  await menuRepository.deleteAll()

  console.log(`⚙️  Inserting ${menuData.length} menu items...`)
  await menuRepository.insertMany(menuData)
  console.log(`✅ ${menuData.length} menu items seeded\n`)

  // ── Tables ────────────────────────────────────────────────
  console.log('⚙️  Seeding tables 1–5...')
  await Table.deleteMany({})

  const tables = [1, 2, 3, 4, 5].map((n) => ({
    tableNumber: n,
    qrCodeUrl:   `${CLIENT_URL}/menu?table=${n}`,
    isActive:    true,
  }))

  await Table.insertMany(tables)
  console.log('✅ Tables seeded\n')

  console.log('🎉 Seed complete!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
