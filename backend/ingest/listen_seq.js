// Script to listen api requests
// Run source. env to initialize enviromental variables

const express = require('express')  // server framework
const bodyParser = require('body-parser') // parses req.body to e.g JSON
const axios = require('axios')  // performs http requests
const Sequelize = require('sequelize')  // ORM
const models = require('../../db/models') // path to db models
const moment = require('moment')

const app = express()
const decoderUrl = process.env.DECODER_URL
const port = 3000

// TO DO: sequalize...
// new Sequelize('database', 'username', 'password', {

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.post('*', (req, res) => {

  const message = req.body // one event message from sensor
  console.log(message.params.payload);

  // Send payload to decoder
  axios.post(decoderUrl, {
    "payload": message.params.payload
  })
  .then(response => {
    message['decoded_payload'] = JSON.parse(response.data.body)
    console.log(message)

    // Connect to DB and add an event to database using sequelize
    sequelize.sync()
      .then(() => models.event.create({
        packet_hash: message.meta.packet_hash,
        payload: message.params.payload,
        original_message: message,
        event_time:  moment.unix(message.meta.time),
        temperature: message.decoded_payload.temperature,
        trigger_code: message.decoded_payload.trigger_code,
        trigger_counter: message.decoded_payload.trigger_counter,
        Touchtag_dev_eui: message.meta.device

      })).then(queryResponse => {
          const response = {
            "isBase64Encoded": false,
            "statusCode": 200,
            "body": JSON.stringify(queryResponse.rows)
          }

          console.log(queryResponse)
          res.send(response)

        }).catch(error => {
          console.log("ERROR", error);
          const response = {
            "isBase64Encoded": false,
            "statusCode": 500,
            "body": JSON.stringify(queryResponse.rows)
          }

          res.send(response)

        })

  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500)
  });

});

app.listen(port, () => console.log(`Everynet event listener ready on port ${port}!`))
