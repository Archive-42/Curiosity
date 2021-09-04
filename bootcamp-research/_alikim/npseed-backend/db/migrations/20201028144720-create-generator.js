'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Generators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        defaultValue: "Untitled",
        type: Sequelize.STRING(50),
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
        defaultValue: "cogs",
      },
      UserId: {
        references: { model: 'Users' },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Generators');
  }
};