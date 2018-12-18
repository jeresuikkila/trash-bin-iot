import React from 'react';
//import './TrashBinDetails.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventMenu from './EventMenu'

class TrashBinDetails extends React.Component {
    render() {
        return (
            <div>
                <button>
                <Router>
                <div>
                <Link to="/" onClick={() => this.props.setBinSelected(null)}>Back</Link>
                <Route exact path="/"></Route>
                </div>
                </Router>
                </button>
                <h3>Trash bin details</h3>
                <p>ID: {this.props.trashbin.id}</p>
                <p>Address: {this.props.trashbin.address}</p>
                <p>Type: {this.props.trashbin.bintype}</p>
                <EventMenu />
            </div>
        )
    }
}

export default TrashBinDetails;
