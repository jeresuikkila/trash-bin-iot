'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensorbin = sequelize.define('sensorbin', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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
    },
    taglocation: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {});
  sensorbin.associate = function(models) {
    sensorbin.belongsTo(models.touchtag);
    sensorbin.belongsTo(models.trashbin)
  };
  return sensorbin;
};