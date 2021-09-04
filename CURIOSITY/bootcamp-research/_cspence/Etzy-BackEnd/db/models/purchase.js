'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    orderId: {
      allowNull: false,
      references: { model: 'Orders' },
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      references: { model: 'Products' },
      type: DataTypes.INTEGER
    }
  }, {});
  Purchase.associate = function (models) {
    Purchase.belongsTo(models.Product, { foreignKey: 'productId' });
    Purchase.belongsTo(models.Order, { foreignKey: 'orderId' });
    Purchase.hasMany(models.Review, { foreignKey: 'purchaseId' });
  };
  return Purchase;
};