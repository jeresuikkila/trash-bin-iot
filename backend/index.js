require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const port = 3001;
const models = require('../db/models')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    
