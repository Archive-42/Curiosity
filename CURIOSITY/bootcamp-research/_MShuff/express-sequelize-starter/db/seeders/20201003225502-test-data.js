'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tweets", [
      {
        message: "The Martian was awesome!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "Has anyone seen Ready Player One?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "Harry Potter and the Sorcerer's Stone is the best out of all seven HP books :).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tweets", null, {});
  }
};
