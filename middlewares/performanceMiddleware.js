/**
 * Performance middleware for Elara Regency
 */

const compression = require("compression")

// Configure compression middleware
const compressionConfig = compression()

module.exports = {
  compressionConfig,
}
