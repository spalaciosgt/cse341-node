// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to measures controller
const measuresController = require('../controllers/measures');

// For / request via GET, showing all measures
router.get('/', measuresController.getAll);

// For /id request via GET, showing a specific contact
router.get('/:id', measuresController.getSingle);

// Export router instance
module.exports = router;