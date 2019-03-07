'use strict';
module.exports = (sequelize, DataTypes) => {
	const trashbin = sequelize.define('trashbin', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
            allowNull: false,
            autoIncrement: true
		},
		wasteType: {
			type: DataTypes.STRING,
			defaultValue: null
		},
		owner: {
			type: DataTypes.STRING,
			defaultValue: null
		},
		size: {
			type: DataTypes.INTEGER,
			defaultValue: null
		},
		latestEmptied: {
			type: DataTypes.DATE,
			defaultValue: null
        },
        fillStatus: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        pickupOverdue: {
            type: DataTypes.BOOLEAN,
            defaultvalue: false
        }
	}, {});
	trashbin.associate = function(models) {
		trashbin.belongsTo(models.location);
	  };
	return trashbin;
};