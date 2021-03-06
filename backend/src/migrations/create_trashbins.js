'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('trashbins', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				unique: true,
                allowNull: false,
                autoIncrement: true
			},
			bintype: {
				type: Sequelize.STRING,
				defaultValue: null
			},
			owner: {
				type: Sequelize.STRING,
				defaultValue: null
			},
			size: {
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			latestEmptied: {
				type:Sequelize.DATE,
				defaultValue: null
            },
            fillStatus: {
                type: Sequelize.INTEGER,
                defaultValue: null
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
		return queryInterface.dropTable('trashbins');
	}
};