const db_modules = require('./db/db'); 


async function test_db() { try {

    const db = await db_modules.get_db('CSE');

    if (db) {

        console.log("Database connection successful.") 

        const count = await db.collection('contacts').countDocuments();
        const results = await db.collection('contacts').find().toArray()

        console.log(`Total contacts: ${count}`);
        console.log("Contacts:"); 
        console.log(results)

        db_modules.close_db()
    }

    } catch (err) { console.error("Database connection failed:", err); }


} test_db()