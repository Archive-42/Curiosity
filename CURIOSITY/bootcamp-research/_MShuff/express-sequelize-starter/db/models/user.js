const bcrypt = require('bcryptjs');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.validatePassword = function(password) {
    // Note that since this function is a model instance method,
    // `this` is the user instance here
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  return User;
};
