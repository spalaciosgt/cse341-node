// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to meters controller
const metersController = require('../controllers/meters');

// For / request via GET, showing all meters
router.get('/', metersController.getAll);

// For /id_meter request via GET, showing a specific contact
router.get('/:id_meter', metersController.getSingle);

// For / request via POST, creating a new contact
router.post('/', metersController.createNewMeter);

// Export router instance
module.exports = router;