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
			openActive: true,
			emptiedActive: true,
			isLogActive: false,
			loading: true,
			pevents: [],
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
	}
	
	//used to track the state of (Show Events/Hide Events) button.
	flipBtnState(input) {
		if(input === "open" && this.state.openActive === false) {
			this.setState({
				openActive: true
			});
		} else if(input === "open" && this.state.openActive !== false) {
			this.setState({
				openActive: false
			});
		} else if(input === "emptied" && this.state.emptiedActive === false) {
			this.setState({
				emptiedActive: true
			});
		} else if(input === "emptied" && this.state.emptiedActive !== false) {
			this.setState({
				emptiedActive: false
			});
		}
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
	
	
	render() {
		if (this.state.loading) {
			return (<p>Loading...</p>)
		}
		else {
			let trashbin = this.state.trashbin;
			let pevents = this.state.pevents;
			let sensors = this.state.sensors;
			let viewSel;
			
			if(this.state.openActive && this.state.emptiedActive) {
				viewSel = 
					<tbody>
						{
						pevents.map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						})//.reverse()
						}
					</tbody>
			} else if(this.state.openActive && !this.state.emptiedActive){
				viewSel = 
					<tbody>
						{
						pevents.filter(event => (event.event_type === "Bin opened")).map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						})//.reverse()
						}
					</tbody>
			} else if(!this.state.openActive && this.state.emptiedActive){
				viewSel =
					<tbody>
						{
						pevents.filter(event => (event.event_type === "Bin emptied")).map((event, index) => {
								return <EventRow
								event_time={timeClean(event.event_time)}
								event={event.event_type}
								key={index}/>
						})//.reverse()
						}
					</tbody>
			} else {
				viewSel = 
					<tbody>
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
					<p></p>
						<div className="btn-group" role="group" >
							<button type="button" className="btn btn-light" onClick={() => this.flipBtnState("open")}>{this.showHide("open")}opened</button>
							<button type="button" className="btn btn-light" onClick={() => this.flipBtnState("emptied")}>{this.showHide("emptied")}emptied</button>
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