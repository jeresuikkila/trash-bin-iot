// Handles frontend 
// Enables cors and controller script in '/trashbins' page

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
var controller = require('./controller')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/trashbins', controller);

module.exports = app;
