# trash-bin-iot
PoC project by Aalto students, HSY and Futurice





# adding new trashbin with tags
get touchtags/trashbins/sensorbins files from googledrive backend\'db config/seeds'\seeders and save to /backend/seeders
add tag details to touchtags seeder file, trashbin details to trashbins seeder file and sensorbin details to createsensorbins and save changes to drive. (this doesn't really do anything just backup incase database gets wiped and need to create from scratch)
install sequelize-cli "npm i sequelize-cli -g"
you can add them to database by connecting to database and writing raw queries to add them or sequelize seeder files.

RAW QUERY EXAMPLE
insert into touchtags (dev_eui,app_eui,dev_addr,nwkskey,appskey) values ('tag1','test','test','test','test');

SEEDER FILE EXAMPLE
make file tempseeder.js
tempseeder.js example for touchtags
/*
'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('touchtags', [{
            dev_eui: "tag1",
            app_eui: "test",
            dev_addr: "test",
            nwkskey: "test",
            appskey: "test"                
        },{
            dev_eui: "tag2",
            app_eui: "test",
            dev_addr: "test",
            nwkskey: "test",
            appskey: "test"                
        },], {});
    },
    down: (queryInterface, Sequelize) => {
        return null;
    }
};
*/
run the seeder with "sequelize db:seed --seed=<path to>/tempseeder.js"
tempseeder.js example for trashbins
/*
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('trashbins', [{
        id: 999, 
        bintype: 'test',
        owner: 'test',
        address: 'test'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return null;
  }
};
*/
run the seeder with "sequelize db:seed --seed=<path to>/tempseeder.js"

ADDING SENSORBIN
add to file createsensorbins.js lines:
/*
models.sensorbin.findOrCreate({
  where: {
    id: 4   //must be unique
  },
  defaults: {
    id: 4,    //same as previous
    taglocation: "lid",
    trashbinId: 3,    //id of the trashbin
    touchtagDevEui: "70b3d54b1c001738"   //deveui of the tag
  }
}).then(() => {
  models.sensorbin.findOne({
    where: {
      id: "4"   //same as previous
    },
    include: [
      { model: models.trashbin, attributes: ['id'] },
      { model: models.touchtag, attributes: ['dev_eui'] },
    ]
  })
});
*/
and run the file with "node createsensorbins.js"
finally add touchtag to right filter in ns.eu.everynet.io so NS sends data from that tag AS.