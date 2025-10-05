const { ObjectId } = require('mongodb');
const db_module = require('../db/db');

// move to utility file later

/**
 * This function retrieves all contacts from the database.
 * @returns {Promise<Array|Object>} returns array of objects or error object
 */
async function getall_contact() {
  try {
    const db = await db_module.get_db();
    const contacts = db.collection('contacts');
    console.log('Collection objects: ' + contacts);
    const json = await contacts.find().toArray();
    console.log('found: ' + json);
    return json;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
}

/**
 * this function retrieves a contact by first name from the database.
 * @param {string} name_f this is the first name of the contact to search for
 * @returns {Promise<Array|Object>} returns array of objects or error object
 */
async function get_contact(name_f) {
  try {
    const db = await db_module.get_db();
    const contacts = db.collection('contacts');
    console.log('Collection objects: ' + contacts);
    const json = await contacts.findOne({ name_f });
    console.log('found: ' + json);
    return json;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
}

/**
 * this function retrieves a contact by ID from the database.
 * @param {string} id this is the ID of the contact to search for || if not a string it will be converted to string
 * @returns {Promise<Object>} returns array of objects or error object
 */
async function get_contact_by_id(id) {
  try {
    if (!id) {
      throw 'No ID provided';
    }
    const db = await db_module.get_db();
    console.log('ID of object: ' + id);
    const contacts = db.collection('contacts');
    console.log('Collection objects found from contacts: ' + contacts);
    const json = await contacts.findOne({ _id: new ObjectId(String(id)) });
    console.log('found: ' + json);
    return json;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
}

/**
 * this function creates a new contact in the database.
 * @param {Object} request_body this is the request body from the client
 * @returns {Promise<Object>} returns result object or error object
 */
async function create_contact(request_body) {
  // i was going to do it outside but i like it inside the function
  console.log('Request body: ' + JSON.stringify(request_body.body));
  const contact = {
    name_f: request_body.body.name_f,
    name_l: request_body.body.name_l,
    email: request_body.body.email,
    collor: request_body.body.collor,
    dob: new Date(String(request_body.body.dob)) // change to date object later
  };
  try {
    const db = await db_module.get_db();
    console.log('Creating contact: ' + contact);
    const contacts = db.collection('contacts');
    console.log('Collection objects: ' + contacts);
    const result = await contacts.insertOne(contact);
    console.log('Created contact: ' + result);
    return result;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
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
  try {
    const db = await db_module.get_db();
    console.log('Updating contact with ID: ' + id);
    const contacts = db.collection('contacts');
    console.log('Collection objects: ' + contacts);
    const result = await contacts.updateOne({ _id: new ObjectId(String(id)) }, { $set: contact });
    console.log('Updated contact: ' + result);
    return result;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
}

/**
 * this function deletes a contact from the database.
 * @param {string} id this is the ID of the contact to update || if not a string it will be converted to string
 * @returns {promise<object>} returns result object or error object
 */
async function delete_contact(id) {
  try {
    const db = await db_module.get_db();
    console.log('Deleting contact with ID: ' + id);
    const contacts = db.collection('contacts');
    console.log('Collection objects: ' + contacts);
    const result = await contacts.deleteOne({ _id: new ObjectId(String(id)) });
    console.log('Deleted contact: ' + result);
    return result;
  } catch (err) {
    console.error(err);
    return { err_name: err.message };
  }
}

// controllers:
// controllers:

const roro = async (req, res, next) => {
  res.status(200);
  res.json(await get_contact('roro'));
};
const ibo = async (req, res, next) => {
  res.status(200);
  res.json(await get_contact('ibo'));
};
const khall = async (req, res, next) => {
  res.status(200);
  res.json(await get_contact('khall'));
};
const byId = async (req, res, next) => {
  res.status(200);
  const id = req.params.id;
  res.json(await get_contact_by_id(id));
};
const getall = async (req, res, next) => {
  res.status(200);
  res.json(await getall_contact());
};

const create = async (req, res, next) => {
  let result = await create_contact(req);
  if (result.err_name) {
    // i like this sujestion by AI
    res.status(500);
    res.json(result);
  } else {
    res.status(201);
    res.json(result);
  }
};
const update = async (req, res, next) => {
  const id = req.params.id;
  let result = await update_contact(id, req);
  if (result.err_name) {
    res.status(500);
    res.json(result);
  } else {
    res.status(204);
    res.json(result);
  }
};
const remove = async (req, res, next) => {
  const id = req.params.id;
  let result = await delete_contact(id);
  if (result.err_name) {
    res.status(500);
    res.json(result);
  } else {
    res.status(200);
    res.json(result);
  }
};

module.exports = {
  roro,
  ibo,
  khall,
  byId,
  getall,
  create,
  update,
  remove
};
