'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      allowNull: false,
      references: { model: 'Users' },
      type: DataTypes.INTEGER
    }
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.Purchase, { foreignKey: 'orderId' });
  };
  return Order;
};