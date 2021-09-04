'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Follows', [
      { followerId: 1, followingId: 3, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 4, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 5, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 6, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 3, followingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 3, followingId: 4, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 3, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 5, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 6, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 5, followingId: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Follows', null, {});
  }
};
