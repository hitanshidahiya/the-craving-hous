/**
 * seed/createAdmin.js
 * Creates the admin account from ADMIN_EMAIL and ADMIN_PASSWORD env vars.
 * Run once after first deploy: npm run seed:admin
 *
 * Safe to re-run — will print a message if admin already exists.
 */

require('../config/env')
const mongoose = require('mongoose')
const { mongo } = require('../config/env')
const Admin = require('../models/Admin')

async function createAdmin() {
  const email    = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
    process.exit(1)
  }

  await mongoose.connect(mongo.uri)
  console.log('✅ Connected to MongoDB\n')

  const existing = await Admin.findOne({ email: email.toLowerCase() })
  if (existing) {
    console.log(`ℹ️  Admin already exists: ${email}`)
    process.exit(0)
  }

  const admin = await Admin.create({ email, password, role: 'owner' })
  console.log(`✅ Admin created: ${admin.email} (role: ${admin.role})`)
  console.log('\n🔐 You can now log in at POST /api/auth/login\n')

  process.exit(0)
}

createAdmin().catch((err) => {
  console.error('❌ Admin creation failed:', err.message)
  process.exit(1)
})
