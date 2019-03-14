import React from 'react';
import hsylogo from '../../static/hsy-logo.png';
import backarrow from '../../static/back-arrow.png';
import './styles.css'
import Accordion from '../Accordion'

const LocationView = (props) => {
  const { toggleLocationView, location } = props;
  return (
      <div id="sidebar">
          <button type="button" className="back-button-round" onClick={ () => toggleLocationView(location.id) }>
              <img src={ backarrow } className="back-arrow" alt="arrow" />
              <p className="back-text">Back</p>
          </button>
          <div className="location-white-background">
              <p className="address">{location.address.split(',')[ 0 ]}</p>
              <p className="owner-text">{location.customer}</p>
          </div>
          <div>
              <Accordion>

              </Accordion>
          </div>
          <img src={ hsylogo } className="hsy-logo" alt="logo" />
      </div>
  )
}

export default LocationView;
