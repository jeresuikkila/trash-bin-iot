'use strict';
module.exports = (sequelize, DataTypes) => {
  const trashbin = sequelize.define('trashbin', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    bintype: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    owner: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {});
  trashbin.associate = function (models) {
    // associations can be defined here
  };
  return trashbin;
};