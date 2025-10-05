const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);

let _db;

async function init_db(name_of_db = dbName, callback, app) {
  // i am awere that puting the app here is not a good practice - i was tring to understand how to use callbacks

  try {
    if (!_db) {
      await client.connect(); // logs in terminal
      _db = client.db(name_of_db);
      console.log('Connected to MongoDB: ' + name_of_db);
      if (_db.listCollections().toArray().length === 0) {
        console.log('No collections found in the database.');
      }
      callback(null, _db, app);
    } // else
    else {
      console.log('db is already cunnected');
      return callback(null, _db, app);
    }
  } catch (err) {
    callback(err, _db, app);
  }
}

async function get_db() {
  if (_db) {
    return _db;
  } else {
    console.log('No database found!');
  }
}

async function close_db() {
  if (client) {
    await client.close();
    console.log('Database connection closed.');
  } else {
    console.log('No database connection found!');
  }
}

function callback(err, db, app) {
  if (err) {
    console.log(`Database initialization failed: ${err}`);
  } else {
    app.listen(process.env.PORT || 3000);
    console.log(`Connected to DB and listening on port ${process.env.PORT || 3000}`);
  }
}

function test_db(function_to_run) {
  if (_db) {
    console.log('running test db function');
    function_to_run(_db);
  } else {
    client
      .connect()
      .then((cunectedClient) => {
        _db = cunectedClient.db(dbName);
        function_to_run(_db);
      })
      .catch((err) => {
        console.log('Failed to connect to the database: ' + err);
      });
  }
}
module.exports = {
  init_db,
  get_db,
  close_db,
  callback,
  test_db
};
