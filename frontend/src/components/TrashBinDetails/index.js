import React from 'react';
import './TrashBinDetails.css';

class TrashBinDetails extends React.Component {
    render() {
        return (
            <div>
                <h3>Trash bin details</h3>
                <p>ID: {this.props.trashbin.id}</p>
                <p>Address: {this.props.trashbin.address}</p>
                <p>Type: {this.props.trashbin.bintype}</p>
                <button
                    className="btn btn-light"
                    onClick={() => this.props.setBinSelected(null)}>
                    Back
                </button>
            </div>
        )
    }
}

export default TrashBinDetails;
