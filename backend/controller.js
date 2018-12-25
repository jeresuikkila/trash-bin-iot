var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const models = require('./models');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    models.trashbin.findAll({
        attributes: ['id', 'bintype', 'owner', 'address']
    }).then(bins => {
        var arr = [];
        bins.forEach(bin => {
            bin.dataValues.latestEvent = "test event",
            bin.dataValues.status = "test status"
            //bin.dataValues.id = bin.dataValues.id.toString();
            /*app.get('/trashbins/'+bin.dataValues.id, (req, res) => {
                res.send({ express: bin});
            });*/
            arr.push(bin.dataValues);
        });
        res.status(200).send(arr);
    }).catch(err => {
        res.status(500).send("problem")
    });
});

router.get('/:id', function (req, res) {
    models.trashbin.findOne({
        attributes: ['id', 'bintype','owner','address'],
        where: {
            id: req.params.id
        }
    }).then(bin => {
            res.status(200).send(bin.dataValues)
        }).catch(err => {
            res.status(500).send("problem")
        });
});

router.get('/:id/events', function (req, res) {
    var arr = []
    models.sensorbin.findAll({
        attributes: ['touchtagDevEui'],
        where: {
            trashbinId: req.params.id
        }
    }).then(sensorbins => {
        
        for(let i = 0;i<sensorbins.length;i++) {
            models.event.findAll({
                attributes: ['event_time','trigger_code'],
                where: {
                    touchtagDevEui: sensorbins[i].dataValues.touchtagDevEui
                }
            }).then(events => {
                for(let j=0;j<events.length;j++) {
                    //console.log("test",events[j].dataValues)
                    arr.push(events[j].dataValues);
                }
                //console.log("ARR: ",arr)
            }).then(() => {
                console.log(arr);
                res.status(200).send(arr);
            });
        }
    }).catch(err => {
        res.status(500).send("problem")
    });
});


module.exports = router;