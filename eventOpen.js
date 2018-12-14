//Trashbin IoT 
//Trashbin Event Opened

/* Objectives:
	-code logic to handle trashbin opening events
	-get data from database into usable form
	-process data and determine if an opening event has occured  
		++logic ok
		--build bridge to DB
	-send opening event into database
	-expand to cover other types of events
*/
/* Issues:
	-Running code at fixed intervals/ on demand:
		-db updates push request to execute code?
	-environment, infrastructure, repo?
		-make framework and connect parts together
*/
/* TODO:
	-convert pseudocode into live code
	-figure out how to fetch information from DB
	-comppartmentalize code into easier to manage chunks
	-test test test
*/

//----Sequelize----
/*pull info from database using sequelize
	tested:
	-connecting to database works
*/
const models = require('./models/')

const Sequelize = require('sequelize');
const sequelize = new Sequelize('trashbiniot', 'trashbiniot', 'futurice2', {
	dialect: 'postgres',
	host: 'trash-bin-iot-test.celdux0k7g1r.eu-central-1.rds.amazonaws.com',
	port: '5432'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



//----Logic----

//some code that will fetch data from an event from a SQL database and get it into a format that is suitable for use here with logic
function fetchSensorFromDB(sensor_id) {
	//send request to DB, fetch 
	
	sequelize.query("SELECT sensor_id, event FROM trashbiniot").then(something)

	
	new sensor(sensor.id, sensor.lastEventTime);
}

//search database and return last recorded event for a trashbin
function fetchLastEvent(trashbin){
	//send request to DB, fetch information on the last recorded event on trashbin

	sequelize.query("SELECT sensor_id, trigger_code, event_time FROM trashbiniot").then(something)
}

function trashbin(id, upperSensor, lowerSensor) {}
function sensor(id, lastEventTime) {}

//logic that checks if a given trashbin state has been altered recently
function check(trashbin) {
	/* Objectives:
		-read database for new events
		-if/when new events, determine if any active trashbins have been opened
		 -> write new events into database table
		-be able to take different types of trashbins into account
			("classic" turnover bins vs. "molok" bins)
		-can be expanded to cover other types of events later
	*/
	/* Issues:
		-code is only fit for real-time use, can't be used to look retroactively to events
	*/
	
	/*gets current time - one minute
		tested: works with rudimentary test cases
	*/
	function timeClamp() {
		var d = new Date();
		d.setMinutes(d.getMinutes() -1);
	}

	function recordOpenEvent(database, trashbin) {
		//write new opening event to database
		//log time and trash bin in question
	
		openingEventsDatabase.newItem(trashbin, openingEvent);
	
	}

	function hasMovedRecently(sensor) {
		/* objective:
			come up with(good) algorithms, parameters that determine when sensor has moved
			use event type and time in conjunction to eachother to reduce false positives
		*/
		const last_Sensor_Event = fetchSensorFromDB(sensor_id);
		
		if(last_Sensor_Event.time >= ( timeClamp ) && last_Sensor_Event.type == movementStopEvent) {
			true
		} else {
			false
		}
	
	}
	
	function hasNoRecentEvents() {
		//check already recorded opening events and return true if no opening events has been logged in the past minute
		//purpose is to weed out duplicate events
		if(fetchLastEvent.time < timeClamp);
	}
	
	//main logic behind open event
	if(hasNoRecentEvents) {
		if(hasMovedRecently(trashbin.upperSensor) && !hasMovedRecently(trashbin.lowerSensor)) {
			recordOpenEvent(database, trashbin);
		}
	}
}
