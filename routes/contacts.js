// Import express 
const express = require('express');

// Instance for managing routers
const router = express.Router();

// Instance to contacts controller
const contactsController = require('../controllers/contacts');

// For / request via GET, showing all contacts
router.get('/', contactsController.getAll);

// For /id request via GET, showing a specific contact
router.get('/:id', contactsController.getSingle);

// For / request via POST, creating a new contact
router.post('/', contactsController.createNewContact);

// For /id request via PUT, updating a specific contact
router.put('/:id', contactsController.updateOneContact);

// For /id request via DELETE, deleting a specific contact
router.delete('/:id', contactsController.deleteOneContact);

// Export router instance
module.exports = router;