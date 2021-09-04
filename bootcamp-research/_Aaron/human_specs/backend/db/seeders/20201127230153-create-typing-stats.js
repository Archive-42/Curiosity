"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "TypingStats",
      [
        {
          speed: [23, 35, 48, 62, 77],
          score: [1000, 1200, 1500, 1900, 2300],
          time: ["0.43", " 0.28", "0.20", "0.16", "0.13"],
          letters: [50, 60, 55, 54, 53],
          errors: [10, 5, 3, 6, 8],
          user_id: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("TypingStats", null, {});
  },
};
