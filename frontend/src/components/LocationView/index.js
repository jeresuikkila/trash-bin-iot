import React, { Component } from 'react';
import hsylogo from '../../static/hsy-logo.png';
import './styles.css'

class LocationView extends Component {

    render() {

        return (
            <div id="sidebar">
                <p className="back-text">Back</p>
                <div className="location-white-background" />
                <img src={ hsylogo } className="hsy-logo" alt="logo" />
            </div>
        )
    }
}

export default LocationView;
