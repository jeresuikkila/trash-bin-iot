// Sleeps/waits execution for a certain time
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Creates a new processed event (bin emptied/bin opened) and adds it to the database
// Priorities trash bin emptied - event over trash bin opened - event
exports.createProcessedEvent = async (message, models, moment) => {

	// Trigger code 4 stands for movement stop
	// Finds the bin where the touchtag is located
	const cooldown = 60;
	if (Number(message.decoded_payload.trigger_code) == 4) {
		try {
			console.log("Event triggercode = 4");
			const sensorbin = await models.sensorbin.findOne({
				attributes: ['trashbinId'],
				where: {
					touchtagDevEui: message.meta.device
				}
			});

			// If touchtag is located at the lid
			// wait 60 sec to give "priority" to bin emptied - event
			if (sensorbin.dataValues.location == 'lid') {
				await sleep(6000);
				var time = moment.unix(message.meta.time + cooldown).format();
				var time2 = moment.unix(message.meta.time - cooldown).format();
				console.log("time between ", time2, "  and  ", time);
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
			// If touchtag is located in the body we create a bin emptied - event
			// Cant be emptied 5 mins before/after event
			else if (sensorbin.dataValues.location == 'body') {
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

			console.log("Sensorbin: ", sensorbin.dataValues);

		} catch (e) {
			console.log("Error creating processed event: ", e)
		}
	}
	else {
		console.log("Nothing interesting happens")
	}
}
