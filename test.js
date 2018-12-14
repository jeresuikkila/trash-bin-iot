const express = require('express');
const bodyParser = require('body-parser');
const models = require('./db/models/')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Sequelize = require('sequelize');

const sequelize = new Sequelize('trashbiniot', 'trashbiniot', 'futurice', {
  dialect: 'postgres',
  host: 'trash-bin-iot-test.celdux0k7g1r.eu-central-1.rds.amazonaws.com',
  port: 5432,
  define: {
    timestamps: false
  }
});



/*models.touchtag.findAll({
  where: {
    dev_eui: "70b3d54b1c0015f"
  }
}).then(a => {
  //models.event.touchtag = models.touchtag.belongsTo(models.event);
  sequelize.sync()
  .then(() => models.event.create({
    packet_hash: "aaaa",
    payload: "ooooo",
    original_message: "aoeu",
    event_time: new Date(),
    temperature: 1,
    trigger_code: "eeeeeee",
    trigger_counter: 2,
    pitch: 3,
    roll: 4,
    Touchtag_dev_eui: ""
  }))
  console.log("a=",a[0].dataValues)
});*/


/*sequelize.sync()
  .then(() => models.touchtag.create({
    dev_eui: "70b3d54b1c0015f",
    app_eui: "123",
    dev_addr: "123",
    nwkskey: "123",
    appskey: "123"
  }));*/

sequelize.sync()
  .then(() => models.event.create({
    packet_hash: "aaaa",
    payload: "ooooo",
    original_message: "aoeu",
    event_time: new Date(),
    temperature: 1,
    trigger_code: "eeeeeee",
    trigger_counter: 2,
    pitch: 3,
    roll: 4,
    touchtagDevEui: "70b3d54b1c0015f"
  }).then(() => {
    models.event.findOne({
      where: {
        packet_hash: "aaaa",
      },
      include: [
        { model: models.touchtag, attributes: ['dev_eui'] },
      ],
    })
  }
  ));