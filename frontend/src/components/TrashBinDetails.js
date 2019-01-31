import React from 'react';
import './CSS/TrashBinDetails.css';
import { DropdownMultiple } from 'reactjs-dropdown-component';
import getPEventsByTrashbin from '../api/getPEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'
import getSensorsByTrashbin from '../api/getSensorsByTrashbin';
import SensorRow from './SensorRow'
import { withRouter } from "react-router-dom";
import trashbinimage from '../trashbinimage.jpg';


class TrashBinDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            events: [],
            trashbin: {},
            sensors: [],
            filter: [{ id: 0, title: 'Opened', selected: true, key: 'filter' }, { id: 1, title: 'Emptied', selected: true, key: 'filter' }],
            selectedevents: []
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
            sensors: await getSensorsByTrashbin(id),
            loading: false
        });
        this.setState({
            selectedevents: this.state.events
        });
    }

    toggleSelected = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]));
        temp[id].selected = !temp[id].selected;
        this.setState({
            [key]: temp,
            selectedevents: this.state.events.filter(function(event) {
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
            let events = this.state.selectedevents;
            let sensors = this.state.sensors;
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
                            {sensors.map(sensor =>
                                <SensorRow
                                    key={sensor.id}
                                    sensor={sensor}
                                    events={events} />
                            )}
                        </div>
                    </div>
                    <DropdownMultiple titleHelper="filter"
                        title="Select filters"
                        list={this.state.filter}
                        toggleItem={this.toggleSelected}
                    />
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
                                    event_time={timeClean(event.event_time)}
                                    event={event.event_type}
                                    key={index} />
                            ).reverse()}
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

export const timeClean = (input) => {
    if (input.includes("T")) {
        var res = input.split("T");
        var res2 = res[1].split(".");
        var ret = res[0] + " " + res2[0];
        return ret;
    } else {
        return input;
    }
}

export default withRouter(TrashBinDetails);
