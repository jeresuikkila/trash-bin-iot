import React from 'react'
import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap,
} from 'react-google-maps';
import MarkerWithInfoBox from '../MarkerWithInfoBox'

const styledMap = require('./styledMap.json')
const locationFull = require('../../static/location-full.png')
const locationOk = require('../../static/location-ok.png')

const key = process.env.REACT_APP_GOOGLE_API_KEY != null ? process.env.REACT_APP_GOOGLE_API_KEY : '';

const getMarkerUrl = (trashbins) => {
  let maxFillStatusOnLocation = 0;

  trashbins.forEach( (bin) => {
    maxFillStatusOnLocation = (bin.fillStatus > maxFillStatusOnLocation)
      ? bin.fillStatus : maxFillStatusOnLocation
  })
  return (maxFillStatusOnLocation === 100) ? locationFull : locationOk;
}

const getTrashBins = bins => {
  return bins.map(bin => ({ type: bin.wasteType, fillStatus: bin.fillStatus }))
}

const getOverflowTypes = location => {

  let overflowTypes = [];
  let trashbins = location.trashbins;

  trashbins.sort(function(a,b){
    if(a.wasteType < b.wasteType) { return -1; }
    if(a.wasteType > b.wasteType) { return 1; }
    return 0;
  })

  let currentWasteType = trashbins[0].wasteType;
  let binCounter = 0;
  let fullCounter = 0;

  trashbins.forEach((bin, j) => {

    if (currentWasteType !== bin.wasteType) {
      if (binCounter === fullCounter) {
        overflowTypes.push(currentWasteType)
      }
      binCounter = 0;
      fullCounter = 0;
    }

    currentWasteType = bin.wasteType
    if (bin.fillStatus === 100) fullCounter += 1;
    binCounter += 1;

    if (j === trashbins.length-1 && binCounter === fullCounter){
      overflowTypes.push(currentWasteType)
    }
  });

  return overflowTypes;
}

const GoogleMaps = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${ key }`, // add google maps api key to the end of the line.
    loadingElement: <div style={ { height: '100%' } } />,
    containerElement: <div style={ { height: '100%' } } />,
    mapElement: <div style={ { height: '100%' } } />,
  }),

  withScriptjs,
  withGoogleMap,
)( props => (
    <GoogleMap
      defaultZoom={ 16 }
      defaultCenter={ {
        lat: 60.1873,
        lng: 24.82339,
      } }
      defaultOptions={ {
        styles: styledMap, streetViewControl: false, mapTypeControl: false,
      } } // load custom map style and disable street view
    >

        { props.locations.map( location => ( // map locations and statuses to create markers
            <MarkerWithInfoBox
              icon={ {
                url: getMarkerUrl(location.trashbins),
                title: 'trashbin',
                scaledSize: new window.google.maps.Size(15, 15),
              } }
              position={ {
                lat: location.lat,
                lng: location.lon,
              } }
              trashBins={ getTrashBins(location.trashbins) }
              key={ location.id }
              locationId={ location.id }
              address={ location.address }
              toggleLocationView={ props.toggleLocationView }
              overflowTypes={ getOverflowTypes(location) }
            />
        ))}

    </GoogleMap>
));

// Export Google Map component
export default GoogleMaps
