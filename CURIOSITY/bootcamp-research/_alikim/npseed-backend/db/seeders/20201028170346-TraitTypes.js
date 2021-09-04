'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("TraitTypes", [
      { CategoryId: 1, traitType: "name" },           // 1
      { CategoryId: 1, traitType: "biological sex" }, // 2
      { CategoryId: 1, traitType: "gender" },         // 3
      { CategoryId: 1, traitType: "orientation" },    // 4
      { CategoryId: 1, traitType: "age" },            // 5
      { CategoryId: 1, traitType: "species" },        // 6
      { CategoryId: 1, traitType: "region" },         // 7
      { CategoryId: 1, traitType: "occupation" },     // 8
      { CategoryId: 1, traitType: "condition" },      // 9

      { CategoryId: 2, traitType: "hair color" },     // 10
      { CategoryId: 2, traitType: "hair style" },     // 11
      { CategoryId: 2, traitType: "eye color" },      // 12
      { CategoryId: 2, traitType: "skin color" },     // 13
      { CategoryId: 2, traitType: "physique" },       // 14
      { CategoryId: 2, traitType: "quirk" },          // 15

      // { CategoryId: 3, traitType: "headwear" },
      // { CategoryId: 3, traitType: "clothing" },
      // { CategoryId: 3, traitType: "tool" },
      // { CategoryId: 3, traitType: "footwear" },
      // { CategoryId: 3, traitType: "accessory" },
      // { CategoryId: 3, traitType: "condition" },
      // { CategoryId: 3, traitType: "quality" },
      // { CategoryId: 3, traitType: "color palette" },

      // { CategoryId: 4, traitType: "History" },
      // { CategoryId: 4, traitType: "Bonds" },
      { CategoryId: 4, traitType: "personality" },     // 14
      // { CategoryId: 4, traitType: "interests" },
      { CategoryId: 4, traitType: "Ideal" },
      { CategoryId: 4, traitType: "Wish" },
      { CategoryId: 4, traitType: "Fear" },
      { CategoryId: 4, traitType: "Secret" },
      { CategoryId: 4, traitType: "Demeanor" },
      { CategoryId: 4, traitType: "Mannerism" }, // 10

      // { CategoryId: 5, traitType: "valuables" },
      // { CategoryId: 5, traitType: "Knowledge" },
      // { CategoryId: 5, traitType: "Skill" },
      // { CategoryId: 5, traitType: "Clout" },

      { CategoryId: 6, traitType: "Intelligence" }, // 15
      { CategoryId: 6, traitType: "Charisma" },
      { CategoryId: 6, traitType: "Wisdom" },
      { CategoryId: 6, traitType: "Strength" },
      { CategoryId: 6, traitType: "Constitution" },
      { CategoryId: 6, traitType: "Dexterity" }, // 20
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TraitTypes', null, {})
  }
};