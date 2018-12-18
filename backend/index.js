require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const port = 3001;
const models = require('./models');
const dbstuff = require('./dbtofrontend')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));
// const db = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     });


dbstuff.sendData(models,app);