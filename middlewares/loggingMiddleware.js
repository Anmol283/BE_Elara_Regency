/**
 * Logging middleware for Elara Regency
 */

const morgan = require("morgan")

// Configure morgan middleware
const morganLogger = morgan("dev")

// Custom request logger
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

module.exports = {
  morganLogger,
  requestLogger,
}
