const mongoose = require('mongoose');
const Story = require('../models/Story');
const User = require('../models/User');
exports.getProfile = (req, res, next) => {
    const userId = req.query.userId;
    let foundUser;
    User.findById(userId)
        .then((user) => {
            if (!user) {
                throw new Error('Could not find user, Try again.');
            }

            foundUser = user;
            return Story.find({ creator: user._id, approved: true }).populate(
                'creator',
                ['first_name', 'last_name']
            );
        })
        .then((storyList) => {
            return res.status(200).json({
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                email: foundUser.email,
                stories: storyList,
            });
        })
        .catch((err) => {
            err.statusCode = 500;
            next(err);
        });
};

exports.userStory = (req, res, next) => {
    // let country = req.body.country;
    let creator1 = req.query.creator;
    console.log(creator1);

    Story.find({ creator: creator1 }).then((stories) => {
        console.log(stories)
        res.status(200).json({
            searchStories: stories
        });
    });
};


exports.getUnaprovedStories = (req, res, next) => {
    const userId = req.userId;

    let foundUser;
    User.findById(userId)
        .then((user) => {
            if (!user) {
                throw new Error('Could not find user, Try again.');
            }
            foundUser = user;
            return Story.find({ creator: user._id, approved: false });
        })
        .then((storyList) => {
            return res.status(200).json({
                stories: storyList,
            });
        })
        .catch((err) => {
            err.statusCode = 500;
            next(err);
        });
};
