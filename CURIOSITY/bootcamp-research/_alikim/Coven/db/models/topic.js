'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    topic: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {});
  Topic.associate = function (models) {
    Topic.hasMany(models.Watch, { foreignKey: "topicId" })
    Topic.hasMany(models.Tag, { foreignKey: "topicId" })
  };
  return Topic;
};