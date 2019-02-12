import React, {Component} from 'react'
var trashbin = require('./trashcan.png');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const GoogleMaps = withScriptjs(
  withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
        lat: 60.192059,
        lng: 24.945831
        }}
  >
    <Marker
        icon={{
            url: trashbin,
            title: "roskakori!",
            scaledSize: new window.google.maps.Size(35,40)
        }}
      position={{
        lat: 60.192059,
        lng: 24.945831
        }}

    />
  </GoogleMap>
));
// Export Google Map component
export default GoogleMaps
