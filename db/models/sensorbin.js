'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensorbin = sequelize.define('sensorbin', {
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
    }
  }, {});
  sensorbin.associate = function(models) {
    sensorbin.belongsTo(models.touchtag);
    sensorbin.belongsTo(models.trashbin)
  };
  return sensorbin;
};