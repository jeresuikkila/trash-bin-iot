import React, {Component} from 'react'
let trashbin = require('./trashcan.png');
let yellow = require('./yellow.png');
let blue = require('./blue.png');
// placeholder list to markers, should be made into call from API to get list from database or smth.
let markerList =[
  {id: 1, lat: 60.162059, lng: 24.945831, status: blue },
  {id: 2, lat: 60.182059, lng: 24.915831, status: yellow },
  {id: 3, lat: 60.142059, lng: 24.845831, status: blue },
  {id: 4, lat: 60.092059, lng: 24.745831, status: trashbin },
  {id: 5, lat: 60.122059, lng: 24.905831, status: yellow }
]
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} = require("react-google-maps");
const GoogleMaps = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=", // add google maps api key to the end of the line.
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ 
        lat: 60.192059,
        lng: 24.945831 
        }}
  >
  {markerList.map(marker => (
    <Marker
    icon={{
        url: marker.status,
        title: 'roskakori!',
        scaledSize: new window.google.maps.Size(35,40)
    }}
  position={{ 
    lat: marker.lat,
    lng: marker.lng 
    }}
    key = {
      markerList.id
    }
    onMouseOver={props.onToggleOpen}
    // onClick={avaa ikkuna jne}
    onMouseOut={props.onToggleOpen}
>
  {props.isOpen && 
  <InfoWindow
   onCloseClick={props.onToggleOpen}
   >
    <trashbin/>
  </InfoWindow>}
    </Marker>
  ))}
  </GoogleMap>
);
// Export Google Map component
export default GoogleMaps