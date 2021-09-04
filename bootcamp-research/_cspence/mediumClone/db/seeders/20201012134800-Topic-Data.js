'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Topics", [
      {name: "Bears"},
      {name: "Polar Bears"},
      {name: "Brown Bears"},
      {name: "Black Bears"},
      {name: "Pandas"},
      {name: "Red Pandas"},
      {name: "Grizzly Bears"},
      {name: "Sloth Bears"},
      {name: "Teddiursas"},
      {name: "Sun Bears"},
      {name: "Spectacled Bears"},
      {name: "Blue Bears"},
      {name: "Owlbears"},
      {name: "Moonbears"},
      {name: "Bear Cubs"},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Topics", null, {})
  }
};
