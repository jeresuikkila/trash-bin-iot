import React from 'react';
import './CSS/TrashBinDetails.css';
import getPEventsByTrashbin from '../api/getPEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'
import getSensorsByTrashbin from '../api/getSensorsByTrashbin';
import SensorRow from './SensorRow'
import {withRouter} from "react-router-dom";
import trashbinimage from '../trashbinimage.jpg';
import {timeClean} from './FrontEndFunctions';

class TrashBinDetails extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			filter: [{id: 0, state: true,titlepart: "hide"},{id: 1, state: true,titlepart: "hide"}],
			loading: true,
			pevents: [],
			filteredEvents: [],
			trashbin: {},
			sensors: []
		}
	}

	async componentDidMount() {
		var id = window.location.pathname.replace('/', '');
		this.setState({
			pevents: await getPEventsByTrashbin(id),
			trashbin: await getSingleTrashbinData(id),
			sensors: await getSensorsByTrashbin(id),
			loading: false
		});
		this.setState({
			filteredEvents: this.state.pevents
		});
	}
	
	showHide(input) {
		if(input === "open" && this.state.openActive){
			return "Hide ";
		} else if(input === "open" && !this.state.openActive) {
			return "Show ";
		} else if(input === "emptied" && this.state.emptiedActive){
			return "Hide ";
		} else if(input === "emptied" && !this.state.emptiedActive) {
			return "Show ";
		}
	}
	
    filterEvents = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state.filter));
        temp[id].selected = !temp[id].selected;
        this.setState({
            filter: temp,
            filteredEvents: this.state.pevents.filter(function(event) {
                console.log(event.event_type);
                if(temp[0].selected & temp[1].selected){
                    return event;
                }
                if(temp[0].selected & !temp[1].selected){
                    if(event.event_type === "Bin opened"){
                        return event;
                    }
                }
                if(!temp[0].selected & temp[1].selected){
                    if(event.event_type === "Bin emptied"){
                        return event;
                    }
                }
                return null;
            })
        });
    }
	
	
	render() {
		if (this.state.loading) {
			return (<p>Loading...</p>)
		}
		else {
			let trashbin = this.state.trashbin;
			let events = this.state.filteredEvents;
			let sensors = this.state.sensors;

			//content inside will be rendered in browser
			return (
				<div>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><a href="/">Main Page</a></li>
							<li className="breadcrumb-item active" aria-current="page">{trashbin.id}</li>
						</ol>
					</nav>

					<h3>Trash bin details</h3>
					<p>Address: {trashbin.address}</p>
					<p>Type: {trashbin.bintype}</p>
					<p>Owner: {trashbin.owner}</p>

					<p></p>
                    <div className="logo">
                        <div id="trashin-pic">
                            <img src={trashbinimage} alt="Trashbin" width="125" height="125" />
                        </div>
                        <div className="table sensor" >
                            { sensors.map(sensor =>
                                <SensorRow
                                    key={sensor.id}
                                    sensor={sensor}
                                    events={events}/>
                            )}
                        </div>
                    </div>
					<p></p>
						<div className="btn-group" role="group" >
							<button type="button" className="btn btn-light" onClick={() => {this.filterEvents(0, this.state.openActive)}}>{this.showHide("open")}opened</button>
							<button type="button" className="btn btn-light" onClick={() => {this.filterEvents(1, this.state.emptiedActive)}}>{this.showHide("emptied")}emptied</button>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Time</th>
									<th scope="col">Event</th>
								</tr>
							</thead>
							<tbody>
								{
									events.map((event, index) => {
										return <EventRow
										event_time={timeClean(event.event_time)}
										event={event.event_type}
										key={index}/>
									})
								}
							</tbody>	 
						</table>
				</div>
			)
		}
	}
}

const EventRow = (props) => {
    return (
        <tr>
            <td>{props.event_time}</td>
            <td> {props.event}</td>
        </tr>
    )
};

export default withRouter(TrashBinDetails);