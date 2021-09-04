"use strict";
const { Op, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TypingStat = sequelize.define(
    "TypingStat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      speed: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [0],
      },
      score: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [0],
      },
      time: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false,
        defaultValue: [0],
      },
      letters: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [0],
      },
      words: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [0],
      },
      errors: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [0],
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  TypingStat.associate = function (models) {
    TypingStat.belongsTo(models.User, { foreignKey: "user_id" });
  };

  TypingStat.getStats = async function (id) {
    const typingStat = await TypingStat.findOne({
      where: {
        user_id: id,
      },
    });

    return typingStat;
  };

  TypingStat.updateStats = async function ({
    id,
    speed,
    letters,
    score,
    errors,
    time,
  }) {
    // console.log(typeof speed, typeof errors, typeof letters, typeof score, typeof time, '\n')
    return await TypingStat.update(
      {
        speed: sequelize.fn("array_append", sequelize.col("speed"), speed),
        score: sequelize.fn("array_append", sequelize.col("score"), score),
        time: sequelize.fn("array_append", sequelize.col("time"), time),
        errors: sequelize.fn("array_append", sequelize.col("errors"), errors),
        letters: sequelize.fn(
          "array_append",
          sequelize.col("letters"),
          letters
        ),
      },
      {
        where: { user_id: id },
      }
    );
  };

  return TypingStat;
};
