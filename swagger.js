const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts App',
    description: 'Contacts App for CSE 341 Samuel Palacios',
  },
  host: 'week04-samuel-palacios-cse341.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);