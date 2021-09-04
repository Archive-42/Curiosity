'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagType extends Model {

    static associate(models) {
      this.hasMany(models.Tag)
      this.hasMany(models.TagTypeChance)

      this.belongsToMany(models.TraitType, { through: "TagTypesOfTraitTypes" })
      this.belongsToMany(models.Chance, { through: "GenTagTypes" })
    }
  };
  TagType.init({
    tagType: {
      allowNull: false,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    },
  }, {
    sequelize,
    modelName: 'TagType',
  });
  return TagType;
};