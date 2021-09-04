"use strict";
module.exports = (sequelize, DataTypes) => {
  const Memory = sequelize.define(
    "Memory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      memory_data: {
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
  Memory.associate = function (models) {
    // associations can be defined here
    Memory.belongsTo(models.User, { foreignKey: "user_id" });
  };

  Memory.getStats = async function (id) {
    const memory = await Memory.findOne({
      where: {
        user_id: id,
      },
    });

    return memory;
  };

  Memory.updateStats = async function ({ id, levels }) {
    return await Memory.update(
      {
        memory_data: sequelize.fn(
          "array_append",
          sequelize.col("levels"),
          levels
        ),
      },
      {
        where: { user_id: id },
      }
    );
  };

  return Memory;
};
