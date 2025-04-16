/**
 * Security middleware for Elara Regency
 */

const helmet = require("helmet")
const cors = require("cors")

// Configure helmet middleware
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://code.jquery.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'"],
    },
  },
})

// Configure CORS middleware
const corsConfig = cors()

module.exports = {
  helmetConfig,
  corsConfig,
}
