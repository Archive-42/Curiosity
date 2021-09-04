const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { Class, Weapon, Spell, Item} = require('../../db/models');
const { generateToken } = require('./security-utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const router = express.Router();

router.post('/', asyncHandler(async function (req, res, next) {
    const cost = req.body.cost;
    const charClass = req.body.name;
    const weapons = await Weapon.findAll({ where: { cost: { [Op.between]: [0, cost] } }})
    const firstItems = await Item.findAll({ where: { cost: { [Op.between]: [0, cost] } }})
    const spells = await Spell.findAll();

    let items = []
    if(charClass !== 'Ranger'){
        for(let i = 0; i < firstItems.length; i++){
            let item = firstItems[i]
            if(!item.name.includes('Arrow')) items.push(item);
        }
    }

    let drops = [];
    let data = [];
    if(charClass !== 'Sorcerer'){
        data = [...weapons, ...items]
    } else {
        data = [...items, ...spells]
    }

    let numOfDrops = Math.floor(Math.random() * 6)

    if (numOfDrops === 0){
        numOfDrops += 1;
    }

    for(let i = 0; i < numOfDrops; i++){
        drops.push(data[Math.floor(Math.random() * (data.length - 1))])
    }


    res.json(drops)
}));

module.exports = router;