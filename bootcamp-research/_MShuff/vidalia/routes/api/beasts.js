const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { Enemy } = require('../../db/models');
const { generateToken } = require('./security-utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();


router.get('/:letter', asyncHandler(async function (req, res, next) {
    const filterBy = req.params.letter
    // const monsters = await Enemy.findAll();
    const monsters = await Enemy.findAll({ where: { name: { [Op.like]: `${filterBy}%`} }});

    res.json(monsters)
    return
}));

router.post('/get-enemies', asyncHandler(async function (req, res, next) {
    const { lower, upper } = req.body;

    const data = await Enemy.findAll({ where: { challenge: { [Op.between]: [lower, upper] } } })
    let numOfMonsters = Math.floor(Math.random() * 4)

    if (numOfMonsters === 0){
        numOfMonsters += 1;
    }

    let monsters = [];
    for(let i = 0; i < numOfMonsters; i++){
        monsters.push(data[Math.floor(Math.random() * (data.length - 1))])
    }
    res.json(monsters)
}))


module.exports = router;