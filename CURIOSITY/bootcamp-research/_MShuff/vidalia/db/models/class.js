'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.STRING(1000)
    },
    acMod: {
      type: DataTypes.INTEGER,
    },
    hpMod: {
      type: DataTypes.INTEGER,
    },
    strMod: {
      type: DataTypes.INTEGER,
    },
    dexMod: {
      type: DataTypes.INTEGER,
    },
    constMod: {
      type: DataTypes.INTEGER,
    },
    intelMod: {
      type: DataTypes.INTEGER,
    },
    wisdMod: {
      type: DataTypes.INTEGER,
    },
    charMod: {
      type: DataTypes.INTEGER,
    },
    starterId: {
      type: DataTypes.INTEGER,
    },
    weakness: {
      type: DataTypes.STRING(100)
    },
  }, {});
  Class.associate = function(models) {
    Class.belongsTo(models.Starter, { foreignKey: 'starterId' })
    Class.hasMany(models.Character, { foreignKey: 'classId' })
  };
  return Class;
};
