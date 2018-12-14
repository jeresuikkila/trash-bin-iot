'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'events', // name of Source model
      'touchtagDevEui', // name of the key we're adding 
      {
        type: Sequelize.STRING,
        references: {
          model: 'touchtags', // name of Target model
          key: 'dev_eui', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
      
    )
    queryInterface.addColumn(
      'sensorbins', // name of Source model
      'touchtagDevEui', // name of the key we're adding 
      {
        type: Sequelize.STRING,
        references: {
          model: 'touchtags', // name of Target model
          key: 'dev_eui', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    queryInterface.addColumn(
      'sensorbins', // name of Source model
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
    )
    return queryInterface.addColumn(
      'processedevents', // name of Source model
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
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'events', // name of Source model
      'touchtagDevEui' // key we want to remove
    )
    queryInterface.removeColumn(
      'sensorbins', // name of Source model
      'touchtagDevEui', // key we want to remove
    )
    queryInterface.removeColumn(
      'sensorbins', // name of Source model
      'trashbinId', // key we want to remove
    )
    return queryInterface.removeColumn(
      'processedevents', // name of Source model
      'trashbinId', // key we want to remove
    );
  }
};