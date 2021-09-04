'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TraitTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      traitType: {
        allowNull: false,
        type: Sequelize.STRING(250),
        unique: true,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories' },
      },
      description: {
        type: Sequelize.STRING(),
      },
      color: {
        type: Sequelize.STRING(50),
        defaultValue: "rgb(70,60,70)",
      },
      icon: {
        type: Sequelize.STRING(50),
        defaultValue: "user-edit",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TraitTypes');
  }
};