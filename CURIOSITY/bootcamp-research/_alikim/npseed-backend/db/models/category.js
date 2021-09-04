'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      this.hasMany(models.TraitType)
      
      // this.belongsToMany(models.TraitType, {through: 'CatTraitTypes'})
      // this.belongsToMany(models.Trait, {through: 'CatTraits'})
      // this.belongsToMany(models.CharTrait, {through: 'CatCharTraits'})
    }
  };
  Category.init({
    category: {
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};