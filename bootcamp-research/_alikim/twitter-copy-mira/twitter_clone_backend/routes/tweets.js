const express = require('express')
const router = express.Router()
const db = require("../db/models");
const { Tweet, User } = db;
const { check, validationResult } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { requireAuth } = require('../auth')

router.use(requireAuth)

const tweetNotFoundError = (tweetId) => {
    const error = new Error(`The tweet with ${tweetId} Id could not be found!!!`);
    error.title = "Tweet not found";
    error.status = 404;
    return error;
}

const validators = [
    check("message")
        .exists({ checkFalsey: true })
        .withMessage("Message can't be empty.")
        .isLength({ max: 280, min: 1 })
        .withMessage("You need to make the message at least 1 characters and less than 280 characters.")
]

router.get("/", asyncHandler(async (req, res) => {
  console.log("we are in the tweets route now")
    const tweets = await Tweet.findAll({
        include: [{ model: User, as: "user", attributes: ["username"] }],
        order: [["createdAt", "DESC"]],
        attributes: ["message"],
    });
    console.log("tweets from backend", tweets)
    res.json({ tweets });
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweet = await Tweet.findByPk(req.params.id);
    if (!tweet) {
        console.log('There is no tweet!')
        next(tweetNotFoundError(req.params.id))
    } else {
        res.json({ tweet });
    }
}));

router.post("/", validators, handleValidationErrors, asyncHandler(async (req, res) => {
    const tweet = await Tweet.create({
        message: req.body.message,
        userId: req.user.id // TO-DO Ask question on why not use req.body.user.id
    })
    res.json({ tweet })
}));

router.put("/:id(\\d+)", validators, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    console.log(req.body.message);
    const tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        await tweet.update({ message: req.body.message });
        res.json({ tweet });
    } else {
        next(tweetNotFoundError(tweetId));
    }
}))

router.delete("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id
    const tweet = await Tweet.findByPk(tweetId)
    if (tweet) {
        await tweet.destroy()
        res.status(204).end()
    } else {
        next(tweetNotFoundError(tweetId))
    }
}))

module.exports = router
