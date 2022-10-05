// Import Node Libraries
const express = require('express');
const bodyParser = require('body-parser');

// Import Own Libraries
const mongodb = require('./db/connect');

// Changing the port to listen to
const port = process.env.PORT || 8090;

// Instance of express API
const myApp = express();

myApp.use(bodyParser.json())
    .use((req, res, next) => {
        // Preparing headings
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    // Redirect to routes
    .use('/', require('./routes'));

// Staring database access service    
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    // Starting app service and listening to on 8080
    myApp.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});