// Creates a new processed event and adds it to the database
// Currently only trigger code 3 & 4 (movement start/stop event/Bin opened) are implemented

// Sleeps / waits execution for certain time
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

exports.createProcessedEvent = async (message, models, moment) => {
	const cooldown = 30;
	// Trigger code 3 = movement start & 4 = movement stop
	if (Number(message.decoded_payload.trigger_code) == 4 || Number(message.decoded_payload.trigger_code) == 3) {
		try {
			console.log("Event triggercode = 3 || 4");
			// Finds the sensorbin with deviceId
			const sensorbin = await models.sensorbin.findOne({
				attributes: ['trashbinId', 'taglocation', 'default_pitch', 'default_roll'],
				where: {
					touchtagDevEui: message.meta.device
				}
			});
				// If touchtag is located at the lid, the event is "bin opened"
			if (sensorbin.dataValues.taglocation == "lid" && sensorbin.dataValues.default_pitch != null) {
				// Wait 60 sec to give "priority" to bin emptied
				console.log("WAITING 10S");
				await sleep(10000);
				console.log("10S DONE");
				var time = moment.unix(message.meta.time + cooldown).format();
				var time2 = moment.unix(message.meta.time - cooldown).format();
				console.log("time between ", time2, "  and  ", time);
				// Creates a new processedevent if it doesn't exist already
				// If another event exists between eventtime +/- cooldown finds it instead of creating a new one
				const event = await models.processedevent.findOrCreate({
					where: {
						trashbinId: sensorbin.dataValues.trashbinId,
						event_time: {
							"$between": [time2, time]
						}
					},
					defaults: {
						packet_hash: message.meta.packet_hash,
						event_type: "Bin opened",
						event_time: moment.unix(message.meta.time),
						trashbinId: sensorbin.dataValues.trashbinId
					}
				});
				// If event was not found it is now created
				if (event[0]._options.isNewRecord) {
					models.processedevent.findOne({
						where: {
							packet_hash: message.meta.packet_hash
						},
						include: [
							{ model: models.trashbin, attributes: ['id'] },
						],
					});
				}
				else {
					console.log("Didn't create event because cooldown not done.")
				}
			}
			// If touchtag is located at the bottom of the bin, event is "bin emptied"
			else if (sensorbin.dataValues.taglocation == "bottom" && sensorbin.dataValues.default_pitch != null) {
				// Cant be emptied 5 mins before/after
				var time = moment.unix(message.meta.time + 300).format();
				var time2 = moment.unix(message.meta.time - 300).format();
				const event = await models.processedevent.findOrCreate({
					where: {
						trashbinId: sensorbin.dataValues.trashbinId,
						event_time: {
							"$between": [time2, time]
						},
						event_type: "Bin emptied"
					},
					defaults: {
						packet_hash: message.meta.packet_hash,
						event_type: "Bin emptied",
						event_time: moment.unix(message.meta.time),
						trashbinId: sensorbin.dataValues.trashbinId
					}
				});
				if (event[0]._options.isNewRecord) {
					models.processedevent.findOne({
						where: {
							packet_hash: message.meta.packet_hash
						},
						include: [
							{ model: models.trashbin, attributes: ['id'] },
						],
					});
				}
				else {
					console.log("Didn't create event because cooldown not done.");
				}
			}
		} catch (e) {
			console.log("Error creating processed event: ", e)
		}
	}
	else {
		console.log("Nothing interesting happens")
	}
}
