const db_module = require('../db/db'); 

// utilities for now:
async function get_contact(name_f) { 
    
    try {

    const db =       await db_module.get_db('CSE');               // logs in terminal
    const contacts = await db.collection('contacts');                console.log("Collection objects: " + contacts);
    const json =     await contacts.findOne({name_f: name_f});       console.log("found: " + json);

    db_module.close_db();                                            
    return json

}   catch (err) { console.error(err); return {name:err} } }


const roro = (req, res) => {  res.json(get_contact('roro ')) ;}
const ibo  = (req, res) => {  res.json(get_contact('ibo  ')) ;}
const khall= (req, res) => {  res.json(get_contact('khall')) ;}



module.exports = {
    roro,
    ibo,
    khall
};