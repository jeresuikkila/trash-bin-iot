'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensorbin = sequelize.define('sensorbin', {
    default_pitch: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    default_roll: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    /*location: { type: Sequelize.GEOMETRY, defaultvalue: null }*/
    location: {
      type: DataTypes.STRING,
      defaultvalue: null
    }
  }, {});
  sensorbin.associate = function(models) {
    sensorbin.belongsTo(models.touchtag);
    sensorbin.belongsTo(models.trashbin)
  };
  return sensorbin;
};