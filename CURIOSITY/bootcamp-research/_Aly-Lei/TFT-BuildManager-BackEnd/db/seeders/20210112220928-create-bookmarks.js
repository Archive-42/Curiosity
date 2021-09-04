"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Bookmarks",
      [
        {
          boardId: 1,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          boardId: 1,
          followerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
