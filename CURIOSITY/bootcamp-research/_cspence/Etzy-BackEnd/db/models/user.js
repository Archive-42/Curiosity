'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    avatar: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Shop, { foreignKey: 'ownerId' });
    User.hasMany(models.Follow, { as: 'Following', foreignKey: 'followerId' });
    User.hasMany(models.Follow, { as: 'Follower', foreignKey: 'followingId' });
    User.hasMany(models.Favorite, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };
  return User;
};