'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    emailAddress: {
      allowNull: false,
      type: DataTypes.STRING, },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING, },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING, },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};