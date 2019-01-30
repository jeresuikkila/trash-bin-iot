// Executes the the wanted database queries for frontend
// Creates router as a module, loads middleware functions in it,
// defines some routes, and mounts the router module on the paths

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const models = require('./models');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Finds all the trashbins and augments them with the latest event data
router.get('/', async (req, res) => {
    try {
        const bins = await models.trashbin.findAll({
            attributes: ['id', 'bintype', 'owner', 'address'],
            raw: true
        });

        const pevents = await models.processedevent.findAll({ raw: true });

        bins.forEach(bin => {
            const myevents = pevents.filter( ev => ev.trashbinId == bin.id )

            if (myevents !== undefined && myevents.length !== 0) {
                function compare(a, b) { a.event_time - b.event_time }
                myevents.sort(compare).reverse();
                
                bin.latestEvent = myevents[0].event_time
                bin.eventType = myevents[0].event_type
            } else {
                bin.latestEvent = null
                bin.eventType = null
            }
            bin.status = "test status";
            
        })

        res.status(200).send(bins)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
});

// Find all processed events 
router.get('/pevents', async(req, res) => {
    try {
        const pevents = await models.processedevent.findAll({
            //
        });
        console.log(pevents);
        res.status(200).send(pevents)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
});

// Finds one trashbin with the wanted id
router.get('/:id', async (req, res) => {
    try {
        const bin = await models.trashbin.findOne({
            attributes: ['id', 'bintype', 'owner', 'address'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(bin);
    } catch (e) {
        res.status(500).send(e)
    }
});

// Finds all events from one trashbin
router.get('/:id/events', async (req, res) => {
    try {
        const sensorbins = await models.sensorbin.findAll({
            attributes: ['touchtagDevEui'],
            where: {
                trashbinId: req.params.id
            }
        });
        let allevents = [];
        for (let i = 0; i < sensorbins.length; i++) {
            const events = await models.event.findAll({
                attributes: ['event_time', 'trigger_code', 'packet_hash'],
                where: {
                    touchtagDevEui: sensorbins[i].touchtagDevEui
                }
            });
            allevents = [...allevents, ...events];
        }
        allevents.sort(function (a, b) {
            return a.event_time - b.event_time;
        });
        res.status(200).send(allevents);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Finds all processed events from one trashbin
router.get('/:id/pevents', async (req, res) => {
    try {
        const pevents = await models.processedevent.findAll({
            attributes: ['event_time', 'event_type'],
            where: {
                trashbinId: req.params.id
            }
        });
        pevents.sort(function (a, b) {
            return a.event_time - b.event_time;
        });
        res.status(200).send(pevents);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Finds all sensors from one trashbin
router.get('/:id/sensors', async(req, res) => {
    try {
        const sensors = await models.sensorbin.findAll({
            attributes: ['id', 'location', 'taglocation'],
            where: {
            trashbinId: req.params.id
          }
        });
        res.status(200).send(sensors);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
