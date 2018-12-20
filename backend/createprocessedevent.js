exports.createProcessedEvent = function (message, models) {
	const lastEventTime = Number( models.processedevent.max('event_time').then( max => {}) );
	lastEventTime = lastEventTime || 0; //returns 0 if lastEventTime == falsey
	const cooldown = 60;
	console.log("creaeprocessedevent started");
		
	// trigger code 4 stands for movement stop
	if (Number(message.decoded_payload.trigger_code) == 4 &&
		//compare the time when the current event happened to latest saved event. if not enough time has passed, we will not process the event
		moment.unix(message.meta.time) - cooldown >= lastEventTime 
		){  
		console.log("event triggercode = 4");
		models.sensorbin.findOne({
			attributes: ['trashbinId'],
			where: {
				touchtagDevEui: message.meta.device
			}
		}).then(sensorbin => {
			console.log(sensorbin.dataValues.trashbinId);
			const trashbinid = sensorbin.dataValues.trashbinId;

			models.processedevent.create({
				packet_hash: message.meta.packet_hash,
				event_type: "Bin opened",
				even_time: moment.unix(message.meta.time),
				trashbinId: trashbinid
			}).then(() => {
				models.processedevent.findOne({
					where:{
						packet_hash: message.meta.packet_hash
					},
					include:[
						{ model: models.trashbin, attributes:['trashbinid'] },
					],
				})
			})
		});
	}
	else{
		console.log("event triggercode not 4")
	}
}
