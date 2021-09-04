"use strict";
module.exports = (sequelize, DataTypes) => {
	const Ingredient = sequelize.define(
		"Ingredient",
		{
			amount: {
				type: DataTypes.NUMERIC,
				allowNull: false,

			},
			measurementUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,

			},
			foodStuff: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,

			},
		},
		{}
	);
	Ingredient.associate = function (models) {
		// associations can be defined here
		Ingredient.belongsTo(models.Recipe, { foreignKey: "recipeId" });
		Ingredient.belongsTo(models.MeasurementUnit, {
			foreignKey: "measurementUnitId",
		});
	};
	return Ingredient;
};
