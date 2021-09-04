const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { User } = db;
const { getUserToken } = require('../auth');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const router = express.Router();

// Validations
const validateUsername = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username')
    .isLength({ min: 5 })
    .withMessage('Username must be a minimum of 5 characters'),
];

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide an email'),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
];

router.post('/', validateUsername, validateEmailAndPassword, asyncHandler(async(req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, hashedPassword });

  const token = getUserToken(user);
  res.status(201).json({
    user: {
      id: user.id,
    },
    token,
  });
}));

router.post('/token', validateEmailAndPassword, asyncHandler(async(req, res, next) => {
  const { email, password } = req.body;
  // Find user based on email
  const user = await User.findOne({ where: { email, } });

  if (!user || !user.validatePassword(password)) {
    const err = new Error("Login Failed");
    err.status = 401;
    err.title = "Login Failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  const token = getUserToken(user);
  res.json({ token, user: { id: user.id } });
  // Password validation and error handling
  // Token generation
}));

module.exports = {
  usersRouter: router,
};
