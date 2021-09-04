'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
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
      story: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      armorClass: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hitPoints: {
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
      abilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Abilities' },
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Classes' },
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
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
    return queryInterface.dropTable('Characters');
  }
};