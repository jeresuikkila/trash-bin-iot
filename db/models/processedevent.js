'use strict';
module.exports = (sequelize, DataTypes) => {
  const processedevent = sequelize.define('processedevent', {
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
    }
  }, {});
  processedevent.associate = function(models) {
    processedevent.belongsTo(models.trashbin)
  };
  return processedevent;
};