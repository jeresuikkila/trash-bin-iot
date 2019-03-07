// Backend api controller functions for trashbin - table
// PUT still missing...

var express = require('express');
var router = express.Router();
const models = require('./../models');

// Finds all the trashbins and sorts them in ascending order by id
router.get('/', async (req, res) => {
    try {
        const trashbins = await models.trashbin.findAll();
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
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(trashbin)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Posts new trashbin, hopefully 
router.post('/', async (req, res) => {
    try {
        const trashbin = await models.trashbin.create(req.body);
        await models.trashbin.findOne({
            where: {
                id: trashbin.id
            },
            include: [
                { model: models.location, attributes: ['id'] },
            ],
        });
        res.status(200).send(trashbin)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//updates wanted trashbin according to the trashbin id
router.put('/:id', async (req, res) => {
    try {
        const trashbin = await models.trashbin.findOne({
            attributes: ['id'],
            where: {
                id: req.params.id
            }
        });
        trashbin.update(req.body);
    } catch (e) {
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
        res.status(200).send(trashbin);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;		// is this needed?
