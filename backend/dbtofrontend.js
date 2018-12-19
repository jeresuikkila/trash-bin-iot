

exports.sendData = function (models, app) {
    models.trashbin.findAll({
        attributes: ['id', 'bintype', 'owner', 'address']
    }).then(bins => {
        var arr = [];
        bins.forEach(bin => {
            bin.dataValues.latestEvent = "test event",
            bin.dataValues.status = "test status"
            bin.dataValues.id = bin.dataValues.id.toString();
            app.get('/trashbins/'+trashbin.id, (req, res) => {
                res.send({ express: bin});
            });
            arr.push(bin.dataValues);
        });
        console.log(arr);
        app.get('/trashbins', (req, res) => {
            res.send({ express: arr });
        });
    });

    models.event.findAll({
        attributes: ['packet_hash', 'event-time', 'temperature', 'pitch', 'roll', 'touchtagDevEui']
    }).then(events => {
        var arr = [];
        events.forEach(event => {
            arr.push(bin.dataValues);
        });
        console.log(arr);
        app.get('/trashbins', (req, res) => {
            res.send({ express: arr });
        });
    });
}