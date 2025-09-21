const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/',          controller.fuad);
router.get('/zippy-dog', controller.dog);

module.exports = router;