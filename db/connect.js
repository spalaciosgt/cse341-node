// Import Own Libraries
const dotenv = require('dotenv')
dotenv.config();

// Import Node Libraries
const MongoClient = require('mongodb').MongoClient;

// Ïnstance of DB Object
let db;

// Init de DB Access Service using a callback
const initDb = (callback) => {
  
    // If it is already initialized
    if (db) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }

    // Otherwise, I try to connect to it
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        db = client;
        // Handling callback
        callback(null, db);
    })
    // Handling exceptions
    .catch((err) => {
        callback(err);
    });
};

// To get the access database object from outside
const getDb = () => {
    // If it is not instanced, throws an exception
    if (!db) {
        throw Error('Db not initialized');
    }
    // Otherwise, simply return it!
    return db;
};

// To expose or export these 2 functions for other JS resources in the apps modules
module.exports = {initDb,  getDb, };