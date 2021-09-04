'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraitTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trait)
      this.belongsTo(models.Tag)
    }
  };
  TraitTag.init({
    TraitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TraitTag',
  });
  return TraitTag;
};