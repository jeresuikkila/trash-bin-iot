import React from 'react';
import hsylogo from '../../static/hsy-logo.png';
import './styles.css'

const LocationView = (props) => {
    const {toggleLocationView, location} = props;
    return (
        <div id="sidebar">
            <button className="back-button-round" onClick = {() => toggleLocationView(location.id)}></button>
            <p className="back-text">Back</p>
            <div className="location-white-background">
                <p className="">{location.address.split(",")[0]}</p>
            </div>
            <img src={ hsylogo } className="hsy-logo" alt="logo" />
        </div>
    )
}


export default LocationView;
