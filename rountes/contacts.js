const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacts');

router.get('/roro', controller.roro);
router.get('/ibo', controller.ibo);
router.get('/khall', controller.khall);
router.get('/byId/:id', controller.byId);
router.get('/', controller.getall);


router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
