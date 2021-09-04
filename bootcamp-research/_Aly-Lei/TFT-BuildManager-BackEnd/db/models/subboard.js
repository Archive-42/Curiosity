"use strict";
module.exports = (sequelize, DataTypes) => {
  const SubBoard = sequelize.define(
    "SubBoard",
    {
      title: DataTypes.STRING,
      grid: DataTypes.JSON,
      actives: DataTypes.JSON,
      subtitle: DataTypes.TEXT,
      boardId: DataTypes.INTEGER,
    },
    {}
  );
  SubBoard.associate = function (models) {
    SubBoard.belongsTo(models.Board, { foreignKey: "boardId" });
  };
  return SubBoard;
};
