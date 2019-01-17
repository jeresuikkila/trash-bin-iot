// Decodes the new message from everynet and adds it to the event table
// Calls processedevent module to process the event and add it to the processedevent table

const axios = require('axios')  // performs http requests
const moment = require('moment')

const NSUrl = process.env.NS_URL
const decoderUrl = process.env.DECODER_URL

exports.listenTouchtags = (models, app, processedevent) => {
    app.post('*', async (req, res) => {
        //console.log(req);
        const message = req.body; // one event message from sensor
        console.log("MESSAGE TYPE: ", message.type)
        switch (message.type) {
            case "uplink":
                handleUplink(message, models, processedevent);
                res.send({
                    "meta": {
                        "network": message.meta.network,
                        "device": message.meta.device
                    },
                    "type": "status"
                });
                res.sendStatus(200);
                break;
            case "downlink":
                handleDownlink(message, models);
                res.sendStatus(200);
                break;
            case "downlink_request":
                handleDownlinkRequest(message,res);
                break;
            case "location":
                handleLocation(models,message);
                res.sendStatus(200);
                break;
            case "status":
                handleStatus(models,message);
                res.sendStatus(200);
                break;
            default:
                console.log("DEFAULT SWITCH");
                res.sendStatus(200);
                break;
        }
    });
}

handleStatus = async (models,message) => {
    try {
        const sensbin = await models.sensorbin.findOne({
            where: {
                touchtagDevEui: message.meta.device
            }
        });
        console.log("BATTERYTEST: ",message.params.battery);
        sensbin.update({
            battery: message.params.battery
        });
    } catch (e) {
        console.log(e);
    }
}

handleLocation = async (models,message) => {
    try {
        const sensbin = await models.sensorbin.findOne({
            where: {
                touchtagDevEui: message.meta.device
            }
        });
        console.log("TEST: ",message.params.solutions[0])
        sensbin.update({
            location: message.params.solutions[0].lat + ","+message.params.solutions[0].lng
        });
    } catch (e) {
        console.log(e);
    }
}

handleDownlinkRequest = (message, res) => {
    res.status(200).send({
        "meta": {
            "application": message.meta.application,
            "device": message.meta.device,
            "device_addr": message.meta.device_addr,
            "gateway": message.meta.gateway,
            "network": message.meta.network,
            "packet_hash": message.meta.packet_hash,
            "packet_id": message.meta.packet_id,
            "time": message.meta.time
        },
        "params": {
            "confirmed":false,
            "counter_down": message.params.counter_down,
            "payload": "a0f1hh",
            "port": 80
        },
        "type": "downlink_response"
    });
}

handleDownlink = async (message, models) => {
    try {
        console.log("heiluttelee käsiä")
    } catch (e) {
        console.log(e);
    }
}

handleUplink = async (message, models, processedevent) => {
    try {
        console.log("payload: ", message.params.payload);
        // Send payload to decoder
        const response = await axios.post(decoderUrl, {
            "payload": message.params.payload
        });
        message['decoded_payload'] = JSON.parse(response.data.body)
        //console.log(message.decoded_payload)
        //creates new event in database or finds one if it already exists
        switch (message.decoded_payload.trigger_code) {
            case 2:
                console.log("SINGLECLICK");
                break;
            case 3:
                console.log("MOVEMENT START");
                break;
            case 4:
                console.log("MOVEMENT STOP");
                break;
            case 5:
                console.log("FREEFALL");
                break;
            case 8:
                console.log("DOUBLE CLICK");
                break;
            case 0:
                console.log("RESTART");
                break;
            case 9:
                console.log("LONG CLICK");
                break;
            case 11:
                console.log("TEMP MAX/MIN");
                break;
            case 6:
                console.log("ACTIVATION");
                break;
            default:
                console.log("TRIGGER_CODE: ", message.decoded_payload.trigger_code);
                break;
        }
        const resp = await models.event.findOrCreate({
            where: {
                packet_hash: message.meta.packet_hash
            },
            defaults: {
                packet_hash: message.meta.packet_hash,
                payload: message.params.payload,
                original_message: message,
                event_time: moment.unix(message.meta.time),
                temperature: message.decoded_payload.temperature,
                trigger_code: message.decoded_payload.trigger_code,
                trigger_counter: message.decoded_payload.trigger_counter,
                pitch: message.decoded_payload.pitch,
                roll: message.decoded_payload.roll,
                touchtagDevEui: message.meta.device
            }
        });
        console.log('Is new event? ', resp[0]._options.isNewRecord);
        //adds foreign key+stuff if new event
        if (resp[0]._options.isNewRecord) {
            await models.event.findOne({
                where: {
                    packet_hash: message.meta.packet_hash
                },
                include: [
                    { model: models.touchtag, attributes: ['dev_eui'] },
                ],
            });
            processedevent.createProcessedEvent(message, models, moment);
            if (message.decoded_payload.trigger_code == 0) {
                const sensbin = await models.sensorbin.findOne({
                    where: {
                        touchtagDevEui: message.meta.device
                    }
                });
                console.log("aoe: ", sensbin);
                sensbin.update({
                    default_pitch: message.decoded_payload.pitch,
                    default_roll: message.decoded_payload.roll
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}
