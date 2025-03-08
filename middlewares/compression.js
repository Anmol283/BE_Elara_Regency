const compression = require('compression');

// Compression middleware to compress response bodies for performance
const compress = compression();

module.exports = compress;