const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./rountes');
const mongodb = require('./db/db');

require('dotenv').config();

// middleware
app.use(bodyParser.json());
app.use('/', router);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}); // CORS

// routes -- covert to teachers way eventually : put in rounter index.js then move the items in index.js to their own files
app.use('/', require('./rountes/index'));
app.use('/contacts', require('./rountes/contacts'));

mongodb.init_db('CSE', mongodb.callback, app); // error or app.listen on port -- fix later with (err, mongoDB) => {}
