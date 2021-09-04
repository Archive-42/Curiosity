'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Purchases', [
      { orderId: 1, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 1, productId: 8, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 2, productId: 10, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 10, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 8, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 3, productId: 8, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 4, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 4, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 4, productId: 6, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 5, productId: 2, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 6, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 6, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 6, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 6, productId: 7, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 7, productId: 2, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 7, productId: 3, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 8, productId: 3, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 8, productId: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 8, productId: 1, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 9, productId: 2, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 9, productId: 1, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 10, productId: 6, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 10, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 10, productId: 5, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 11, productId: 10, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 12, productId: 11, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 12, productId: 11, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Purchases', null, {});
  }
};
