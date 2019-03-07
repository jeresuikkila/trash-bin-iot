// Backend api controller functions for sensor - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the sensors and sorts them in ascending order by id
router.get('/', async (req, res) => {
    try {
        const sensors = await models.sensor.findAll();
        res.status(200).send(sensors)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Finds one sensor according to the sensor id
router.get('/:id', async (req, res) => {
    try {
        const sensor = await models.sensor.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(sensor)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Posts new sensor, hopefully 
router.post('/', async (req, res) => {
    try {
        const sensor = await models.sensor.create(req.body);
        await models.sensor.findOne({
            where: {
                id: sensor.dataValues.id
            },
            include: [
                { model: models.trashbin, attributes: ['id'] },
            ],
        });
        res.status(200).send(sensor)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//updates wanted sensor according to the sensor id
router.put('/:id', async (req, res) => {
    try {
        const sensor = await models.sensor.findOne({
            attributes: ['id'],
            where: {
                id: req.params.id
            }
        });
        sensor.update(req.body);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Deletes the wanted sensor according to the sensor id
router.delete('/:id', async (req, res) => {
    try {
        const sensor = await models.sensor.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(sensor);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;		// is this needed?
