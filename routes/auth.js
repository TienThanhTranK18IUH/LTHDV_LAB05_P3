const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/auth');

router.get('/register', ensureGuest, authController.showRegister);
router.post('/register', authController.register);

router.get('/login', ensureGuest, authController.showLogin);
router.post('/login', authController.login);

router.get('/forgot', ensureGuest, authController.showForgot);
router.post('/forgot', authController.forgot);

router.post('/logout', authController.logout);

module.exports = router;
