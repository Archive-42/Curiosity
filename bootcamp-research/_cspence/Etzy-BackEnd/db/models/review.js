'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    purchaseId: {
      allowNull: false,
      references: { model: 'Purchases' },
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    reviewBody: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    reviewImg: DataTypes.STRING,
    anonymous: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    productReview: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.Purchase, { foreignKey: 'purchaseId' });
  };
  return Review;
};