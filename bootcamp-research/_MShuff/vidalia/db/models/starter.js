'use strict';
module.exports = (sequelize, DataTypes) => {
  const Starter = sequelize.define('Starter', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    weaponId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spellId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Starter.associate = function(models) {
    Starter.hasMany(models.Class, {foreignKey: 'starterId'})
    Starter.belongsTo(models.Weapon, { foreignKey: 'weaponId' })
    Starter.belongsTo(models.Spell, { foreignKey: 'spellId' })
    Starter.belongsTo(models.Item, { foreignKey: 'itemId' })
  };
  return Starter;
};