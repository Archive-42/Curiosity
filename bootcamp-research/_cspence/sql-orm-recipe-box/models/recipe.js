'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING
  }, {});
  recipe.associate = function(models) {
    recipe.hasMany( models.instructions, {foreignKey: 'recipeId', onDelet: 'CASCADE', hooks: true});
    recipe.hasMany(models.ingredients, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true});
  };
  return recipe;
};
