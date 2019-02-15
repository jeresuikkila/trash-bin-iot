// Backend api controller functions for location - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the locations and sorts them in ascending order by id
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

// Finds one location according to the location id
router.get('/:id', async (req, res) => {
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

// Posts new location, hopefully
router.post('/', async (req, res) => {
	try {
		const location = await models.location.create({
			id: req.body.id,
			address: req.body.address,
			lat: req.body.lat,
			lng: req.body.lng
        });
        
		console.log('Location with id ' + req.body.id + ' added');
		res.status(200).send(location);
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Deletes the wanted location according to the location id
router.delete('/:id', async (req, res) => {
	try {
		const location = await models.location.destroy({
			where: {
				id: req.params.id
			}
		});
		console.log('Location with id ' + req.params.id + 'deleted');
		res.status(200).send(location);
	} catch(e) {
	console.log(e);
	res.status(500).send(e);
}
});


module.exports = router;		// is this needed?
