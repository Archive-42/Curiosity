'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define(
    'images',
    {
      bucket: DataTypes.STRING,
      key: DataTypes.STRING
    },
    {}
  );
  images.associate = function (models) {
    // associations can be defined here
  };
  return images;
};
