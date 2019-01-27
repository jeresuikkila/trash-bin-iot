'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensorbins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      default_pitch: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      default_roll: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      /*location: { type: Sequelize.GEOMETRY, defaultvalue: null }*/
      location: {
        type: Sequelize.STRING,
        defaultvalue: null
      },
      taglocation: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      battery: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('sensorbins');
  }
};
