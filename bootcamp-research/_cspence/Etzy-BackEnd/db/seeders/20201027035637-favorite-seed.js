'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Favorites', [
      { userId: 1, favProduct: true, productId: 10, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, favProduct: true, productId: 8, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, favProduct: false, shopId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, favProduct: true, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, favProduct: false, shopId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, favProduct: false, shopId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, favProduct: true, productId: 7, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, favProduct: true, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, favProduct: false, shopId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, favProduct: true, productId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, favProduct: true, productId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: false, shopId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: false, shopId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 7, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, favProduct: true, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, favProduct: false, shopId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favorites', null, {});
  }
};
