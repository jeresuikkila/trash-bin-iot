const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

// Routes
router.get('/', function(req, res) {
    res.json({ message: 'Hello World!' });
});

app.use('/', router)

app.listen(port, () => console.log(`Listening on port ${port}`))