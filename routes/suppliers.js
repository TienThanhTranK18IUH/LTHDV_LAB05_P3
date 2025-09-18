const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', isLoggedIn, supplierCtrl.index);
router.get('/new', isLoggedIn, supplierCtrl.newForm);
router.post('/', isLoggedIn, supplierCtrl.create);
router.get('/:id/edit', isLoggedIn, supplierCtrl.editForm);
router.put('/:id', isLoggedIn, supplierCtrl.update);
router.delete('/:id', isLoggedIn, supplierCtrl.delete);

module.exports = router;
