'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Characters", [
      {UserId: 1, name: "Lucien Leavitt"},
      {UserId: 1, name: "Rosalyn Reddish"},
      {UserId: 2, name: "Heather Hemlock"},
      {UserId: 2, name: "Caillin Clay"},
      {UserId: 2, name: "Delilah Dentata"},
      {UserId: 4, name: "Oofa"},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Characters', null, {})
  }
};
