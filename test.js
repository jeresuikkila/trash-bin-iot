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

sequelize.sync()
 .then(() => models.touchtag.create({
  dev_eui: "70b3d54b1c0015f",
  app_eui: "123",
  dev_addr: "123",
  nwkskey: "123",
  appskey: "123"
 }))
 .then(trash => {
   console.log(trash.toJSON());
 });