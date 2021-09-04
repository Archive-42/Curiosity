'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CharTraits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CharacterId: {
        allowNull: false,
        references: { model: 'Characters' },
        type: Sequelize.INTEGER,
      },
      TraitTypeId: {
        allowNull: false,
        references: { model: 'TraitTypes' },
        type: Sequelize.INTEGER,
      },
      TraitId: {
        allowNull: false,
        references: { model: 'Traits' },
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(),
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

    await queryInterface.addConstraint("CharTraits", {
      fields: ["CharacterId", "TraitTypeId"],
      type: 'unique',
      // customIndex: true, // TODO What is this for?
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CharTraits');
  }
};