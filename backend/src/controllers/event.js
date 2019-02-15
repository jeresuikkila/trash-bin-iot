// Backend api controller functions for event - table
// PUT still missing...

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

// Posts new event, hopefully 
router.post('/', async (req, res) => {
	try {
		const event = await models.event.create({
			id: req.body.id,
			event_type: req.body.event_type,
			event_time: req.body.event_time
		});
		console.log('Event with id ' + req.body.id + ' added');
		res.status(200).send(event)
	} catch(e) {
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
	} catch(e) {
	console.log(e);
	res.status(500).send(e);
}
});


module.exports = router;	// is this needed?
