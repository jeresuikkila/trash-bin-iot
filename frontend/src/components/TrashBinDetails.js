import React from 'react';
//import './TrashBinDetails.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventMenu from './EventMenu'
import getEventsByTrashbin from '../api/getEventsByTrashbin'
import getSingleTrashbinData from '../api/getSingleTrashbinData'


class TrashBinDetails extends React.Component {

    state = {
        loading: true,
        events: {},
        trashbin: {}
    }

    componentWillMount() {
        var id = window.location.pathname.replace('/','') 
        console.log("id", id)
        getSingleTrashbinData(id).then(trashbin => {
            console.log(trashbin)
            this.trashbin = trashbin
        } )
        console.log("trashbin", this.trashbin)
        getEventsByTrashbin(id).then(event => this.setState({ events: event, loading: false }))
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
            return (
                <div>
                    <Router>
                        <div>
                            <Link to="/" onClick={() => this.props.setBinSelected(null)}>
                                <button className="btn btn-light">
                                    Back
                                </button>
                            </Link>
                            <Route exact path="/"></Route>
                        </div>
                    </Router>


                    <h3>Trash bin details</h3>
                    <p>ID: {this.trashbin.id}</p>
                    <p>Address: {this.trashbin.address}</p>
                    <p>Type: {this.trashbin.bintype}</p>

                    <table className="table">
                        <EventMenu />
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Event</th>
                        </tr>
                        <tbody>
                            {this.state.events.map(event =>
                                <tr>
                                    <td>{event.event_time}</td>
                                    <td> {this.renderSwitch(event.trigger_code)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default TrashBinDetails;