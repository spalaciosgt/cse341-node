// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Redirection to contacts router
router.use('/contacts', require('./contacts'))

// Export router instance
module.exports = router;