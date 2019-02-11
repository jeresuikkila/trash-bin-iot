// Executes the the wanted database queries for frontend
// Creates router as a module, loads middleware functions in it,
// defines some routes, and mounts the router module on the paths

var express = require('express');
var router = express.Router();
const models = require('./models');


// Finds all the trashbins and augments them with the latest event data
router.get('/', async (req, res) => {
	try {
		const locations = await models.location.findAll({
			attributes: ['id', 'address', 'lat', 'lng'],
		});
		locations.sort(function (a, b) {
			return a.id - b.id;
		});
		res.status(200).send(locations)
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

router.get('/:id', async (req,res) => {
	try {
		const location = await models.location.findOne({
			attributes: ['id','address','lat','lng'],
			where: {
				id: req.params.id
			}
		});
		res.status(200).send(location)
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

router.post('/', async (req,res) => {
	try {
		const location = models.location.create({
			id: req.body.id,
			address: req.body.address,
			lat: req.body.lat,
			lng: req.body.lng
		});
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
})