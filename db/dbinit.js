
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Sequelize = require('sequelize');

const sequelize = new Sequelize('trashbiniot', 'trashbiniot', 'futurice', {
    dialect: 'postgres',
    host: 'trash-bin-iot-test.celdux0k7g1r.eu-central-1.rds.amazonaws.com',
    port: 5432,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const touchtag = sequelize.define('public.touchtag', {
    dev_eui: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    app_eui: { type: Sequelize.STRING, defaultValue: null },
    dev_addr: { type: Sequelize.STRING, allowNull: false },
    nwkskey: { type: Sequelize.STRING, defaultValue: null },
    appskey: { type: Sequelize.STRING, defaultValue: null }
});

const event = sequelize.define('public.event', {
    packet_hash: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    payload: { type: Sequelize.STRING, allowNull: false },
    original_message: { type: Sequelize.JSON, allowNull: false },
    event_time: { type: Sequelize.DATE, allowNull: false },
    temperature: { type: Sequelize.INTEGER, defaultValue: null },
    trigger_code: { type: Sequelize.STRING, defaultValue: null },
    trigger_counter: Sequelize.INTEGER,
    pitch: { type: Sequelize.INTEGER, defaultValue: null },
    roll: { type: Sequelize.INTEGER, defaultValue: null }
});
event.belongsTo(touchtag)

const trashbin = sequelize.define('public.trashbin',{
    trashbin_id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    bintype: { type: Sequelize.STRING, defaultValue: null },
    owner: { type: Sequelize.STRING, defaultValue: null },
    address: { type: Sequelize.STRING, defaultValue: null },
});

const sensor_bin = sequelize.define('public.sensor_bin', {
    default_pitch: { type: Sequelize.INTEGER, defaultValue: null },
    default_roll: { type: Sequelize.INTEGER, defaultValue: null },
    /*location: { type: Sequelize.GEOMETRY, defaultvalue: null }*/
    location: { type: Sequelize.STRING, defaultvalue: null }
});
sensor_bin.belongsTo(touchtag);
sensor_bin.belongsTo(trashbin);

const processedEvent = sequelize.define('processedEvent', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    event_type: {type: Sequelize.STRING, allowNull:false},
    event_time: {type: Sequelize.DATE, allowNull: false},
  });
  processedEvent.belongsTo(trashbin)

  sequelize.sync()



