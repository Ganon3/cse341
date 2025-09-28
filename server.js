const express = require('express');
const app = express();
const router = require('./rountes');
require('dotenv').config();

// routes
app.use("/",         require('./rountes/index'));
app.use("/contacts", require('./rountes/contacts'));



// middleware
app.use('/', router);
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});