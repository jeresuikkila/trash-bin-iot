// Backend api controller functions for event - table

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the events and sorts them in ascending order by event time
router.get('/', async (req, res) => {
	try {
		const events = await models.event.findAll({
			attributes: ['id', 'event_type', 'event_time'],
		});
		events.sort(function (a, b) {
			return a.event_time - b.event_time;
		});
		res.status(200).send(events)
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Finds one location according to the event id
router.get('/:id', async (req, res) => {
	try {
		const event = await models.event.findOne({
			attributes: ['id','event_type','event_time'],
			where: {
				id: req.params.id
			}
		});
		res.status(200).send(event)
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Posts new event
router.post('/', async (req, res) => {
	try {
		const event = models.event.create({
			id: req.body.id,
			event_type: req.body.event_type,
			event_time: req.body.event_time
		});
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
})
