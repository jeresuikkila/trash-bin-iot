import React from 'react';
//import './TrashBinDetails.css';
import EventMenu from './EventMenu'
import getPEventsByTrashbin from '../api/getPEventsByTrashbin'
import getEventsByTrashbin from '../api/getEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'
import getSensorsByTrashbin from '../api/getSensorsByTrashbin';
import SensorRow from './SensorRow'
import {withRouter} from "react-router-dom";


class TrashBinDetails extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			activeEventBtnState: 0,
			isCollapseBtnActive: false,
			loading: true,
			pevents: [],
			events: [],
			trashbin: {},
			sensors: []
		}
	}

	async componentDidMount() {
		var id = window.location.pathname.replace('/', '');
		this.setState({
			pevents: await getPEventsByTrashbin(id),
			events: await getEventsByTrashbin(id),
			trashbin: await getSingleTrashbinData(id),
			sensors: await getSensorsByTrashbin(id),
			loading: false
		});
	}
	
	//triggercodes are saved to database as numbers, this returns what the number represents as text.
	renderSwitch(param) {
		switch (param) {
			case '2':
				return 'single click';
			case '3':
				return 'movement start';
			case '4':
				return 'movement stop';
			case '5':
				return 'freefall';
			case '8':
				return 'double click';
			case '0':
				return 'restart';
			case '9':
				return 'long click';
			case '11':
				return 'temp max/min';
			case '6':
				return 'activation';
			case '7':
				return 'deactivation';
			default:
				return param;
		}
	}
	
	//cleans the event times that come from touchtags into prettier format.
	timeClean(input) {
		if(input.includes("T")) {
			var res = input.split("T");
			var res2 = res[1].split(".");
			var ret = res[0] + " " + res2[0];
			return ret;
		} else {
			return input;
		}
	}
	
	//button color, manages the changing colors of the compound button (All | Bin Opened | Bin Emptied). btn dictates what button we are looking at, while input gives what button is in active state
	btnClr(btn, input) {
		if(btn == 0 && input === 0) {
			return "btn btn-success";
		} else if(btn == 0 && input !== 0) {
			return "btn btn-dark";
		} else if(btn == 1 && input === 1) {
			return "btn btn-success";
		} else if(btn == 1 && input !== 1) {
			return "btn btn-dark";
		}else if(btn == 2 && input === 2) {
			return "btn btn-success";
		} else if(btn == 2 && input !== 2) {
			return "btn btn-dark";
		} else {
			return "btn btn-danger";
		}
	}
	
	//this method is called when we want to change the active button.
	actBtnState(input) {
		this.setState({
			activeEventBtnState: input
		});
	}
	
	flipCollapseBtnState() {
		if(this.state.isCollapseBtnActive == false) {
			this.setState({
				isCollapseBtnActive: true
			});
		} else {
			this.setState({
				isCollapseBtnActive: false
			});
		}
	}
	
	flipCollapseBtnColor() {
		if(this.state.isCollapseBtnActive == true) {
			return "btn btn-success";
		} else { 
			return "btn btn-dark"; 
		}
	}
	
	render() {
		if (this.state.loading) {
			return (<p>Loading...</p>)
		}
		else {
			let trashbin = this.state.trashbin;
			let events = this.state.events;
			let pevents = this.state.pevents;
			let sensors = this.state.sensors;
			let viewSel;
			
			/*
			depending on what is the active button we change what evets we render
			0 		-> all events
			1 		-> bin opened
			2(else)	-> bin emptied
			*/
			if(this.state.activeEventBtnState === 0) {
			viewSel = 
				<tbody>
					{
					events.map((event, index) =>
						<EventRow
						event_time={this.timeClean(event.event_time)}
						event={this.renderSwitch(event.trigger_code)}
						key={index}/>
					).reverse()
					}
				</tbody>
			} else if(this.state.activeEventBtnState === 1){
				viewSel = 
					<tbody>
						{
						pevents.map((event, index) =>
							{if(event.event_type == "Bin opened") {
								return <EventRow
								event_time={this.timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
							}}
						).reverse()
						}
					</tbody>
			} else {
				viewSel =
				<tbody>
						{
						pevents.map((event, index) =>
							{if(event.event_type == "Bin emptied") {
								return <EventRow
								event_time={this.timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
							}}
						).reverse()
						}
					</tbody>
			}

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
					<h5>Sensor info</h5>

					<table className="table" >
						<thead>
							<tr>
								<th scope="col">Sensor ID</th>
								<th scope="col">Position in trashbin</th>
							</tr>
						</thead>
						<tbody>
							{sensors.map(sensor =>
							<SensorRow key={sensor.id} sensor={sensor}/>
							)}
						</tbody>
						<button type="button" class={this.flipCollapseBtnColor()} onClick={() => this.flipCollapseBtnState()} data-toggle="collapse" data-target="#collapseEventList">Show Events</button>
					</table>
					
					<div class="collapse" id="collapseEventList">	
						<div class="btn-group" role="group" >
							<button type="button" class={this.btnClr(0, this.state.activeEventBtnState)} onClick={() => this.actBtnState(0)}>All</button>
							<button type="button" class={this.btnClr(1, this.state.activeEventBtnState)} onClick={() => this.actBtnState(1)}>Bin Opened</button>
							<button type="button" class={this.btnClr(2, this.state.activeEventBtnState)} onClick={() => this.actBtnState(2)}>Bin Emptied</button>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Time</th>
									<th scope="col">Event</th>
								</tr>
							</thead>
							{viewSel}	 
						</table>
					</div>
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
