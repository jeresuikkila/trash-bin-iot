import React from 'react';
import hsylogo from '../../static/hsy-logo.png';
import './styles.css'

const LocationView = (props) => {
    const {toggleLocationView, locationId} = props;
    return (
        <div id="sidebar">
            <button className="back-button-round" onClick = {() => toggleLocationView(locationId)}></button>
            <p className="back-text">Back</p>
            <div className="location-white-background" />
            <img src={ hsylogo } className="hsy-logo" alt="logo" />
        </div>
    )
}


export default LocationView;
