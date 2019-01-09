exports.createProcessedEvent = async (message, models, moment) => {
	console.log("creaeprocessedevent started");

	const cooldown = 60;
	// trigger code 4 stands for movement stop
	if (Number(message.decoded_payload.trigger_code) == 4) {
		try {
			console.log("event triggercode = 4");
			var time = moment.unix(message.meta.time + cooldown).format();
			var time2 = moment.unix(message.meta.time - cooldown).format();
			console.log("time between ", time2, "  and  ", time)
			const sensorbin = await models.sensorbin.findOne({
				attributes: ['trashbinId'],
				where: {
					touchtagDevEui: message.meta.device
				}
			});
			console.log("sensorbin: ", sensorbin.dataValues);

			const event = await models.processedevent.findOrCreate({
				where: {
					trashbinId: sensorbin.dataValues.trashbinId,
					event_time: {
						"$between": [time2, time]  //if another event between eventtime+cooldown and eventtime-cooldown finds it instead creating new one
					}
				},
				defaults: {
					packet_hash: message.meta.packet_hash,
					event_type: "Bin opened",
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
				console.log("didn't create event because cooldown not done.")
			}
		} catch (e) {
			console.log("error creating processed event: ", e)
		}
	}
	else {
		console.log("nothing interesting happens")
	}
}
