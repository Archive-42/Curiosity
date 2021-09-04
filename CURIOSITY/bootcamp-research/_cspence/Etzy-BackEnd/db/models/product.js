'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    images: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    options: DataTypes.TEXT,
    inventory: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shopId: {
      allowNull: false,
      references: { model: 'Shops' },
      type: DataTypes.INTEGER
    }
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.Shop, { foreignKey: 'shopId' });
    Product.hasMany(models.Favorite, { foreignKey: 'productId' });
    Product.hasMany(models.Purchase, { foreignKey: 'productId' });
  };
  return Product;
};