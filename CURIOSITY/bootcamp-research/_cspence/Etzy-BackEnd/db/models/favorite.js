'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      allowNull: false,
      references: { model: 'Users' },
      type: DataTypes.INTEGER
    },
    favProduct: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    shopId: {
      defaultValue: null,
      references: { model: 'Products' },
      type: DataTypes.INTEGER
    },
    productId: {
      defaultValue: null,
      references: { model: 'Products' },
      type: DataTypes.INTEGER
    }
  }, {});
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.Product, { foreignKey: 'productId' });
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Shop, { foreignKey: 'shopId' });
  };
  return Favorite;
};