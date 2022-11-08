// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// *** Data Validation *** //
const validation = require('../db/validation')

// Instance to measures controller
const measuresController = require('../controllers/measures');

// For / request via GET, showing all measures
router.get('/', measuresController.getAll);

// For /id request via GET, showing a specific measure
router.get('/:id_measure', measuresController.getSingle);

// For / request via POST, creating a new measure
router.post('/', validation.insertUpdateMeasure, // *** Data Validation *** //
                measuresController.createNewMeasure);  

// For /id request via PUT, updating a specific measure
router.put('/:id_measure', validation.insertUpdateMeasure, // *** Data Validation *** //
                measuresController.updateOneMeasure);

// For /id request via DELETE, deleting a specific measure
router.delete('/:id_measure', measuresController.deleteOneMeasure);

// Export router instance
module.exports = router;