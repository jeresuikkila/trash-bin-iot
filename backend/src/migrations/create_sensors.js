'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('sensors', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				unique: true,
				allowNull: false
			},
			default_pitch: {
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			default_roll: {
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			taglocation: {
				type: Sequelize.STRING,
				defaultValue: null
			},
			battery: {
				type: Sequelize.FLOAT,
				defaultValue: null
			},
			lat: {
				type: Sequelize.STRING,
				defaultvalue: null
			},
			lng: {
				type: Sequelize.STRING,
				defaultvalue: null
			},
			createdAt: {
				defaultValue: null,
				type: Sequelize.DATE
			},
			updatedAt: {
				defaultValue: null,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('sensors');
	}
};