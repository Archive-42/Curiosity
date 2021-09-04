'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss a');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss a');
      }
    },
  }, {});

  Comment.associate = function (models) {
    Comment.belongsTo(models.Exercise, {
      foreignKey: 'commentableId', constraints: false
    });

    Comment.belongsTo(models.Workout, {
      foreignKey: 'commentableId', constraints: false
    });

    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
    });


    Comment.addHook("afterFind", findResult => {
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        if (instance.commentableType === "Exercise" && instance.Exercise !== undefined) {
          instance.commentable = instance.Exercise;
        } else if (instance.commentableType === "Workout" && instance.Workout !== undefined) {
          instance.commentable = instance.Workout;
        }
        // To prevent mistakes:
        delete instance.Exercise;
        delete instance.dataValues.Exercise;
        delete instance.Workout;
        delete instance.dataValues.Workout;
      }
    });
  };

  Comment.prototype.getCommentable = function (options) {
    if (!this.commentableType) return Promise.resolve(null);
    const mixinMethodName = `get${this.commentableType}`;
    return this[mixinMethodName](options);
  };
  return Comment;
};
