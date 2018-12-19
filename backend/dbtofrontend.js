

exports.sendData = function (models, app) {
    models.trashbin.findAll({
        attributes: ['id', 'bintype', 'owner', 'address']
    }).then(bins => {
        var arr = [];
        bins.forEach(bin => {
            bin.dataValues.latestEvent = "test event",
            bin.dataValues.status = "test status"
            bin.dataValues.id = bin.dataValues.id.toString();
            app.get('/trashbins/'+bin.dataValues.id, (req, res) => {
                res.send({ express: bin});
            });
            arr.push(bin.dataValues);
        });
        //console.log(arr);
        app.get('/trashbins', (req, res) => {
            res.send({ express: arr });
        });
    });

    models.trashbin.findAll({
        attributes: ['id']
    }).then(bins => {
        bins.forEach(bin => {
            models.sensorbin.findAll({
                attributes: ['touchtagDevEui'],
                where: {
                    trashbinId: bin.dataValues.id
                }
            }).then(sensorbins => {
                console.log("sensorbins: ",sensorbins.length);
                for(let i=0;i<sensorbins.length;i++) {
                    console.log("sensorbindata",sensorbins[i].dataValues)
                    models.event.findAll({
                        attributes: ['event_time', 'trigger_code'],
                        where: {
                            touchtagDevEui: sensorbins[i].dataValues.touchtagDevEui
                        }
                    }).then(events => {
                        console.log("events: ",events.length)
                        var arr = [];
                        for(let j=0;j<events.length;j++) {
                            arr.push(events[j].dataValues)
                        };
                        console.log(arr)
                        app.get('/trashbins/'+bin.dataValues.id+'/events', (req, res) => {
                            res.send({ express: arr });
                        });
                    })
            }
            })
        });
});
}