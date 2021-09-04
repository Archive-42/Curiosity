'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TagTypesOfTraitTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TraitTypeId: {
        allowNull: false,
        references: { model: 'TraitTypes' },
        type: Sequelize.INTEGER
      },
      TagTypeId: {
        allowNull: false,
        references: { model: 'TagTypes' },
        type: Sequelize.INTEGER
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
    })
    
    await queryInterface.addConstraint("TagTypesOfTraitTypes", {
      fields: ["TraitTypeId", "TagTypeId"],
      type: "unique",
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TagTypesOfTraitTypes');
  }
};