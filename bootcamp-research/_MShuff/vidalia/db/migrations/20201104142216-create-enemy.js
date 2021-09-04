'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Enemies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      subtype: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      alignment: {
        type: Sequelize.STRING(50),
      },
      armorClass: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hitPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hitDice: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      challenge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dexterity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      constitution: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      intelligence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wisdom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      charisma: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      xpReward: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weakness: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
    return queryInterface.dropTable('Enemies');
  }
};