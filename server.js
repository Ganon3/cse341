const express = require('express');
const app = express();

const router = require('./rountes');
app.use("/", require('./rountes/index'));



// middleware
app.use('/', router);
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});