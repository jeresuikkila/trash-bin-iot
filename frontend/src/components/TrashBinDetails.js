import React from 'react';
//import './TrashBinDetails.css';
import EventMenu from './EventMenu'
import getPEventsByTrashbin from '../api/getPEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'
import {withRouter} from "react-router-dom";


class TrashBinDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            events: [],
            trashbin: {}
        }
    }

    handleClick = () => {
        this.props.history.push("/");
    }

    async componentDidMount() {
        var id = window.location.pathname.replace('/', '');
        this.setState({
            events: await getPEventsByTrashbin(id),
            trashbin: await getSingleTrashbinData(id),
            loading: false
        });
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
	
    render() {
        if (this.state.loading) {
            return (<p>Loading...</p>)
        }
        else {
            let trashbin = this.state.trashbin;
            let events = this.state.events;
            return (
                <div>
                    <button onClick={this.handleClick} type="button" className="btn btn-sm">Main Page</button>
                    <h3>Trash bin details</h3>
                    <p>ID: {trashbin.id}</p>
                    <p>Address: {trashbin.address}</p>
                    <p>Type: {trashbin.bintype}</p>
                    <EventMenu />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) =>
                                <EventRow 
								event_time={this.timeClean(event.event_time)}
                                event={event.event_type}
                                key={index}/>
                            )}
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
