// Custom middleware for the Elara Regency application

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
}

// Rate limiter middleware (simple implementation)
const rateLimiter = (req, res, next) => {
  // In a real app, you would use a more sophisticated rate limiter
  // This is just a placeholder
  next()
}

// Request validator middleware
const validateRequest = (req, res, next) => {
  // Add validation logic here
  next()
}

// Response formatter middleware
const formatResponse = (req, res, next) => {
  const originalSend = res.send

  res.send = function (body) {
    // You can modify the response here if needed
    return originalSend.call(this, body)
  }

  next()
}

module.exports = {
  errorHandler,
  rateLimiter,
  validateRequest,
  formatResponse,
}
