'use strict';
module.exports = (sequelize, DataTypes) => {
  const processedevent = sequelize.define('processedevent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  processedevent.associate = function(models) {
    processedevent.belongsTo(models.trashbin)
  };
  return processedevent;
};