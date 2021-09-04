'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeasurementUnit = sequelize.define('MeasurementUnit', {
    name: DataTypes.STRING
  }, {});
  MeasurementUnit.associate = function(models) {
    // associations can be defined here
    MeasurementUnit.hasMany(models.ingredients, { foreignKey: 'measurementUnitId' })
  };
  return MeasurementUnit;
};
