// Imports
const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { Tweet } = db;
const { requireAuth } = require('../auth');
const router = express.Router();

router.use(requireAuth);

// Functions
const tweetNotFoundError = (tweetId) => {
  const error = new Error(`Tweet with the ID ${tweetId} could not be found!`);
  error.title = "Tweet not found.";
  error.status = 404;

  return error;
};

const tweetValidators = [
  check('message')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please provide a valid tweet.')
    .isLength({
      max: 280
    })
    .withMessage('Max tweet 280 characters.')
];

/* Tweet.findAll() to fetch all of your database tweets. (Read)
Tweet.findByPk() to fetch a database tweet based on the id from your request parameters. (Read)
Tweet.create() to generate a tweet in your database. (Create)
Tweet.update() to update a tweet in your database. (Update)
Tweet.destroy() to delete a tweet from your database. (Delete)  */

router.get('/', asyncHandler(async(req, res, next) => {
  const tweets = await Tweet.findAll();
  res.json({ tweets });
}));


router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const tweetId = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(tweetId);

  if (tweet) {
    res.json({ tweet });
  } else {
    next(tweetNotFoundError(tweetId));
  }
}));


router.post('/', tweetValidators, handleValidationErrors, asyncHandler(async(req, res, next) => {
  const { message } = req.body;
  const tweet = await Tweet.create({
    message,
  });
  res.json({ tweet });
}));


router.put('/:id(\\d+)', tweetValidators, handleValidationErrors, asyncHandler(async(req, res, next) => {
  const tweetId = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(tweetId);

  if (tweet) {
    const oldMessage = tweet.message;
    tweet.message = req.body.message;
    await tweet.save();

    res.json({ oldMsg: oldMessage, tweet });
  } else {
    next(tweetNotFoundError(tweetId));
  }
}));

router.delete('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const tweetId = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(tweetId);

  if (tweet) {
    await tweet.destroy();
    res.status(204).end();
  } else {
    next(tweetNotFoundError(tweetId))
  }
}));

module.exports = {
  tweetRouter: router,
};
