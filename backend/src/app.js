const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
