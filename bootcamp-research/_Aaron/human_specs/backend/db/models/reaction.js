"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    "Reaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      reaction_data: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
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
  Reaction.associate = function (models) {
    // associations can be defined here
    Reaction.belongsTo(models.User, { foreignKey: "user_id" });
  };

  Reaction.getStats = async function (id) {
    const reaction = await Reaction.findOne({
      where: {
        user_id: id,
      },
    });

    return reaction;
  };

  Reaction.updateStats = async function ({ id, reaction_score }) {
    // console.log(typeof speed, typeof errors, typeof letters, typeof score, typeof time, '\n')
    return await Reaction.update(
      {
        reaction_data: sequelize.fn(
          "array_append",
          sequelize.col("reaction_data"),
          reaction_score
        ),
      },
      {
        where: { user_id: id },
      }
    );
  };

  return Reaction;
};
