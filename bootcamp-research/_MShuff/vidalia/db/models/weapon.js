'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weapon = sequelize.define('Weapon', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    hitDice: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    damageType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Weapon.associate = function(models) {
    Weapon.hasMany(models.Starter, { foreignKey: 'weaponId' })
  };
  return Weapon;
};