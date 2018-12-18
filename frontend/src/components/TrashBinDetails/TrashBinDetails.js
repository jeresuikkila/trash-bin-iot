import React from 'react';
import './TrashBinDetails.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TrashBinDetails extends React.Component {
    render() {
        return (
            <div>
                <h3>Trash bin details</h3>
                <p>ID: {this.props.trashbin.id}</p>
                <p>Address: {this.props.trashbin.address}</p>
                <p>Type: {this.props.trashbin.bintype}</p>
                <Router>
                <div>
                <Link to="/" onClick={() => this.props.setBinSelected(null)}>Back</Link>
                <Route exact path="/"></Route>
                </div>
                </Router>
            </div>
        )
    }
}

export default TrashBinDetails;
