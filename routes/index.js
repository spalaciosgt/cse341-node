// Import express
const express = require("express");

// Imports for swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Instance for managing routers
const router = express.Router();

// To manage documentation visualization
var options = {
    explorer: true
};
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

// Redirection to contacts router
router.use("/contacts", require("./contacts"));

// Export router instance
module.exports = router;
