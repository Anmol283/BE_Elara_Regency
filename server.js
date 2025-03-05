const express = require('express'); // Express for routing and middleware management
const path = require('path'); // Path to handle file paths
const app = express();
const PORT = 8080;

// Import middlewares from separate files
const morganLogger = require('./middlewares/logger'); // Morgan for request logging (third-party)
const customLogger = require('./middlewares/custom-logger'); // Your custom logger (if you create a new file for it)
const security = require('./middlewares/security'); // Helmet for security headers
const cookies = require('./middlewares/cookies'); // Cookie-parser for cookies
const corsMiddleware = require('./middlewares/cors'); // CORS for cross-origin requests
const compress = require('./middlewares/compression'); // Compression for performance

// Middleware to handle JSON and URL-encoded data in POST requests
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// Use the imported third-party middlewares and custom logger
app.use(morganLogger); // Log each request with morgan
app.use(customLogger); // Use your custom logger (optional, after morgan)
app.use(security); // Add security headers
app.use(cookies); // Parse cookies
app.use(corsMiddleware); // Enable CORS
app.use(compress); // Compress responses

// Serve static files (HTML, CSS, JS) from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes'); // Import the API routes for login and register functionality
app.use('/api', apiRoutes); // Mount the API routes on /api path

// Serve login.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html')); // Serve the login page at root URL
});

// Serve dashboard.html when user is authenticated
app.get('/api/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html')); // Serve the dashboard HTML file
});

// Serve register.html when user needs to register
app.get('/api/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')); // Serve the register HTML file
});

app.get('/api/rooms', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'rooms.html'));
});

app.get('/api/elements', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'elements.html'));
});

app.get('/api/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/api/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/api/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Use error handler middleware for catching and handling errors
const errorHandler = require('./middlewares/errorHandler'); // Import error handler middleware
app.use(errorHandler); // Handle errors globally

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});