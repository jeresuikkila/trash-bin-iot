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
    }/*,
    default_pitch: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    default_roll: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    //location: { type: Sequelize.GEOMETRY, defaultvalue: null }
    location: {
      type: Sequelize.STRING,
      defaultvalue: null
    }*/
  }, {});
  Touchtag.associate = function (models) {
    // touchtag.belongsTo(models.trashbin)
  };
  return Touchtag;
};