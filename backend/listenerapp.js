// OPTIONS method is used to describe the communication options for the target resource.
// Asterisk (*) refers to the entire server.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.options("*", function(req, res, next){
    console.log("options?")
    res.sendStatus(200);
  });

module.exports = app;
