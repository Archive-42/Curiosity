const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/user/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken()
  })

});

const userValidators = [
  check('firstName')
    .exists({checkFalsy: true})
    //stopped here
]

router.post('/user/register', csrfProtection, (req, res) => {

});

module.exports = router;