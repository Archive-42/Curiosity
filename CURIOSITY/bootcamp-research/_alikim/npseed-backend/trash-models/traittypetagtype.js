'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagTypesOfTraitTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TraitType)
      this.belongsTo(models.TagType)
    }
  };
  TagTypesOfTraitTypes.init({
    TraitTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    TagTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'TagTypesOfTraitTypes',
  });
  return TagTypesOfTraitTypes;
};