'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Item.associate = function(models) {
    Item.hasMany(models.Starter, { foreignKey: 'itemId' })
  };
  return Item;
};