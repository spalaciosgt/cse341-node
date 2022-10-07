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

// Function to create a new contact via POST
const createNewContact = async (req, res) => {
    // Get data from request object in JSON format
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday };

    // Try to do the insert in JSON format in MongoDB database
    const resMongo = await mongodb.getDb().
                      db('cse341'). // It is key to select the database
                      collection('contacts'). // It is key to select the collection
                      insertOne(contact); // Insert one function

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

  // Function to update a specific contact via PUT
  const updateOneContact = async (req, res) => {
    // Getting the contact ID to update
    const contactId = new ObjectId(req.params.id);
    
    // Getting the new contact information
    const contactUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Trying to update the document in the MongoDB service
    const resMongo = await mongodb.getDb()
                      .db('cse341') // It is important to select the database
                      .collection('contacts') // It is important to select the collection
                      .replaceOne({ _id: contactId }, contactUpdate);  // ReplaceOne function    

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
  
  // Function to delete one specific contact
  const deleteOneContact = async (req, res) => {
    // Getting the contact Id
    const contactId = new ObjectId(req.params.id);

    // Trying to delete it in MongoDB service
    const resMongo = await mongodb.getDb().
                      db('cse341'). // It is key to select the database
                      collection('contacts'). // It is key to select the collection
                      remove({ _id: contactId }, true); // Filter using remove function                    
    
    // If one document was altered 
    if (resMongo.deletedCount > 0) {
      // Send HTTP 204 status Ok
      res.status(200).send();
    } else {
      // Send HTTP 500 Error status
      res.status(500).json(resMongo.error || ' Something was going wrong, please try again!.');
    }

     // For debugging
     console.log(resMongo);
  };

// To expose or export these 5 functions for other JS resources in the apps modules
module.exports = { getAll, getSingle, createNewContact, 
                   updateOneContact, deleteOneContact };