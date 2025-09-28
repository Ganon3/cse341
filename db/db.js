const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri)

let _db;

async function get_db(name_of_db) {
    
    if (!_db) 
    {
        await client.connect();                            // logs in terminal
        _db = client.db(name_of_db);                       console.log("Connected to MongoDB: " +name_of_db);
        if (_db.listCollections().toArray().length === 0) {console.log("No collections found in the database.")}
        return _db;
    } 
    else {return _db;}
}

async function close_db() {

    if (client) {
        await client.close();
        console.log("Database connection closed.");
    }
}

module.exports = {
    get_db,
    close_db
};