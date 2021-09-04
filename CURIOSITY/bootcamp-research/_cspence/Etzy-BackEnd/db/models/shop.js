'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    },
    ownerId: {
      allowNull: false,
      references: { model: 'Users' },
      type: DataTypes.INTEGER
    },
    description: DataTypes.TEXT
  }, {});
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { foreignKey: 'shopId' });
    Shop.belongsTo(models.User, { foreignKey: 'ownerId' });
  };
  return Shop;
};