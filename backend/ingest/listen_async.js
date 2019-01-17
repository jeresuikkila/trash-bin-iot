const axios = require('axios')  // performs http requests
const moment = require('moment')

const decoderUrl = process.env.DECODER_URL

console.log(decoderUrl)

exports.listenTouchtags = (models, app, processedevent) => {
    app.post('*', async (req, res) => {
        //console.log(req);
        const message = req.body; // one event message from sensor
        console.log("MESSAGE TYPE: ",message.type)
        switch (message.type) {
            case 'uplink':
                handleUplink(message, models, processedevent);
            case 'downlink':
                handleDownlink(message, models);
            default:
                console.log("DEFAULT SWITCH")
        }
        res.sendStatus(200);

    });
}

handleDownlink = async (message, models) => {
    try {
        console.log("downlink: ",message);
        const sensbin = await models.sensorbin.findOne({
            where: {
                touchtagDevEui: message.meta.device
            }
        });
        sensbin.update({
            battery: message.params.hardware.power
        });
    } catch(e) {
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
            case 3:
                console.log("MOVEMENT START");
            case 4:
                console.log("MOVEMENT STOP");
            case 5:
                console.log("FREEFALL");
            case 8:
                console.log("DOUBLE CLICK")
            case 0:
                console.log("RESTART")
            case 9:
                console.log("LONG CLICK")
            case 11:
                console.log("TEMP MAX/MIN")
            case 6:
                console.log("ACTIVATION")
            default:
                console.log("TRIGGER_CODE: ",message.decoded_payload.trigger_code)
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