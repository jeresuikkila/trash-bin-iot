// Backend api controller functions for location - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the locations and sorts them in ascending order by id
router.get('/', async (req, res) => {
    try {
        const locations = await models.location.findAll();
        locations.sort(function (a, b) {
            return a.id - b.id;
        });
        res.status(200).send(locations)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/vandata', async (req, res) => {
    try {
        const locations = await models.location.findAll();
        locations.sort(function (a, b) {
            return a.id - b.id;
        });
        await Promise.all(locations.map(async (location) => {
            const trashbins = await models.trashbin.findAll({
                where: {
                    locationId: location.id
                }
            });
            location.dataValues.trashbins = trashbins
            location.dataValues.customer = trashbins[0].dataValues.owner
        }));
        console.log(locations[0].dataValues)
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
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(location)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//finds all trashbins for one location
router.get('/:id/trashbins', async (req,res) => {
    try {
        const trashbins = await models.trashbin.findAll({
            where: {
                locationId: req.params.id
            }
        });
        res.status(200).send(trashbins);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Posts new location, hopefully
router.post('/', async (req, res) => {
    try {
        const location = await models.location.create(req.body);
        res.status(200).send(location);
    } catch (e) {
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
        res.status(200).send(location);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//updates wanted location according to the location id
router.put('/:id', async (req, res) => {
    try {
        const location = await models.location.findOne({
            attributes: ['id'],
            where: {
                id: req.params.id
            }
        });
        location.update(req.body);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;		// is this needed? yes very much
