var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const models = require('./models');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const bins = await models.trashbin.findAll({
            attributes: ['id', 'bintype', 'owner', 'address']
        });
        bins.forEach(bin => {
            bin.dataValues.latestEvent = "test event",
                bin.dataValues.status = "test status"
        });
        res.status(200).send(bins)
    } catch (e) {
        res.status(500).send(e)
    }
});

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

router.get('/:id/events', async (req, res) => {
    try {
        const sensorbins = await models.sensorbin.findAll({
            attributes: ['touchtagDevEui'],
            where: {
                trashbinId: req.params.id
            }
        });
        console.log("touchtageui", sensorbins[0].touchtagDevEui);
        let allevents = [];
        for (let i = 0; i < sensorbins.length; i++) {
            const events = await models.event.findAll({
                attributes: ['event_time', 'trigger_code','packet_hash'],
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

router.get('/:id/pevents', async (req, res) => {
    try {
        const pevents = await models.processedevent.findAll({
            attributes: ['event_time','event_type'],
            where: {
                trashbinId: req.params.id
            }
        });
        res.status(200).send(pevents);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;