const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var locationcontroller = require('./controllers/location');
app.use('/test', locationcontroller);

const port = 3001;

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


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
