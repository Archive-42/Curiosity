'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {

    static associate(models) {
      this.hasMany(models.Trait)
      this.belongsTo(models.User)

      this.belongsToMany(models.Trait, { through: "CharTraits" })
      this.belongsToMany(models.TraitType, {through: "CharTraits"})
    }
  };
  Character.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    },
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};