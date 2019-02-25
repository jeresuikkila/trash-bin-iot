// Backend api controller functions for event - table

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the events and sorts them in ascending order by event time
router.get('/', async (req, res) => {
    try {
        const events = await models.event.findAll();
        events.sort(function (a, b) {
            return a.event_time - b.event_time;
        });
        const lol = 'moi';
        res.status(200).send(lol)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Finds one event according to the event id
router.get('/:id', async (req, res) => {
    try {
        const event = await models.event.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(event)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Posts new event, hopefully
router.post('/', async (req, res) => {
    try {
        const event = await models.event.create(req.body);
        await models.event.findOne({
            where: {
                id: event.dataValues.id
            },
            include: [
                { model: models.sensor, attributes: ['sensorId'] },
            ],
        });
        res.status(200).send(event)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//updates wanted event according to the event id
router.put('/:id', async (req, res) => {
    try {
        const event = await models.event.findOne({
            attributes: ['id'],
            where: {
                id: req.params.id
            }
        });
        event.update(req.body);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Deletes the wanted event according to the event id
router.delete('/:id', async (req, res) => {
    try {
        const event = await models.event.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log('Event with id ' + req.params.id + 'deleted');
        res.status(200).send(event);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;	// is this needed?
