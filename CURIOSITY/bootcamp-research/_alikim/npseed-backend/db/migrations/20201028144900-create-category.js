'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        allowNull: false,
        unique: true,
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
        defaultValue: "folder-open",
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories')
  }
}