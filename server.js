const express = require('express'); // THIS file is server.js
const app = express(); // ThIS file is server.js
require('dotenv').config();

const bodyParser = require('body-parser');
const router = require('./rountes');
const mongodb = require('./db/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'
);



// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use('/', router);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// routes -- covert to teachers way eventually : put in rounter index.js then move the items in index.js to their own files
app.use('/', require('./rountes/index'));
app.use('/contacts', require('./rountes/contacts'));

// cunnect to db and start server
const PORT = process.env.PORT || 3000;
const db_name = process.env.DB_NAME;
mongodb.init_db(db_name, (err, _db) => {
  if (err) {
    console.log(`Database initialization failed: ${err}`);
  } else {
    app.listen(PORT);
    console.log(`Connected to DB and listening on port ${process.env.PORT || 3000}`);
  }
});
