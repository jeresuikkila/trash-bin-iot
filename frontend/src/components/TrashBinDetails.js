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
			test123: 0,
            loading: true,
            pevents: [],
			events: [],
            trashbin: {},
            sensors: []
        }
    }

    handleClick = () => {
        this.props.history.push("/");
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
	
	//this.inc = this.inc.bind(this);

	inc(input) {
		this.setState({
			test123: input
		});
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
			let test = this.state.test123;
			let viewSel;
	
	if(this.state.test123 === 0) {
		viewSel = <tbody>
                        {
						events.map((event, index) =>
                            <EventRow
							event_time={this.timeClean(event.event_time)}
                            event={this.renderSwitch(event.trigger_code)}
                            key={index}/>
                            ).reverse()
						}
                       </tbody>
	} else {
		viewSel = <tbody>
                        {
						pevents.map((event, index) =>
                            <EventRow
							event_time={this.timeClean(event.event_time)}
                            event={event.event_type}
                            key={index}/>
                           ).reverse()
						}
                       </tbody>
	}
	
	
	
	
	console.log(test)
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
                        <SensorRow
                        key={sensor.id}
                        sensor={sensor}/>
                    )}
                    </tbody>
                    </table>
						
					<button type="button" class="btn btn-success" onClick={() => this.inc(0)}>All Events</button>
					<button type="button" class="btn btn-warning" onClick={() => this.inc(1)}>Bin Opened Events</button>
					<button type="button" class="btn btn-danger" onClick={() => this.inc(2)}>Bin Emptied Events</button>

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
