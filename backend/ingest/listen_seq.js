// Script to listen api requests
// Run source. env to initialize enviromental variables

require('dotenv').config({ path: '../../.env' });
const express = require('express')  // server framework
const bodyParser = require('body-parser') // parses req.body to e.g JSON
const axios = require('axios')  // performs http requests
const Sequelize = require('sequelize')  // ORM
const models = require('../models') // path to db models
const moment = require('moment')

const app = express()
const decoderUrl = process.env.DECODER_URL
const port = 3000
console.log(decoderUrl)

// TO DO: sequalize...
// new Sequelize('database', 'username', 'password', {

app.use(bodyParser.json())  // middleware to handle json request
app.use(bodyParser.urlencoded({ extended: true}))

app.post('*', (req, res) => {

  const message = req.body // one event message from sensor
  console.log(message.params.payload);
  
  // Send payload to decoder
  axios.post(decoderUrl, {
    "payload": message.params.payload
  })
  .try(response => {
    message['decoded_payload'] = JSON.parse(response.data.body)
    console.log(message).then(queryResponse => {
      const response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "body": queryResponse.get()
      }

      res.send(response)

    }).catch(error => {
      console.log("ERROR", error);
      const response = {
        "isBase64Encoded": false,
        "statusCode": 500,
        "body": queryResponse.get()
      }

      res.send(response)

    });

  // Add an event to database with touchtag_id as foreign key
    models.event.create({
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
    }).then(() => {
      models.event.findOne({
        where:{
          packet_hash: message.meta.packet_hash
        },
        include:[
          { model: models.touchtag, attributes:['dev_eui'] },
        ],
      });

  });

  })

});

app.listen(port, () => console.log(`Everynet event listener ready on port ${port}!`))
