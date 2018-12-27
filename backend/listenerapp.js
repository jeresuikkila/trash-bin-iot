const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());  // middleware to handle json request
app.use(bodyParser.urlencoded({ extended: true}));

app.options("*", function(req, res, next){
    console.log("options?")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });

module.exports = app;