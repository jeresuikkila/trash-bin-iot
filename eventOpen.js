//Trashbin IoT 
//Trashbin Event Opened

/* Issues:
	-Running code at fixed intervals/ on demand:
		-db updates push request to execute code?
	-environment, infrastructure, repo?
		-make framework and connect parts together
*/

//some code that will fetch data from an event from a SQL database and get it into a format that is suitable for use here with logic
function fetchSensorFromDB(sensor_id) {
	//send request to DB, fetch 
	new sensor(sensor.id, sensor.lastEventTime);
	???
}

//search database and return last recorded event for a trashbin
function fetchLastEvent(trashbin){
	//send request to DB, fetch information on the last recorded event on trashbin
	???
}

function trashbin(upperSensor, lowerSensor, id);
function sensor(id, lastEventTime);

//gets current time - one minute
function timeClamp = {
	/* TODO:
		-make it work for real
	*/
	const d = new Date();
	if(d.getMinutes != 0) {
		new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes() - 1, d.getSeconds());
	} else {
		new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours() - 1, 59, d.getSeconds());		
	}
}


//logic that checks if a given trashbin state has been altered recently
function check(trashbin) {
	/* Objectives:
		-read database for new events
		-if/when new events, determine if any active trashbins have been opened
		 -> write new events into another database
		-be able to take different types of trashbins into account
			("classic" turnover bins vs. "molok" bins)
		-can be expanded to cover other types of events later
	*/
	
	/* Issues:
		-code is only fit for real-time use, can't be used to look retroactively to events
	*/
	

	function recordOpenEvent(database, trashbin) {
		//write new opening event to database
		//log time and trash bin in question
	
		openingEventsDatabase.newItem(trashbin, eopeningEvent);
	
	}

	function hasMovedRecently(sensor) {
		/* objective:
			come up with(good) algorithms, parameters that determine when sensor has moved
			use event type and time in conjunction to eachother to reduce false positives
		*/
		const last_Sensor_Event = fetchSensorFromDB(sensor_id);
		
		if(last_Sensor_Event.time >= ( timeClamp ) && last_Sensor_Event.type == movementStopEvent)
	
	]
	
	function hasNoRecentEvents {
		//check already recorded opening events and return true if no opening events has been logged in the past minute
		//purpose is to weed out duplicate events
		if((fetchLastEvent.time < timeClamp);
	}
	
	if(hasNoRecentEvents) {
		if(hasMovedRecently(trashbin.upperSensor) && !hasMovedRecently(trashbin.lowerSensor)) {
			recordOpenEvent(database, trashbin);
		}
	}
}