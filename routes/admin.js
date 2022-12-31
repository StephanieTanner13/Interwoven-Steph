const express = require('express');
const router = express.Router();
const adminConroller = require('../controllers/admin');
const jwt = require('../middleware/jwt-check');

router.get('/getNonApprovedPosts', jwt, adminConroller.getNonApproved);
router.post('/approveStory', jwt, adminConroller.approveStory);
router.post('/unapproveStory', jwt, adminConroller.unapproveStory);
module.exports = router;
