const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', isLoggedIn, productCtrl.index);
router.get('/new', isLoggedIn, productCtrl.newForm);
router.post('/', isLoggedIn, productCtrl.create);
router.get('/:id/edit', isLoggedIn, productCtrl.editForm);
router.put('/:id', isLoggedIn, productCtrl.update);
router.delete('/:id', isLoggedIn, productCtrl.delete);

module.exports = router;
