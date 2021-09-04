'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enemy = sequelize.define('Enemy', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    subtype: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    alignment: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    armorClass: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hitPoints: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    hitDice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challenge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    xpReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weakness: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  Enemy.associate = function(models) {
    // Enemy.hasMany(models.Ability, { foreignKey: 'ability1' })
    // Enemy.hasMany(models.Ability, { foreignKey: 'ability2' })
  };
  return Enemy;
};