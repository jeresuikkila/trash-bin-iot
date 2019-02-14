// Backend api controller functions for sensor - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the sensors and sorts them in ascending order by id
router.get('/', async (req, res) => {
	try {
		const sensors = await models.sensor.findAll({
			attributes: ['id', 'default_pitch', 'default_roll', 'taglocation', 'battery', 'lat', 'lng'],
		});
		sensors.sort(function (a, b) {
			return a.id - b.id;
		});
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
			attributes: ['id', 'default_pitch', 'default_roll', 'taglocation', 'battery', 'lat', 'lng'],
			where: {
				id: req.params.id
			}
		});
		res.status(200).send(sensor)
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Posts new sensor, hopefully
router.post('/', async (req, res) => {
	try {
		const sensor = await models.sensor.create({
			id: req.body.id,
			default_pitch: req.body.default_pitch,
      default_roll: req.body.default_roll,
      taglocation: req.body.taglocation,
      battery: req.body.battery,
      lat: req.body.lat,
      lng: req.body.lng
		});
		console.log('Sensor with id ' + req.body.id + ' added');
		res.status(200).send(sensor);
	} catch(e) {
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
		console.log('Sensor with id ' + req.params.id + 'deleted');
		res.status(200).send(sensor);
	} catch(e) {
	console.log(e);
	res.status(500).send(e);
}
});


module.exports = router;		// is this needed?
