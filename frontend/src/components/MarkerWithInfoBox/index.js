import React from 'react';
import { Marker } from 'react-google-maps';
import './styles.css'
import InfoBoxItem from '../InfoBoxItem';

const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

class MarkerWithInfoBox extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
	  wasteTypes: ['General', 'Biowaste', 'Cardboard', 'Plastic', 'Glass', 'Metal']
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    const { isOpen } = this.state
    this.setState({
      isOpen: !isOpen,
    });
  }

  getAllIcons(trashBinsWithOverflow) {
    var i = 1;
	var starter = this.getIcons(trashBinsWithOverflow, this.state.wasteTypes[0])
	for(i; i<6; i++) {
		starter.push(this.getIcons(trashBinsWithOverflow, this.state.wasteTypes[i]))
	}
	console.log(starter);
	return starter;
  }

  getIcons(trashBinsWithOverflow, trashtype) {
    const a1 = this.iconsFull(trashBinsWithOverflow, trashtype);
    const a2 = this.iconsNotFull(trashBinsWithOverflow, trashtype);
    a1.push(a2);
    return (a1 );
  }

  iconsFull(trashBinsWithOverflow, trashtype) {
    return trashBinsWithOverflow.filter(bin => bin.fillStatus === 100 &&
                                               bin.type === trashtype).map((bin, i) => (
                                                   <InfoBoxItem
                                                     type={ bin.type }
                                                     fillStatus={ bin.fillStatus }
                                                     overflowStatus={ bin.overflowStatus }
                                                     key={ i }
                                                   />
    ));
  }

  iconsNotFull(trashBinsWithOverflow, trashtype) {
    return trashBinsWithOverflow.filter(bin => bin.fillStatus !== 100 &&
                                               bin.type === trashtype).map((bin, i) => (
                                                   <InfoBoxItem
                                                     type={ bin.type }
                                                     fillStatus={ bin.fillStatus }
                                                     overflowStatus={ bin.overflowStatus }
                                                     key={ i }
                                                   />
    ));
  }

  offsetCounter(trashBins, markerSize) {
    return (-100 - (Math.ceil(trashBins.length / 4)) * 70 - markerSize.height + 18)
  }

  render() {
    const { isOpen } = this.state;
    const {
      position, icon, trashBins, toggleLocationView, locationId, overflowTypes,
    } = this.props;
    let { address } = this.props;
    address = address.split(',')[ 0 ].toLowerCase()
    address = address.charAt(0).toUpperCase() + address.slice(1)

    const trashBinsWithOverflow = trashBins.map( (bin) => {
      if (overflowTypes.includes(bin.type)) {
        bin.overflowStatus = true
      } else {
        bin.overflowStatus = false
      }
      return bin
    })

    return (
        <Marker
          position={ position }
          onMouseOver={ this.onToggleOpen }
          onMouseOut={ this.onToggleOpen }
          onFocus={ this.onToggleOpen }
          onBlur={ this.onToggleOpen }
          icon={ icon }
          onClick={ () => toggleLocationView(locationId) }
        >
            { isOpen && (
            <InfoBox
              defaultPosition={ new window.google.maps.LatLng(position.lat, position.lng) }
              options={ {
                pixelOffset:
                  new window.google.maps.Size(-10, this.offsetCounter(trashBins, icon.scaledSize)),
                closeBoxURL: '', // set to "null" as it's closed on hover
              } }
            >
                <div className="box triangle">
                    <div className="dark-teal-infobox">
                        <p className="address-text">{address}</p>
                    </div>
                    <div className="type-icon-container">
                        {this.getAllIcons(trashBinsWithOverflow)}
                    </div>
                </div>
            </InfoBox>
            )}
        </Marker>
    )
  }
}

export default MarkerWithInfoBox;
