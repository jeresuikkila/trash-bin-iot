require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const port = 3001;
const models = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));
const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });


    models.trashbin.findAll({
        attributes: ['id','bintype','owner','address']
    }).then(bins => {
        var arr=[];
        bins.forEach(bin =>{
            bin.dataValues.latestEvent = "test event",
            bin.dataValues.status = "test status"
            bin.dataValues.id = bin.dataValues.id.toString();
            arr.push(bin.dataValues);
        });
        console.log(arr);
        app.get('/trashbins', (req, res) => {
            res.send({ express: arr});
          });
    });

