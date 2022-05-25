const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const jwt = require('../middleware/jwt-check');

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);

router.post('/changePassword', jwt, authController.changePassword);

module.exports = router;
