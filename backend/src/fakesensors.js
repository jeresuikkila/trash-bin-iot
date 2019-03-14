const models = require("./models")
const axios = require("axios")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

a = async() => {
    try {
        const sensors = await models.sensor.findAll({});
        console.log(sensors[0])
        while(1!=2){
            s = 0;
            console.log(s)
            await axios({
                method: 'post',
                url: 'localhost/api',
                port: 3000,
                data: {
                    "event_type":"opened",
                    "event_time": Date.now(),
                    "sensorId": sensors[s].dataValues.id
                }

            });
            await sleep(20000)
        }
    }
    catch(e) {
        console.log(e)
    }
}

a()