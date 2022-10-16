// Import db library for connecting to MongoDB
const mongodb = require('../db/connect');

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
    const measureId = new ObjectId(req.params.id);

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

// To expose or export these 2 functions for other JS resources in the apps modules
module.exports = { getAll, getSingle };