'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    message: {
      type: DataTypes.STRING(280),
      allowNull: false
    }
  }, {});
  Tweet.associate = function (models) {
    Tweet.belongsTo(models.User, { 
      as: "user", // TODO QUESTION Where is this used?
      foreignKey: "userId",
    })
  };
  return Tweet;
};
