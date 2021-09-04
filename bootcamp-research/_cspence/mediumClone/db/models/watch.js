'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watch = sequelize.define('Watch', {
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Watch.associate = function (models) {
    Watch.belongsTo(models.Topic, { foreignKey: "topicId" })
    Watch.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Watch;
};