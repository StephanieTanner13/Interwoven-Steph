const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story');
const jwt = require('../middleware/jwt-check');
router.post('/addStory', jwt, storyController.addStory);
router.post('/deleteStory', jwt, storyController.deleteStory);

module.exports = router;
