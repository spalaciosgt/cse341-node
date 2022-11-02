// Import Node Libraries
const { auth, requiresAuth } = require('express-openid-connect');
const express = require('express');
const bodyParser = require('body-parser');

// Import Own Libraries
const mongodb = require('./db/connect');

// Changing the port to listen to
const port = process.env.PORT || 8090;

// Instance of express API
const myApp = express();

// For OAuth 2.0
const dotenv = require('dotenv')
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

myApp.use(bodyParser.json())
    .use((req, res, next) => {
        // Preparing headings
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(auth(config))    
    // Redirect to routes       
    .use('/', requiresAuth(), require('./routes'),  
    );

// Staring database access service    
mongodb.initDb((err, mongodb) => {
  if (err) {

    // *** Handling Errors *** //
    console.log(err);
  } else {
    // Starting app service and listening to on 8080
    myApp.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
})