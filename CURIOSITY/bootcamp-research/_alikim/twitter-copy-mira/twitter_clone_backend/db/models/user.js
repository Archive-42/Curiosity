'use strict';

const bcrypt = require('bcryptjs')

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
    }
  }, {});
  
  User.associate = function (models) {
    User.hasMany(models.Tweet, {
      as: "tweets",
      foreignKey: "userId",
    })
  }

  User.prototype.validatePassword = function (password) {
    console.log("are we reaching the prototype method?", password, this.hashedPassword)
    // because this is a model instance method, `this` is the user instance here:
    console.log(bcrypt.compareSync(password, this.hashedPassword.toString()));
    const crypty = bcrypt.compareSync(password, this.hashedPassword.toString());
    console.log("crypty", crypty)
    return crypty
  };
  
  return User;
};