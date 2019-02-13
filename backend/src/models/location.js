'use strict';
module.exports = (sequelize, DataTypes) => {
	const location = sequelize.define('location', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lat: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lng: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {});
	return location;
};