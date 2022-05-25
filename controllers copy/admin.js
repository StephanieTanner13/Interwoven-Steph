const Story = require('../models/Story');

exports.getNonApproved = (req, res, next) => {
    console.log('request to get non approved');
    if (!req.isMod) {
        res.status(401).json({ message: 'You are not mod, Get out!' });
        return;
    }
    Story.find({ approved: false })
        .populate('creator', ['first_name', 'last_name'])
        // .select('-creator._id -creator.password -creator.isMod')
        // .select('-creator.password')
        // .select('-creator.isMod')
        .then((stories) => {
            if (!stories) {
                res.status(200).json({ stories: [] });
            }
            console.log(stories);
            res.status(200).json({ stories: stories });
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
};

exports.approveStory = (req, res, next) => {
    if (!req.isMod) {
        res.status(401).json({ message: 'You are not mod, Get out!' });
        return;
    }
    const storyId = req.body.storyId;
    let foundStory;
    Story.findById(storyId)
        .then((story) => {
            if (!story) {
                throw new Error('Could not find Story');
            }
            foundStory = story;
            story.approved = true;
            return story.save();
        })
        .then((result) => {
            res.status(200).json({ id: foundStory._id });
            return;
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
};

exports.unapproveStory = (req, res, next) => {
    if (!req.isMod) {
        res.status(401).json({ message: 'You are not mod, Get out!' });
        return;
    }
    const storyId = req.body.storyId;
    let foundStory;
    Story.findById(storyId)
        .then((story) => {
            if (!story) {
                throw new Error('Could not find Story');
            }
            foundStory = story;
            story.approved = false;
            return story.save();
        })
        .then((result) => {
            res.status(200).json({ id: foundStory._id });
            return;
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
};
