const express = require('express');             
const router = express.Router();
const controller = require('../controllers/contacts');

router.get('/roro',            controller.roro); 
router.get('/ibo',             controller.ibo);
router.get('/khall',           controller.khall);

module.exports = router;