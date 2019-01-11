const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const axios = require('axios')
const decoderUrl = process.env.DECODER_URL

const { Client, Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('*', (req, res) => {
	const message = req.body

	console.log(message.params.payload);

	axios.post(decoderUrl, {
        "payload": message.params.payload
    })
    .then(response => {
        message['decoded_payload'] = JSON.parse(response.data.body)
        console.log(message);

        // TODO: send to database
        let client;
        pool.connect().then(c => {
            client = c;
            return client.query("SELECT NOW()");
        }).then(queryResponse => {
            client.release();
            const response =  {
                "isBase64Encoded": false,
                "statusCode": 200,
                "body": JSON.stringify(queryResponse.rows)
            }
            res.send(response)
        }).catch(error => {
            console.log("ERROR", error);
            const response =  {
                "isBase64Encoded": false,
                "statusCode": 500,
                "body": JSON.stringify(error)
            }

            res.send(response)
        });

    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500)
    });



});

app.listen(port, () => console.log(`Everynet event listener ready on port ${port}!`))
