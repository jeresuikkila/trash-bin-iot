import React from 'react';
//import './TrashBinDetails.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventMenu from './EventMenu'
import getEventsByTrashbin from '../api/getEventsByTrashbin'


class TrashBinDetails extends React.Component {

    state = {
        loading: true,
        events: {}
    }

    componentDidMount(){
        getEventsByTrashbin(this.props.trashbin.id).then(event => this.setState({events: event, loading: false})) 
    }    

    render() {
        if(this.state.loading){
            return(<p>Loading...</p>)
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
                    <p>ID: {this.props.trashbin.id}</p>
                    <p>Address: {this.props.trashbin.address}</p>
                    <p>Type: {this.props.trashbin.bintype}</p>
                    
                    <table className="table">
                        <EventMenu />
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Trigger Code</th>
                        </tr>
                        <tbody>
                            {this.state.events.map(event =>
                             <tr>
                                 <td>{event.event_time}</td>
                                 <td>{event.trigger_code}</td>
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