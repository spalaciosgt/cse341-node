// Import db library for connecting to MongoDB
const mongodb = require('../db/connect');

// Instance of MongoDB
const ObjectId = require('mongodb').ObjectId;

// Case Function Getting All Contacts
const getAll = async (req, res, next) => {
    // Getting Contacts Collection, without filters
    const myResults = await mongodb.getDb().
                            db('cse341').collection('contacts').find();
    // It is key put database name and collection

    // Displaying result in array format json
    myResults.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 200 = Ok
        res.status(200).json(lists);
  });
};

// Case Function Get Single Contact
const getSingle = async (req, res, next) => {

    // Getting contact id sent as a parameter through req object
    const contactId = new ObjectId(req.params.id);

    // Getting the specific contact
    const myResult = await mongodb  
        .getDb()
        .db('cse341')
        .collection('contacts')
        // FIltering with find method
        .find({ _id: contactId });
        // To array format json
        myResult.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        // Because it is successfull HTTP Code 200 = Ok
        res.status(200).json(lists[0]);
    });
};

module.exports = { getAll, getSingle };