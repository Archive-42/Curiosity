'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [
      { name: 'ArtfulDemo', ownerId: 1, description: 'We like abstract art here, we hope you like it, too. After all, it\'s only for a demo.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Zen With Bethany', ownerId: 4, description: 'Let\'s find peace in our daily lives. We provide yoga and meditation supplies as well as peaceful incense, candles and art.', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};
