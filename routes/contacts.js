// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to contacts controller
const contactsController = require('../controllers/contacts');

// For / request, showing all contacts
router.get('/', contactsController.getAll);

// For /id, showing a specific contact
router.get('/:id', contactsController.getSingle);

// Export router instance
module.exports = router;