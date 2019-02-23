import React from 'react'
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';

const locationFull = require('../../static/location-full.png')
const locationOk = require('../../static/location-ok.png') 

const getMarkerUrl = (trashbins) => {
  let maxFillStatusOnLocation = 0;

  trashbins.forEach( bin => {
    maxFillStatusOnLocation = (bin.fillStatus > maxFillStatusOnLocation) ? 
    bin.fillStatus : maxFillStatusOnLocation   
  })
  return (maxFillStatusOnLocation === 100) ? locationFull : locationOk;

}

const GoogleMaps = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=', // add google maps api key to the end of the line.
    loadingElement: <div style={ { height: '100%' } } />,
    containerElement: <div style={ { height: '100%' } } />,
    mapElement: <div style={ { height: '100%' } } />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)( props => (
    <GoogleMap
      defaultZoom={ 14 }
      defaultCenter={ {
        lat: 60.1873,
        lng: 24.82339,
      } }
    >

        { props.locations.map( location => (
            <Marker
              icon= { {
                url: getMarkerUrl(location.trashbins),
                title: 'trashbin',
                scaledSize: new window.google.maps.Size(15, 15),
              } }
              position={ {
                lat: location.lat,
                lng: location.lon,
              } }
              key={ location.id }
            />
          ))}

    </GoogleMap>
));

// Export Google Map component
export default GoogleMaps
