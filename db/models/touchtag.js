'use strict';
module.exports = (sequelize, DataTypes) => {
  const Touchtag = sequelize.define('touchtag', {
    dev_eui: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    app_eui: {
      type: DataTypes.STRING, 
      defaultValue: null
    },
    dev_addr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nwkskey: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    appskey: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {});
  Touchtag.associate = function (models) {
    // associations can be defined here
  };
  return Touchtag;
};