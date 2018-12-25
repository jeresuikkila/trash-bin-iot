exports.createProcessedEvent = function (message, models,moment) {
	console.log("creaeprocessedevent started");

	var lastEventTime = Number( models.processedevent.max('event_time').then( max => {}) );
	lastEventTime = lastEventTime || 0; //returns 0 if lastEventTime == falsey
	const cooldown = 60;		
	// trigger code 4 stands for movement stop
	if (Number(message.decoded_payload.trigger_code) == 4/* &&
		//compare the time when the current event happened to latest saved event. if not enough time has passed, we will not process the event
		moment.unix(message.meta.time) - cooldown >= lastEventTime*/ 
		){  
		console.log("event triggercode = 4");
		var time=moment.unix(message.meta.time).format();
		var time2=moment.unix(message.meta.time-cooldown).format();
		console.log("time between ",time2,"  and  ",time)
		models.sensorbin.findOne({
			attributes: ['trashbinId'],
			where: {
				touchtagDevEui: message.meta.device
			}
		}).then(sensorbin => {
			console.log("sensorbin: ",sensorbin.dataValues);

			models.processedevent.findOrCreate({
				where: {
					//packet_hash: message.meta.packet_hash
					 trashbinId: sensorbin.dataValues.trashbinId,
					 event_time: {
					 	"$between": [time2,time]
					 }
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
			}).catch(err => {
				console.log("lul",err)
			})
		});
	}
	else{
		console.log("nothing interesting happens")
	}
}
