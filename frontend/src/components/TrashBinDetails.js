import React from 'react';
import './CSS/TrashBinDetails.css';
//import EventMenu from './EventMenu'
import getPEventsByTrashbin from '../api/getPEventsByTrashbin'
import getEventsByTrashbin from '../api/getEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'
import getSensorsByTrashbin from '../api/getSensorsByTrashbin';
import SensorRow from './SensorRow'
import {withRouter} from "react-router-dom";
import trashbinimage from '../trashbinimage.jpg';


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
	
	//triggercodes are saved to database as numbers from touchtags, this returns what the number represents as text.
	trigCodeToText(param) {
		switch (param) {
			case '0':
				return 'restart';
			case '1':
				return 'timer';
			case '2':
				return 'single click';
			case '3':
				return 'movement start';
			case '4':
				return 'movement stop';
			case '5':
				return 'freefall';
			case '6':
				return 'activation';
			case '7':
				return 'deactivation';
			case '8':
				return 'double click';
			case '9':
				return 'long click';
			case '10':
				return 'temp max treshold';
			case '11':
				return 'temp min treshold';
			default:
				return param;
		}
	}
	
/*	//cleans the event times that come from touchtags into prettier format.
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
*/	
	//button color, manages the changing colors of the compound button [All | Bin Opened | Bin Emptied]. 'btn' dictates which button we are manipulating at the moment, while 'input' gives which of the 3 is last clicked on website.
	btnClr(btn, input) {
		if(btn === 0 && input === 0) {
			return "btn btn-success";
		} else if(btn === 0 && input !== 0) {
			return "btn btn-dark";
		} else if(btn === 1 && input === 1) {
			return "btn btn-success";
		} else if(btn === 1 && input !== 1) {
			return "btn btn-dark";
		}else if(btn === 2 && input === 2) {
			return "btn btn-success";
		} else if(btn === 2 && input !== 2) {
			return "btn btn-dark";
		} if(btn === 3 && input === 3) {
			return "btn btn-success";
		} else if(btn === 3 && input !== 3) {
			return "btn btn-dark";
		} else {
			return "btn btn-danger";
		}
	}
	
	//this method is called when we want to change the active event button. (put to memory which button was last clicked in compound button [All | Bin Opened | Bin Emptied])
	changeActiveEventBtnState(input) {
		this.setState({
			activeEventBtnState: input
		});
	}
	
	//used to track the state of (Show Events/Hide Events) button.
	flipCollapseBtnState() {
		if(this.state.isCollapseBtnActive === false) {
			this.setState({
				isCollapseBtnActive: true
			});
		} else {
			this.setState({
				isCollapseBtnActive: false
			});
		}
	}
	
	//changes the color & text of (Show Events/Hide Events) button depending on wether it's active or not. input tells if we are changing "color" or "text"
	collapseBtnColorAndText(input) {
		if(input === "color" && this.state.isCollapseBtnActive === true) {
			return ("btn btn-success");
		} else if(input === "color" && this.state.isCollapseBtnActive === false){ 
			return ("btn btn-dark"); 
		} else if(input === "text" && this.state.isCollapseBtnActive === true) {
			return ("Hide Events");
		} else if(input === "text" && this.state.isCollapseBtnActive === false){ 
			return ("Show Events"); 
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
			2		-> bin emptied
			else(3)	-> unprocessed events
			*/
			if(this.state.activeEventBtnState === 0) {
				viewSel = 
					<tbody>
						{
						pevents.map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						}).reverse()
						}
					</tbody>
			} else if(this.state.activeEventBtnState === 1){
				viewSel = 
					<tbody>
						{
						pevents.filter(event => (event.event_type === "Bin opened")).map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						}).reverse()
						}
					</tbody>
			} else if(this.state.activeEventBtnState === 2){
				viewSel =
					<tbody>
						{
						pevents.filter(event => (event.event_type === "Bin emptied")).map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						}).reverse()
						}
					</tbody>
			} else {
				viewSel = 
					<tbody>
						{
						events.map((event, index) =>
							<EventRow
							event_time={timeClean(event.event_time)}
							event={this.trigCodeToText(event.trigger_code)}
							key={index}/>
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
                                    events={pevents}/>
                            )}
                        </div>
                    </div>
					
					
					<button type="button" 
						className={this.collapseBtnColorAndText("color")} 
						onClick={() => this.flipCollapseBtnState()} 
						data-toggle="collapse" 
						data-target="#collapseEventList">
							{this.collapseBtnColorAndText("text")}
					</button>
					<p></p>
					<div className="collapse" id="collapseEventList">	
						<div className="btn-group" role="group" >
							<button type="button" className={this.btnClr(0, this.state.activeEventBtnState)} onClick={() => this.changeActiveEventBtnState(0)}>All</button>
							<button type="button" className={this.btnClr(1, this.state.activeEventBtnState)} onClick={() => this.changeActiveEventBtnState(1)}>Bin Opened</button>
							<button type="button" className={this.btnClr(2, this.state.activeEventBtnState)} onClick={() => this.changeActiveEventBtnState(2)}>Bin Emptied</button>
							<button type="button" className={this.btnClr(3, this.state.activeEventBtnState)} onClick={() => this.changeActiveEventBtnState(3)}>Unprocessed Events</button>
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

export const timeClean = (input) => {
    if(input.includes("T")) {
        var res = input.split("T");
        var res2 = res[1].split(".");
        var ret = res[0] + " " + res2[0];
        return ret;
    } else {
        return input;
    }
}

export default withRouter(TrashBinDetails);