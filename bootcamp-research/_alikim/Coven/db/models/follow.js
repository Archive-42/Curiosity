'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, { as: "Follower", foreignKey: 'followerId' })
    Follow.belongsTo(models.User, { as: "Following", foreignKey: 'followingId' })
  };
  return Follow;
};