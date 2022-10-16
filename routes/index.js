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

// Redirection to meters router
router.use("/meters", require("./meters"));

// Redirection to measures router
router.use("/measures", require("./measures"));

// Export router instance
module.exports = router;
