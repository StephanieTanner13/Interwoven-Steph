const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const jwt = require('../middleware/jwt-check');
router.get('/story', userController.userStory)
router.get('/profile', userController.getProfile);
router.get('/unaprovedStories', jwt, userController.getUnaprovedStories);
module.exports = router;
