'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn(
			'events', // name of Source model
			'sensorId', // name of the key we're adding 
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'sensors', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}
		);
		queryInterface.addColumn(
			'sensors', // name of Source model
			'trashbinId', // name of the key we're adding 
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'trashbins', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}
		);
		return queryInterface.addColumn(
			'trashbins', // name of Source model
			'locationId', // name of the key we're adding 
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'locations', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}
		);
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn(
			'events', // name of Source model
			'sensorId', // key we want to remove
		);
		queryInterface.removeColumn(
			'sensors', // name of Source model
			'trashbinId', // key we want to remove
		);
		return queryInterface.removeColumn(
			'trashbins', // name of Source model
			'locationId', // key we want to remove
		);
	}
};