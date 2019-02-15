'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('events', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
                primaryKey: true,
                autoIncrement: true
			},
			event_type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			event_time: {
				type: Sequelize.DATE,
				allowNull: false
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
		return queryInterface.dropTable('events');
	}
};