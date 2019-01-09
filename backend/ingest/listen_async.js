const axios = require('axios')  // performs http requests
const moment = require('moment')

const decoderUrl = process.env.DECODER_URL

console.log(decoderUrl)

exports.listenTouchtags = (models, app, processedevent) => {
    app.post('*', async (req, res) => {
        res.sendStatus(200);
        try {
            //console.log(req);
            const message = req.body; // one event message from sensor
            console.log("payload: ",message.params.payload);
            // Send payload to decoder
            const response = await axios.post(decoderUrl, {
                "payload": message.params.payload
            });
            message['decoded_payload'] = JSON.parse(response.data.body)
            //creates new event in database or finds one if it already exists
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
            //adds foreign key if new event
            if (resp[0]._options.isNewRecord) {
                await models.event.findOne({
                    where: {
                        packet_hash: message.meta.packet_hash
                    },
                    include: [
                        { model: models.touchtag, attributes: ['dev_eui'] },
                    ],
                });
                //res.status(200).send("added to database.");
                processedevent.createProcessedEvent(message,models,moment);
            }
            else {
                //res.status(200).send("already in database.");
            }
        } catch (e) {
            console.log(e);
            //res.status(500).send(e);
        }
    });
}