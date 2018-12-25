// Script to listen api requests
// Run source. env to initialize enviromental variables

const axios = require('axios')  // performs http requests
const moment = require('moment')

const decoderUrl = process.env.DECODER_URL

console.log(decoderUrl)



exports.listenTouchtags = function (models, app,processedevent) {
  app.post('*', (req, res) => {

    const message = req.body // one event message from sensor
    console.log(message.params.payload);
    // Send payload to decoder
    axios.post(decoderUrl, {
      "payload": message.params.payload
    })
    .then(response => {
      message['decoded_payload'] = JSON.parse(response.data.body)
      console.log("1")

    // Add an event to database with touchtag_id as foreign key
      models.event.findOrCreate({
        where: {
          packet_hash: message.meta.packet_hash
        },
        defaults: {
          packet_hash: message.meta.packet_hash,
          payload: message.params.payload,
        original_message: message,
        event_time:  moment.unix(message.meta.time),
        temperature: message.decoded_payload.temperature,
        trigger_code: message.decoded_payload.trigger_code,
        trigger_counter: message.decoded_payload.trigger_counter,
        pitch: message.decoded_payload.pitch,
        roll: message.decoded_payload.roll,
        touchtagDevEui: message.meta.device
        }
      }).then(() => {
        models.event.findOne({
          where:{
            packet_hash: message.meta.packet_hash
          },
          include:[
            { model: models.touchtag, attributes:['dev_eui'] },
          ],
        }).then(queryResponse => {
            console.log("2")
            const response = {
              "isBase64Encoded": false,
              "statusCode": 200,
              "body": queryResponse.get()
            }
            processedevent.createProcessedEvent(message,models,moment);
            res.send(response)
          }).catch(error => {
            console.log("ERROR", error);
            const response = {
              "isBase64Encoded": false,
              "statusCode": 500,
              "body": "queryResponse.get()"
            }
            res.send(response)
          })})}).catch(error => {
                  console.log("3",error);
                  res.sendStatus(500)
    });
  });
}


