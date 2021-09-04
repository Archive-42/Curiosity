'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Tag.associate = function (models) {
    Tag.belongsTo(models.Topic, { foreignKey: "topicId" })
    Tag.belongsTo(models.Story, { foreignKey: "storyId" })
  };
  return Tag;
};