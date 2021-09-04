'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      images: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      options: {
        type: Sequelize.TEXT
      },
      inventory: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      shopId: {
        allowNull: false,
        references: { model: 'Shops' },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};