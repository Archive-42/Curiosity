'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Generators", [
      { title: "True Random" },
      { title: "Earthy", UserId: 1 },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Generators', null, {})
  }
}
