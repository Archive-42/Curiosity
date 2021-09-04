'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('Quest', {
    title: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER
    },
  }, {});
  Quest.associate = function(models) {
    Quest.belongsTo(models.User, { foreignKey: 'creatorId' })
  };
  return Quest;
};