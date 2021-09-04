'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Character)
      this.hasMany(models.Generator)
    }
  }
  User.init({
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    email: {
      unique: true,
      validate: { isEmail: true },
      type: DataTypes.STRING(250),
    },
    hashword: {
      allowNull: false,
      type: DataTypes.STRING(250).BINARY,
    },
  }, {
    sequelize,
    modelName: 'User',
  });


  User.prototype.validatePassword = async function (password) {
    console.log("\npassword when validating?", password)
    return await bcrypt.compareSync(password, this.hashword.toString())
  }
  return User;
};