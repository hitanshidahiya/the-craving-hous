/**
 * services/authService.js
 * Handles admin authentication: login and JWT generation.
 * Password comparison is delegated to the Admin model instance method.
 */

const jwt     = require('jsonwebtoken')
const Admin   = require('../models/Admin')
const AppError = require('../utils/AppError')
const { jwt: jwtConfig } = require('../config/env')

class AuthService {
  /**
   * Authenticate admin and return a signed JWT.
   * @param {string} email
   * @param {string} password
   * @returns {{ token: string, admin: object }}
   */
  async login(email, password) {
    // Explicitly select password (it has select: false in schema)
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password')

    if (!admin) {
      // Use the same error for both "not found" and "wrong password"
      // to prevent email enumeration
      throw new AppError('Invalid email or password', 401)
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401)
    }

    const token = this._signToken(admin._id)

    // Don't return the password hash
    const adminData = {
      id:    admin._id,
      email: admin.email,
      role:  admin.role,
    }

    return { token, admin: adminData }
  }

  _signToken(id) {
    return jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
  }

  verifyToken(token) {
    return jwt.verify(token, jwtConfig.secret)
  }
}

module.exports = new AuthService()
