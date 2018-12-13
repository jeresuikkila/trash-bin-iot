'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('touchtags', [{
      dev_eui: "70b3d54b1c0015f8",
      app_eui: "22c5b00112f34358",
      dev_addr: "16c4d0e7",
      nwkskey: "ad48d6bf512756bf704971d1c5e32130",
      appskey: "882c0b56327a32a1e3d3c78c4a1efb57"
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('touchtags', null, {});
  }
};
