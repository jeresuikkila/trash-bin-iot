'use strict';
module.exports = (sequelize, DataTypes) => {
	const event = sequelize.define('event', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
            primaryKey: true,
            autoIncrement: true
		},
		event_type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		event_time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {});
	event.associate = models => {
		event.sensor = event.belongsTo(models.sensor)
	};
	return event;
};