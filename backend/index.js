require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const listenerport = 3002;
const models = require('./models');
const dbstuff = require('./dbtofrontend')
const listener = require('./ingest/listen_seq')


const app = express();
const listenerApp = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
listenerApp.use(bodyParser.json())  // middleware to handle json request
listenerApp.use(bodyParser.urlencoded({ extended: true}))


dbstuff.sendData(models,app);
listener.listenTouchtags(models,listenerApp,app,dbstuff);

app.listen(port, () => console.log(`Listening on port ${port}`));
listenerApp.listen(listenerport, () => console.log(`Everynet event listener ready on port ${listenerport}!`))
