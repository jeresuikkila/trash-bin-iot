'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      packet_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      payload: {
        type: Sequelize.STRING,
        allowNull: false
      },
      original_message: {
        type: Sequelize.JSON,
        allowNull: false
      },
      event_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      temperature: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      trigger_code: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      trigger_counter: Sequelize.INTEGER,
      pitch: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      roll: {
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
    return queryInterface.dropTable('events');
  }
};