'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generator extends Model {

    static associate(models) {
      this.hasMany(models.Chance)
      this.hasMany(models.TagTypeChance)
      this.belongsTo(models.User)
    }
  };
  Generator.init({
    title: {
      allowNull: false,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Generator',
  });
  return Generator;
};