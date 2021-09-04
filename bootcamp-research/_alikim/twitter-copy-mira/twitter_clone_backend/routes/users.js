const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const db = require("../db/models");
const { User, Tweet } = db;
const { getUserToken, requireAuth } = require('../auth')

const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];
// Registers new user
router.post("/", validateUsername, validateEmailAndPassword, handleValidationErrors,
asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword })
    const token = getUserToken(user) // Creates and attaches token to new user
    res.status(201).json({
      user: { id: user.id },
      token,
    });
}));

router.post("/token", validateEmailAndPassword, asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    })
    console.log("email", email, "password", password, "user", user.username) // MIRA
    if (!user || !user.validatePassword(password)) {
        // console.log("reaching the /token if") // MIRA
        const err = new Error("Login failed");
        err.status(401); // Put into (parenths)
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    // console.log("we made it to token-making!") // MIRA
    const token = getUserToken(user);
    console.log("new token /token", token)
    res.json({ token, user: { id: user.id } });
}))

router.get("/:id/tweets", requireAuth, asyncHandler(async(req, res) => {
    const tweets = await Tweet.findAll({
        where: {
            userId: req.params.id
        }
      })
    console.log("tweets of special id", tweets)  
    await res.json({ tweets })
}));

module.exports = router;
