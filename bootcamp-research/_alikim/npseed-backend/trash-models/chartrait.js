'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharTrait extends Model {

    static associate(models) {
      this.belongsTo(models.Character)
      this.belongsTo(models.Trait)
      this.belongsTo(models.TraitType)
    }
  };
  CharTrait.init({
    CharacterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    TraitId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    TraitTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'CharTrait',
  });
  return CharTrait;
};