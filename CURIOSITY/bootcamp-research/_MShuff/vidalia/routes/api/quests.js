const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, Quest } = require('../../db/models');
const { generateToken } = require('./security-utils');
// const jwt = require('jsonwebtoken');
// const uuid = require('uuid').v4;

const router = express.Router();

router.get('/', asyncHandler(async function (req, res, next) {
    const quests = await Quest.findAll({ include: [ { model: User, attributes:['username'] } ], order: [ ['id', 'DESC'] ] });

    res.json(quests)
}));

module.exports = router;