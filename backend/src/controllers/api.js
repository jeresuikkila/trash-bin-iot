var express = require('express');
var router = express.Router();
const models = require('./../models');
const moment = require('moment')

/*
event =
{
    "event_type": "opened"/"emptied"
    "event_time": Date.now()
    "sensorId": id
}
*/


router.post('*', async (req,res) => {
    try {
        const event = await models.event.create(req.body);
        await models.event.findOne({
            where: {
                id: event.dataValues.id
            },
            include: [
                { model: models.sensor, attributes: ['id'] },
            ],
        });
        res.status(200).send(event);
        console.log("event: ",event)
        const sensor = await models.sensor.findOne({
            where: {
                id: event.dataValues.locationId
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;