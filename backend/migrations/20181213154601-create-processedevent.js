'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('processedevents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    return queryInterface.dropTable('processedevents');
  }
};