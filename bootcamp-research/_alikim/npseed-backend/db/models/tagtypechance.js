'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagTypeChance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Generator)
      this.belongsTo(models.TagType)
      this.belongsTo(models.Chance)
      
    }
  };
  TagTypeChance.init({
    GeneratorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    TagTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    chanceLock: {
      allowNull: false,
      type: DataTypes.FLOAT,
    }
  }, {
    sequelize,
    modelName: 'TagTypeChance',
  });
  return TagTypeChance;
};