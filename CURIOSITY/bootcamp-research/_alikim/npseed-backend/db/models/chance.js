'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chance extends Model {

    static associate(models) {
      this.belongsTo(models.Generator)
      this.belongsTo(models.Tag)
      // this.belongsToMany(models.TagTypeChance, { through: "TagTypes" })
      this.belongsToMany(models.TagType, { through: "GenTagTypes" })
    }
  }

  Chance.init({
    GeneratorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    TagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    chance: {
      validate: { isFloat: true },
      type: DataTypes.FLOAT,
    }
  }, {
    sequelize,
    modelName: 'Chance',
  });
  return Chance;
};