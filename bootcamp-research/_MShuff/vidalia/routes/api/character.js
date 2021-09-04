const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, Character, Class, Weapon, Starter, Ability, Spell, Item} = require('../../db/models');
const { generateToken } = require('./security-utils');


const router = express.Router();


router.get('/:id', asyncHandler(async function (req, res, next) {
    const creatorId = Number(req.params.id)
    const characters = await Character.findAll({ where:{ creatorId }, include: [ { model: Class, attributes:['name', 'weakness'],
    include: [ { model: Starter, attributes:['id','name', 'description'],
    include: [ { model: Weapon, attributes:['id', 'name', 'description', 'hitDice', 'damageType', 'cost'] },
    { model: Spell }, { model: Item, attributes:['id', 'name','description', 'cost']} ] } ] },
    { model: Ability, attributes:['id', 'name', 'description', 'uses'] } ]});

    res.json(characters)
    return
}));


router.post('/', asyncHandler(async function (req, res, next) {
    const { id } = req.body
    const characters = await Character.findOne({ where:{ id }, include: [ { model: Class, attributes:['name', 'weakness'],
    include: [ { model: Starter, attributes:['id','name', 'description'],
    include: [ { model: Weapon, attributes:['id', 'name', 'description', 'hitDice', 'damageType', 'cost'] },
    { model: Spell }, { model: Item, attributes:['id', 'name','description', 'cost']} ] } ] },
    { model: Ability, attributes:['id', 'name', 'description', 'uses'] } ]});

    res.json(characters)
    return
}));

module.exports = router;