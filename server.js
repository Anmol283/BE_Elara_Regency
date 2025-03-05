const express = require('express') // Express for routing and middleware management
const path = require('path') // Path to handle file paths
const app = express()
const PORT = 8080
// Import middlewares
const logger = require('./middlewares/logger') // Import logger middleware
const errorHandler = require('./middlewares/errorHandler') // Import error handler middleware
// Middleware to handle JSON and URL-encoded data in POST requests
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data
// Use logger middleware for all incoming requests
app.use(logger) // Log each request
// Serve static files (HTML, CSS, JS) from the /public directory
app.use(express.static(path.join(__dirname, 'public')))
// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
app.use('/api', apiRoutes) // Mount the API routes on /api path
// Serve login.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html')) // Serve the login page at root URL
})
// Serve dashboard.html when user is authenticated
app.get('/api/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html')) // Serve the dashboard HTML file
})
// Serve register.html when user needs to register
app.get('/api/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')) // Serve the register HTML file
})
app.get('/api/rooms', (req, res
) => {
  res.sendFile(path.join(__dirname, 'views', 'rooms.html'))
})
app.get('/api/elements', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'elements.html'))
})
app.get('/api/blog', (req, res
) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'))
})
app.get('/api/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'))
})
app.get('/api/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})
app.get('/api/elements', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'elements.html'))
})
// Use error handler middleware for catching and handling errors
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})