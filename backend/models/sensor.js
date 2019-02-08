'use strict';
module.exports = (sequelize, DataTypes) => {
	const sensor = sequelize.define('sensor', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			allowNull: false
		},
		default_pitch: {
			type: DataTypes.INTEGER,
			defaultValue: null
		},
		default_roll: {
			type: DataTypes.INTEGER,
			defaultValue: null
		},
		taglocation: {
			type: DataTypes.STRING,
			defaultValue: null
		},
		battery: {
			type: DataTypes.FLOAT,
			defaultValue: null
		},
		lat: {
			type: DataTypes.STRING,
			defaultvalue: null
		},
		lng: {
			type: DataTypes.STRING,
			defaultvalue: null
		}
	}, {});
	sensor.associate = function (models) {
		sensor.belongsTo(models.trashbin);
	};
	return sensor;
};