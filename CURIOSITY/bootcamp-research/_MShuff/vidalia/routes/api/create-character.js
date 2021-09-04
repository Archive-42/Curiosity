const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, Character, Class, Weapon, Starter, Ability, Spell, Item} = require('../../db/models');
const { generateToken } = require('./security-utils');


const router = express.Router();

router.get('/form-data-info', asyncHandler(async function (req, res, next) {
    const abilities = await Ability.findAll();
    const classes = await Class.findAll();

    res.json({abilities, classes})
    return
}));

router.post('/make', asyncHandler(async function (req, res, next) {
    const { name, story, abilityId, classId, creatorId  } = req.body;
    let armorClass = 10;
    let hitPoints = 10;
    let strength = 10;
    let dexterity = 10;
    let constitution = 10;
    let intelligence = 10;
    let wisdom = 10;
    let charisma = 10;

    if(classId === 1){
        armorClass += 3;
        hitPoints += 3;
        strength += 3;
        constitution += 2;
        intelligence -= 1;
        wisdom -= 1;
    } else if (classId === 2){
        armorClass += 2;
        hitPoints += 4;
        strength += 2;
        constitution += 3;
        charisma += 1;
    } else if (classId === 3) {
        hitPoints += 1;
        strength += 3;
        dexterity += 3;
        constitution += 1;
        charisma += 3;
    } else if (classId === 4){
        hitPoints += 2;
        strength += 1;
        dexterity += 5;
        constitution += 2;
        intelligence += 1;
        wisdom += 2;
        charisma += 5;
    } else if (classId === 5){
        hitPoints += 1;
        strength += 1;
        dexterity += 5;
        constitution += 2;
        intelligence += 3;
        wisdom +=3;
        charisma +=2;
    } else {
        armorClass -= 1;
        constitution += 4;
        intelligence += 5;
        wisdom += 5;
        charisma += 3;
    }

    const newCharacter = { name, story, armorClass, hitPoints,
    strength, dexterity, constitution, intelligence, wisdom, charisma,
    abilityId, classId, creatorId }

    const chara = await Character.create(newCharacter)

    res.json(chara)
}));

module.exports = router;