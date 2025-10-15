const db_utils = require('../db/db_utils'); // THIS file is controllers/contacts.js

const roro = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json(await db_utils.get_contact('roro'));
};
const ibo = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json(await db_utils.get_contact('ibo'));
};
const khall = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json(await db_utils.get_contact('khall'));
};
const byId = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  const id = req.params.id;
  res.json(await db_utils.get_contact_by_id(id));
};
const getall = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json(await db_utils.getall_contact());
};


/*
#swagger.description = 'Create a new contact'
#swagger.parameters['body'] ={
  in: 'body',
  description: 'Contact information.',
  required: true,
  schema: { $ref: "#/definitions/Contact" }
}
*/
const create = async (req, res, next) => {
  let result = await db_utils.create_contact(req);
  if (result.err_name) {
    // i like this sujestion by AI
    res.status(500);
    res.json(result);
  } else {
    res.status(201);
    res.json(result);
  }
};

/*
#swagger.description = 'cxhange a contact by id'
#swagger.parameters['body'] ={
  in: 'body',
  description: 'Contact information.',
  required: true,
  schema: { $ref: "#/definitions/Contact" }
}
*/
const update = async (req, res, next) => {
  const id = req.params.id;
  let result = await db_utils.update_contact(id, req);
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
  let result = await db_utils.delete_contact(id);
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
