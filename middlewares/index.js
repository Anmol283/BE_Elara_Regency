/**
 * Middleware index file for Elara Regency
 * Exports all middleware for easier imports
 */

const { isAuthenticated, isAdmin, redirectAdminToDashboard } = require("./authMiddleware")
const { helmetConfig, corsConfig } = require("./securityMiddleware")
const { morganLogger, requestLogger } = require("./loggingMiddleware")
const { compressionConfig } = require("./performanceMiddleware")

module.exports = {
  // Auth middleware
  isAuthenticated,
  isAdmin,
  redirectAdminToDashboard,

  // Security middleware
  helmetConfig,
  corsConfig,

  // Logging middleware
  morganLogger,
  requestLogger,

  // Performance middleware
  compressionConfig,
}
