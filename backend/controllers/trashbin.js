// Backend api controller functions for trashbin - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the trashbins and sorts them in ascending order by id
router.get('/', async (req, res) => {
	try {
		const trashbins = await models.trashbin.findAll({
			attributes: ['id', 'bintype', 'owner', 'size', 'latestEmptied'],
		});
		trashbins.sort(function (a, b) {
			return a.id - b.id;
		});
		res.status(200).send(trashbins)
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Finds one trashbin according to the trashbin id
router.get('/:id', async (req, res) => {
	try {
		const trashbin = await models.trashbin.findOne({
			attributes: ['id', 'bintype', 'owner', 'size', 'latestEmptied'],
			where: {
				id: req.params.id
			}
		});
		res.status(200).send(trashbin)
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Posts new trashbin, hopefully
router.post('/', async (req, res) => {
	try {
		const trashbin = await models.tashbin.create({
			id: req.body.id,
			bintype: req.body.bintype,
			owner: req.body.owner,
			size: req.body.size,
			latestEmptied: req.body.latestEmptied
		});
		console.log('Trashbin with id ' + req.body.id + ' added');
		res.status(200).send(trashbin);
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// Deletes the wanted trashbin according to the trashbin id
router.delete('/:id', async (req, res) => {
	try {
		const trashbin = await models.trashbin.destroy({
			where: {
				id: req.params.id
			}
		});
		console.log('Trashbin with id ' + req.params.id + ' deleted');
		res.status(200).send(trashbin);
	} catch(e) {
	console.log(e);
	res.status(500).send(e);
}
});


module.exports = router;		// is this needed?
