// Import db library for connecting to MongoDB
const mongodb = require('../db/connect');

// *** Data Validation *** //
const { validationResult } = require('express-validator');

// Instance of MongoDB
const ObjectId = require('mongodb').ObjectId;

// Case Function Getting All Measuress
const getAll = async (req, res, next) => {

    // Getting Measures Collection, without filters
    const myResults = await mongodb.getDb().
                            db('electrical_commercial_measuring').
                            collection('electrical_measure').
                            find();

    // It is key put database name and collection

    // Displaying result in array format json
    myResults.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 201 = Ok
        res.status(201).json(lists);
  });
};

// Case Function Get Single Measure
const getSingle = async (req, res, next) => {

    // Getting measure id sent as a parameter through req object
    const measureId = new ObjectId(req.params.id_measure);

    // Getting the specific measure
    const myResult = await mongodb  
        .getDb()
        .db('electrical_commercial_measuring')
        .collection('electrical_measure')
        // FIltering with find method
        .find({ _id: measureId });
        // To array format json
        myResult.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 201 = Ok
        res.status(201).json(lists[0]);
    });
};

// Function to create a new meter via POST
const createNewMeasure = async (req, res) => {
    // *** Data Validation *** //
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    // Get data from request object in JSON format
    const measure = {
        id_meter: req.body.id_meter,
        measure_date : req.body.measure_date,
        state : req.body.state,
        measure_frequency : req.body.measure_frequency,
        measure_data : req.body.measure_data      
      };

    // Try to do the insert in JSON format in MongoDB database
    const resMongo = await mongodb.getDb().
                      db('electrical_commercial_measuring'). // It is key to select the database
                      collection('electrical_measure'). // It is key to select the collection
                      insertOne(measure); // Insert one function

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

  // Function to update a specific measure via PUT
  const updateOneMeasure = async (req, res) => {    
    // *** Data Validation *** //
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }    
    // Getting the meter ID to update
    const measureId = new ObjectId(req.params.id_measure);    
    // Getting the new meter information
    const measureUpdate = {
      id_meter: req.body.id_meter,
      measure_date : req.body.measure_date,
      state : req.body.state,
      measure_frequency : req.body.measure_frequency,
      measure_data : req.body.measure_data      
    };
    // Trying to update the document in the MongoDB service
    const resMongo = await mongodb.getDb()
                      .db('electrical_commercial_measuring') // It is important to select the database
                      .collection('electrical_measure') // It is important to select the collection
                      .replaceOne({ _id : measureId }, measureUpdate);  // ReplaceOne function    
    // If one document was altered  
    if (resMongo.modifiedCount > 0) {
      // Send HTTP 204 status Ok
      res.status(204).send();
    } else {
      // Send HTTP 500 Error status
      res.status(500).json(resMongo.error || ' Something was going wrong, please try again!.');
    }
    // For debugging
    console.log(resMongo);
  };
  
// Function to delete one specific measure
const deleteOneMeasure= async (req, res) => {    
    // Getting the meter Id
    const measureId = new ObjectId(req.params.id_measure);
    // Trying to delete it in MongoDB service
    const resMongo = await mongodb.getDb().
                      db('electrical_commercial_measuring'). // It is key to select the database
                      collection('electrical_measure'). // It is key to select the collection
                      remove({ _id : measureId }, true); // Filter using remove function                        
    // If one document was altered 
    if (resMongo.deletedCount > 0) {
      // Send HTTP 200 status Ok
      res.status(200).send();
    } else {
      // Send HTTP 500 Error status
      res.status(500).json(resMongo.error || ' Something was going wrong, please try again!.');
    }
    // For debugging
    console.log(resMongo);
};

// To expose or export these 2 functions for other JS resources in the apps modules
module.exports = { getAll, getSingle, createNewMeasure, updateOneMeasure, deleteOneMeasure };