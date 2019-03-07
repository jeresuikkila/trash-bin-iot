const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const location  = require('./controllers/location.js')
const trashbin = require('./controllers/trashbin.js')
const sensor = require('./controllers/sensor.js')
const event = require('./controllers/event.js')
const api = require('./controllers/api.js')

// Routes
app.use('/location', location)
app.use('/trashbin', trashbin)
app.use('/sensor', sensor)
app.use('/event', event)
app.use('/api', api)

module.exports = app;
