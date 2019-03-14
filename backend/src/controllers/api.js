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
        const sensor = await models.sensor.findOne({
            where: {
                id: event.dataValues.sensorId
            }
        });
        const trashbin = await models.trashbin.findOne({
            where:  {
                id: sensor.dataValues.trashbinId
            }
        });
        if(trashbin.dataValues.fillStatus != null && event.dataValues.event_type == "opened") {
            trashbin.update({
                fillStatus:  Math.min(100, trashbin.dataValues.fillStatus + 1)
            });
        }
        else {
            trashbin.update({
                fillStatus: 0
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;