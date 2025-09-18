const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', productController.list);
router.get('/new', ensureAuthenticated, productController.showCreate);
router.post('/', ensureAuthenticated, productController.create);
router.get('/:id/edit', ensureAuthenticated, productController.showEdit);
router.put('/:id', ensureAuthenticated, productController.update);
router.delete('/:id', ensureAuthenticated, productController.delete);

module.exports = router;
