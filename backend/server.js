// Server script to listen Everynet server and handle the database queries

require('dotenv').config({ path: '../.env' });

const port = process.env.APIPORT | 3001;
const listenerport = process.env.LISTENERPORT | 3002;
const models = require('./models');
const listener = require('./ingest/listener')
const processedevent = require('./ingest/createprocessedevent')

const app = require('./app');
const listenerApp = require('./listenerapp');

listener.listenTouchtags(models, listenerApp, processedevent);

app.listen(port, () => console.log(`Listening on port ${port}`));
listenerApp.listen(listenerport, () => console.log(`Everynet event listener ready on port ${listenerport}!`))
