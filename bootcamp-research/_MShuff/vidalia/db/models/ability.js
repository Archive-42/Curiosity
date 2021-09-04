'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ability = sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    uses: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Ability.associate = function(models) {
    Ability.hasMany(models.Character, { foreignKey: 'abilityId'})
  };
  return Ability;
};