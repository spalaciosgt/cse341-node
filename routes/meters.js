// References to express
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to meters controller
const metersController = require('../controllers/meters');

// *** Data Validation *** //
const validation = require('../db/validation')

// For / request via GET, showing all meters
router.get('/', metersController.getAll);

// For /id_meter request via GET, showing a specific meter
router.get('/:id_meter', metersController.getSingle);

// For / request via POST, creating a new meter
router.post('/', validation.insertUpdateMeter, // *** Data Validation *** //
                metersController.createNewMeter);  

// For /id request via PUT, updating a specific meter
router.put('/:id_meter', validation.insertUpdateMeter, // *** Data Validation *** //
                metersController.updateOneMeter);

// For /id request via DELETE, deleting a specific meter
router.delete('/:id_meter', metersController.deleteOneMeter);

// Export router instance
module.exports = router;