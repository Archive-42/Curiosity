"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SubBoards",
      [
        {
          boardId: 1,
          title: "Some Board",
          subtitle: "Some subtitle",
          actives: JSON.stringify({}),
          grid: JSON.stringify([
            {
              id: "TFT4_Olaf",
              items: ["RH", "DB", "GA"],
              position: 0,
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SubBoards", null, {});
  },
};
