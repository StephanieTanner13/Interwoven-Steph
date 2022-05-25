const mongoose = require('mongoose');
const Story = require('../models/Story');
const User = require('../models/User');


// I don't know why the search function was changed to query based on a userid, but I changed it back.
// This new function is for the search based on userID I haven't added it into the routes or REST file, just here.
exports.searchMyStory = (req, res, next) => {
   let user = req.query.country;

   Story
   .find({ country_code: country })
   .then((stories) => {
      res.status(200).json({
         searchStories: stories
      });
   });
};

exports.search = (req, res, next) => {
   let country = req.query.country;

   Story
   .find({ country_code: country })
   .then((stories) => {
      res.status(200).json({
         searchStories: stories
      });
   });
};



exports.addStory = (req, res, next) => {
   const title = req.body.title;
   const content = req.body.content;
   const country_code = req.body.country_code;
   const userId = req.userId;
   let story;
   User
   .findById(userId)
   .then((user) => {
      if (!user) {
         throw new Error('Could not find user, Try again.');
      }
      story = new Story({
         title: title,
         content: content,
         country_code: country_code,
         approved: false,
         creator: userId,
      });

      return story.save();
   })
   .then((result) => {
      return res.status(200).json({ id: story._id });
   })
   .catch((err) => {
      err.statusCode = 500;
      next(err);
   });
};
