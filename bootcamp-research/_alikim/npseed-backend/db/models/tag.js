'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      this.belongsTo(models.TagType)
      this.hasOne(models.Chance)
      this.belongsToMany(models.Trait, {through: "TraitTags" })
    }
  };
  Tag.init({
    tag: {
      allowNull: false,
      validate: { notEmpty: true },
      type: DataTypes.STRING(250),
    },
    TagTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};