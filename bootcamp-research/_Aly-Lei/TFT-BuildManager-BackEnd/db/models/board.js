"use strict";
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      title: DataTypes.STRING,
      grid: DataTypes.JSON,
      authorId: DataTypes.INTEGER,
      actives: DataTypes.JSON,
      subtitle: DataTypes.TEXT,
      guide: DataTypes.JSON,
    },
    {}
  );
  Board.associate = function (models) {
    Board.belongsTo(models.User, { foreignKey: "authorId", as: "Creator" });
    Board.hasMany(models.SubBoard, {
      foreignKey: "boardId",
    });

    Board.belongsToMany(models.User, {
      as: "Bookmarks",
      through: "Bookmark",
      foreignKey: "boardId",
    });
  };
  return Board;
};
