const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const event_ctlr = require('./controllers/event');
app.use('/events', event_ctlr);

const location_ctlr = require('./controllers/location');
app.use('/locations', location_ctlr);

const trashbin_ctrl = require('./controllers/trashbin');
app.use('/trashbins', trashbin_ctrl);

const sensor_ctrl = require('./controllers/sensor');
app.use('/sensors', sensor_ctrl);

// Routes
router.get('/', function(req, res) {
    res.json({ message: 'Hello World!' });
});

router.get('/location', (req, res) => {
    res.sendFile(__dirname + '/data/location.json')
});

router.get('/trashbin', (req, res) => {
    res.sendFile(__dirname + '/data/trashbin.json')
});

app.use('/', router)

module.exports = app;
