'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TagTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tagType: {
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
        defaultValue: "tags",
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TagTypes');
  }
};