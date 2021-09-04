'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TagTypes', [
      { tagType: "gender" },            // 01
      { tagType: "region" },            // 02
      { tagType: "theme" },             // 03
      { tagType: "color" },             // 04
      { tagType: "species" },           // 05
      { tagType: "setting" },           // 06
      { tagType: "age" },               // 07
      { tagType: "field of work" },     // 08
      { tagType: "time period" },       // 09
      { tagType: "unusualness" },       // 10
      { tagType: "style" },             // 11
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TagTypes', null, {})
  }
}
