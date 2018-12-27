import React from 'react';
//import './TrashBinDetails.css';
import EventMenu from './EventMenu'
import getEventsByTrashbin from '../api/getEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'


class TrashBinDetails extends React.Component {

    state = {
        loading: true,
        events: [],
        trashbin: {}
    }

    async componentDidMount() {
        var id = window.location.pathname.replace('/', '');
        this.setState({
            events: await getEventsByTrashbin(id),
            trashbin: await getSingleTrashbinData(id),
            loading: false
        });
    }
    renderSwitch(param) {
        switch (param) {
            case '2':
                return 'singleclick';
            case '3':
                return 'movement start';
            case '4':
                return 'movement stop';
            case '5':
                return 'freefall';
            case '8':
                return 'doubleclick';
            case '0':
                return 'restart';
            case '9':
                return 'long click';
            case '11':
                return 'temp max/min';
            case '6':
                return 'activation';
            default:
                return param;
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
                            {events.map(event =>
                                <EventRow event_time={event.event_time}
                                event={this.renderSwitch(event.trigger_code)}
                                key={event.packet_hash}/>
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

export default TrashBinDetails;