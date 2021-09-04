"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Boards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      subtitle: {
        type: Sequelize.TEXT,
      },
      grid: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actives: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      guide: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Boards");
  },
};
