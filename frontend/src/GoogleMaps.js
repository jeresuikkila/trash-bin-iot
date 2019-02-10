import React from 'react'

const { compose, withProps, withStateHandlers } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps');

const trashbin = require('./trashcan.png');

// placeholder list to markers, should be made into call from API to get list from database or smth.
const aaltoLocations = require('./api/aalto-geocoded-with-ids.json')

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
)( () => (
    <GoogleMap
      defaultZoom={ 14 }
      defaultCenter={ {
        lat: 60.1873,
        lng: 24.82339,
      } }
    >

        { aaltoLocations.map( marker => (
            <Marker
              icon={ {
                url: trashbin,
                title: 'Roskakori',
                scaledSize: new window.google.maps.Size(35, 40),
              } }
              position={ {
                lat: marker.lat,
                lng: marker.lon,
              } }
              key={ marker.id }
            />
        ))}

    </GoogleMap>
));

// Export Google Map component
export default GoogleMaps
