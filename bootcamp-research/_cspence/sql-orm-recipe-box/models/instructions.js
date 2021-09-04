'use strict';
module.exports = (sequelize, DataTypes) => {
  const instructions = sequelize.define('Instructions', {
    specification: DataTypes.TEXT,
    listOrder: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  instructions.associate = function(models) {
    // associations can be defined here
    instructions.belongsTo(models.recipe, { foreignKey: 'recipeId' });
  };
  return instructions;
};
