'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    packet_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    payload: {
      type: DataTypes.STRING,
      allowNull: false
    },
    original_message: {
      type: DataTypes.JSON,
      allowNull: false
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    temperature: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    trigger_code: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    trigger_counter: DataTypes.INTEGER,
    pitch: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    roll: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {});
  event.associate = models => {
    event.belongsTo(models.touchtag)
  };
  return event;
};