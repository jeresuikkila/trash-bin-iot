'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('locations', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				unique: true,
                allowNull: false,
                autoIncrement: true
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lat: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lng: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('locations');
	}
};