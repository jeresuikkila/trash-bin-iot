'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trashbins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      address: {
        type: Sequelize.STRING,
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