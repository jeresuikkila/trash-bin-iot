'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('touchtags', {
      dev_eui: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      app_eui: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      dev_addr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nwkskey: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      appskey: {
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
    return queryInterface.dropTable('touchtags');
  }
};