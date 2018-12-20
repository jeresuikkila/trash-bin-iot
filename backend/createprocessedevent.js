exports.createProcessedEvent = function (message, models,moment) {
	console.log("creaeprocessedevent started");

	var lastEventTime = Number( models.processedevent.max('event_time').then( max => {}) );
	lastEventTime = lastEventTime || 0; //returns 0 if lastEventTime == falsey
	const cooldown = 60;		
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
			console.log("event time: ",message.meta.time);

			models.processedevent.findOrCreate({
				where: {
					packet_hash: message.meta.packet_hash
					// trashbinId: sensorbin.dataValues.trashbinId,
					// event_time: {
					// 	"$between": ["2018-03-31T21:00:00.000Z","2018-05-30T05:23:59.007Z"]
					// }
				},
				defaults: {
				packet_hash: message.meta.packet_hash,
				event_type: "Bin opened",
				event_time: moment.unix(message.meta.time),
				trashbinId: sensorbin.dataValues.trashbinId
				}
			}).then(() => {
				models.processedevent.findOne({
					where:{
						packet_hash: message.meta.packet_hash
					},
					include:[
						{ model: models.trashbin, attributes:['id'] },
					],
				})
			})
		});
	}
	else{
		console.log("event triggercode not 4")
	}
}
