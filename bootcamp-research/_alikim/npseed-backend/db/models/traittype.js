'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraitType extends Model {

    static associate(models) {
      this.hasMany(models.Trait)
      this.hasMany(models.Character)
      this.belongsTo(models.Category)
      // TODO Check if this 'through' works.
      this.belongsToMany(models.Character, { through: "CharTraits" })
      this.belongsToMany(models.TagType, {through: "TagTypesOfTraitTypes"})
    }
  };
  TraitType.init({
    traitType: {
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    },
    CategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'TraitType',
  });
  return TraitType;
};