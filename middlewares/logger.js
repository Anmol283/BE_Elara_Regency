const morgan = require('morgan');

// Morgan middleware to log HTTP requests in a combined format
const logger = morgan('combined');

module.exports = logger;