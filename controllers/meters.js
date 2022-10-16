// Import db library for connecting to MongoDB
const mongodb = require('../db/connect');

// Instance of MongoDB
const ObjectId = require('mongodb').ObjectId;

// Case Function Getting All Meters
const getAll = async (req, res, next) => {

    // Getting Meters Collection, without filters
    const myResults = await mongodb.getDb().
                            db('electrical_commercial_measuring').
                            collection('meter').
                            find();

    // It is key put database name and collection

    // Displaying result in array format json
    myResults.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 201 = Ok
        res.status(201).json(lists);
  });
};

// Case Function Get Single Meter
const getSingle = async (req, res, next) => {

    // Getting meter id sent as a parameter through req object
    const meterId = req.params.id_meter;

    // Getting the specific meter
    const myResult = await mongodb  
        .getDb()
        .db('electrical_commercial_measuring')
        .collection('meter')
        // FIltering with find method
        .find({ id_meter: parseInt(meterId) });
        // To array format json
        myResult.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 201 = Ok
        res.status(201).json(lists[0]);
    });
};

// Function to create a new meter via POST
const createNewMeter = async (req, res) => {
    // Get data from request object in JSON format
    const meter = {
      id_meter: req.body.id_meter,
      point_name: req.body.point_name,
      type_meter: req.body.type_meter,
      serial_number: req.body.serial_number,
      maker: req.body.maker,
      model: req.body.model,
      habilitation_date: req.body.habilitation_date,      
      state: req.body.state
    };

    // Try to do the insert in JSON format in MongoDB database
    const resMongo = await mongodb.getDb().
                      db('electrical_commercial_measuring'). // It is key to select the database
                      collection('meter'). // It is key to select the collection
                      insertOne(meter); // Insert one function

    // If it was successfull                     
    if (resMongo.acknowledged) {
      // Response with status 201 Ok
      res.status(201).json(resMongo);
    } else {
      // Otherwise, response with status 500
      res.status(500).json(resMongo.error || ' Something was going wrong, please try again!.');
    }

     // For debugging
     console.log(resMongo);
  };   

// To expose or export these 3 functions for other JS resources in the apps modules
module.exports = { getAll, getSingle, createNewMeter };