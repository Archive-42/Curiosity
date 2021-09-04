'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trait extends Model {

    static associate(models) {
      this.hasMany(models.Character)
      this.belongsTo(models.TraitType)
      // TODO check if this through thing works
      this.belongsToMany(models.Character, { through: "CharTraits" })
      this.belongsToMany(models.Tag, { through: "TraitTags" })
    }
  }
  Trait.init({
    trait: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: { notEmpty: true },
    },
    TraitTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Trait',
  });
  return Trait;
};