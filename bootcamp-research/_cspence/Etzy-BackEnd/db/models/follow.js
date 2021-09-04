'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      allowNull: false,
      references: { model: 'Users' },
      type: DataTypes.INTEGER
    },
    followingId: {
      allowNull: false,
      references: { model: 'Users' },
      type: DataTypes.INTEGER
    }
  }, {});
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { as: 'Follower', foreignKey: 'followerId' });
    Follow.belongsTo(models.User, { as: 'Following', foreignKey: 'followingId' });
  };
  return Follow;
};