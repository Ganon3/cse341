const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let _db;

async function init_db(name_of_db, start_surver) {
  try {
    if (!_db) {
      await client.connect();
      _db = client.db(name_of_db);
      console.log('Connected to MongoDB: ' + name_of_db);
      if ((await _db.listCollections().toArray().length) === 0) {
        console.log('No collections found in the database.');
      }
      start_surver(null, _db);
    } else {
      console.log('db is already cunnected');
      return start_surver(null, _db);
    }
  } catch (err) {
    start_surver(err, _db);
  }
}

async function get_db() {
  if (_db) {
    return _db;
  } else {
    console.log('No database found!');
  }
}

// testing zone
async function close_db() {
  // this is only used in testing so far
  if (client) {
    await client.close();
    console.log('Database connection closed.');
  } else {
    console.log('No database connection found!');
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
  test_db
};
