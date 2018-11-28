//Trashbin IoT 
//Trashbin Event Opened

/* Issues:
	-How to connect to database
	-How to read & write in DB
	-Sending sql commands
	-Running code at fixed intervals/ on demand:
		-db updates push request to execute code?
	-environment, infrastructure, repo?
		-make framework and connect parts together
*/

function trashbin(upperSensor, lowerSensor, id);
function sensor(id, status);


function check(trashbin) {
	/* objectives:
		read database for new events
		if/when new events, determine if any active trashbins have been opened
		 -> write new events into another database
		be able to take different types of trashbins into account
			("classic" turnover bins vs. "molok" bins)
		note,
		 can be expanded to cover other types of events later
	*/

	function recordOpenEvent(database, trashbin) {
		//write new opening event to database
		//log time and trash bin in question
	
		openingEventsDatabase.newItem(trashbin, eopeningEvent)
	
	}

	function hasMovedRecently(sensor) {
		/* objective:
			come up with(good) algorithms, parameters that determine when sensor has moved
		*/
		if(database.sensor.lastEvent.time >= ( currentTime - oneMinute )) {
			return true
		} else {
			return false
		}
	
	]
	
	if(hasMoved(trashbin.upperSensor) && !hasMoved(trashbin.lowerSensor)) {
		recordOpenEvent(database, trashbin);
	}

}