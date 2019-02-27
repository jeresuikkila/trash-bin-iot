import React from 'react'
import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';
const styledMap = require('../../components/GoogleMaps/styledMap.json')
const locationFull = require('../../static/location-full.png')
const locationOk = require('../../static/location-ok.png')

const getMarkerUrl = (trashbins) => {
  let maxFillStatusOnLocation = 0;

  trashbins.forEach( (bin) => {
    maxFillStatusOnLocation = (bin.fillStatus > maxFillStatusOnLocation)
      ? bin.fillStatus : maxFillStatusOnLocation
  })
  return (maxFillStatusOnLocation === 100) ? locationFull : locationOk;
}

const GoogleMaps = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${ process.env.REACT_APP_GOOGLE_API_KEY }`, // add google maps api key to the end of the line.
    loadingElement: <div style={ { height: '100%' } } />,
    containerElement: <div style={ { height: '100%' } } />,
    mapElement: <div style={ { height: '100%' } } />,
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
      defaultOptions ={{ styles: styledMap }} // load custom map style
    >

        { props.locations.map( location => ( // map list of locations and their statuses to create markers on the map
            <Marker
              icon={ {
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
