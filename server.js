const express = require('express'); // Express for routing and middleware management
const path = require('path'); // Path to handle file paths
const app = express();
const PORT = 8080;

// Import middlewares from separate files
const morganLogger = require('./middlewares/logger'); // Morgan for request logging (third-party)
const customLogger = require('./middlewares/custom-logger'); // Your custom logger
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
  res.status(200).sendFile(path.join(__dirname, 'views', 'login.html')); // Explicit 200 for success
});

// Serve dashboard.html when user is authenticated
app.get('/api/dashboard', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'dashboard.html')); // Explicit 200 for success
});

// Serve register.html when user needs to register
app.get('/api/register', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'register.html')); // Explicit 200 for success
});

app.get('/api/rooms', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'rooms.html')); // Explicit 200 for success
});

app.get('/api/elements', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'elements.html')); // Explicit 200 for success
});

app.get('/api/blog', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'blog.html')); // Explicit 200 for success
});

app.get('/api/contact', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'contact.html')); // Explicit 200 for success
});

app.get('/api/about', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'about.html')); // Explicit 200 for success
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).send({
    error: 'Not Found',
    message: 'The requested resource could not be found on the server.'
  });
});

// Use error handler middleware for catching and handling errors
const errorHandler = require('./middlewares/errorHandler'); // Import error handler middleware
app.use(errorHandler); // Handle errors globally (500 status)

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});