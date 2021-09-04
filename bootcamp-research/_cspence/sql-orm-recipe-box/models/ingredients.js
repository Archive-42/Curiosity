'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingredients = sequelize.define('Ingredients', {
    amount: DataTypes.NUMERIC,
    measurementUnitId: DataTypes.INTEGER,
    foodStuff: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {});
  ingredients.associate = function(models) {
    // associations can be defined here
    ingredients.belongsTo(models.recipe, { foreignKey: 'recipeId' });
    ingredients.belongsTo(models.MeasurementUnit, { foreignKey: 'measurementUnitId' });
  };
  return ingredients;
};
