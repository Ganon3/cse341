const { ObjectId } = require('mongodb'); 
const db_module = require('../db/db'); 
const dotenv = require('dotenv');
dotenv.config(); 
const collection_name = process.env.DB_COLLECTION || 'contacts'; // default collection name

async function get_db(collection_name) {
  // to get the collection
  try {
    const db = await db_module.get_db();
    const collection = db.collection(collection_name);
    console.log('Collection object found: ' + collection.namespace);
    return collection;
  } catch (err) {
    console.error('Error getting collection: ' + err);
    return {
      err_name: err.message,
      err_code: err.code,
      err_stack: err.stack,
      err_string: String(err)
    };
  }
}

// cotnacts section
// cotnacts section

/**
 * This function retrieves all contacts from the database.
 * @returns {Promise<Array|Object>} returns array of objects or error object
 */
async function getall_contact() {
  const contacts = await get_db(collection_name);
  const json = await contacts.find().toArray();
  console.log('found: ' + json);
  return json;
}

/**
 * this function retrieves a contact by first name from the database.
 * @param {string} name_f this is the first name of the contact to search for
 * @returns {Promise<Array|Object>} returns array of objects or error object
 */
async function get_contact(name_f) {
  const contacts = await get_db(collection_name);
  const json = await contacts.findOne({ name_f });
  console.log('found: ' + json);
  return json;
}

/**
 * this function retrieves a contact by ID from the database.
 * @param {string} id this is the ID of the contact to search for || if not a string it will be converted to string
 * @returns {Promise<Object>} returns array of objects or error object
 */
async function get_contact_by_id(id) {
  const contacts = await get_db(collection_name);
  const json = await contacts.findOne({ _id: new ObjectId(String(id)) });
  console.log('found: ' + json);
  return json;
}

/**
 * this function creates a new contact in the database.
 * @param {Object} request_body this is the request body from the client
 * @returns {Promise<Object>} returns result object or error object
 */
async function create_contact(request_body) {
  console.log('Request body: ' + JSON.stringify(request_body.body));
  const contact = {
    name_f: request_body.body.name_f,
    name_l: request_body.body.name_l,
    email: request_body.body.email,
    collor: request_body.body.collor,
    dob: new Date(String(request_body.body.dob))
  };

  const contacts = await get_db(collection_name);
  const result = await contacts.insertOne(contact);
  console.log('Created contact: ' + result);
  return result;
}

/**
 * this function updates a contact in the database.
 * @param {string} id this is the ID of the contact to update || if not a string it will be converted to string
 * @param {Object} request_body this is the request body from the client
 * @returns {Promise<Object>} returns result object or error object
 */
async function update_contact(id, request_body) {
  console.log('Request body: ' + JSON.stringify(request_body.body));
  const contact = {
    name_f: request_body.body.name_f,
    name_l: request_body.body.name_l,
    email: request_body.body.email,
    collor: request_body.body.collor,
    dob: new Date(String(request_body.body.dob)) // change to date object later
  };

  const contacts = await get_db(collection_name);
  console.log('Updating contact with ID: ' + id);
  const result = await contacts.updateOne({ _id: new ObjectId(String(id)) }, { $set: contact });
  console.log('Updated contact: ' + result);
  return result;
}

/**
 * this function deletes a contact from the database.
 * @param {string} id this is the ID of the contact to update || if not a string it will be converted to string
 * @returns {promise<object>} returns result object or error object
 */
async function delete_contact(id) {
  const contacts = await get_db(collection_name);
  console.log('Deleting contact with ID: ' + id);
  const result = await contacts.deleteOne({ _id: new ObjectId(String(id)) });
  console.log('Deleted contact: ' + result);
  return result;
}

module.exports = {
  getall_contact,
  get_contact,
  get_contact_by_id,
  create_contact,
  update_contact,
  delete_contact
};
