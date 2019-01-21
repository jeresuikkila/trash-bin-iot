// Creates a new processed event and adds it to the database
// Currently only trigger code 4 (movement stop event/Bin opened) is implemented

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

exports.createProcessedEvent = async (message, models, moment) => {
	const cooldown = 30;
	// Trigger code 4 stands for movement stop
	if (Number(message.decoded_payload.trigger_code) == 4 || Number(message.decoded_payload.trigger_code) == 3) {
		try {
			console.log("Event triggercode = 4||3");
			// Finds the sensorbin with deviceId
			const sensorbin = await models.sensorbin.findOne({
				attributes: ['trashbinId'],
				where: {
					touchtagDevEui: message.meta.device
				}
			});
			console.log("sensorbin[0]: ", sensorbin[0])
			console.log("TAGLOCATION: ",sensorbin.dataValues.taglocation);
			if (sensorbin.dataValues.taglocation == "lid") {
				//wait 60sec to give "priority" to bin emptied
				console.log("WAITING 60S");
				await sleep(6000);
				console.log("60S DONE");
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
			else if (sensorbin.dataValues.taglocation == "bottom") {
				//cant be emptied 5mins before/after
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
