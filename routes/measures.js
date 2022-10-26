// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to measures controller
const measuresController = require('../controllers/measures');

// For / request via GET, showing all measures
router.get('/', measuresController.getAll);

// For /id request via GET, showing a specific measure
router.get('/:id', measuresController.getSingle);

// For / request via POST, creating a new measure
// router.post('/', measuresController.createNewMeter);

// For /id request via PUT, updating a specific measure
// router.put('/:id', measuresController.updateOneMeasure);

// For /id request via DELETE, deleting a specific measure
// router.delete('/:id', measuresController.deleteOneMeasure);

// Export router instance
module.exports = router;