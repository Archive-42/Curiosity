"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Follows",
      [
        {
          userId: 1,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          followerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Follows", null, {});
  },
};
