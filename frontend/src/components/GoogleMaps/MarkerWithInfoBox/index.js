import React from 'react';
import { Marker } from 'react-google-maps';
import './styles.css'
import InfoBoxItem from './InfoBoxItem';

const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

class MarkerWithInfoBox extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    const { isOpen } = this.state
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const {
      position, icon, address, trashBins,
    } = this.props
    const { isOpen } = this.state
    return (
        <Marker
          position={ position }
          onMouseOver={ this.onToggleOpen }
          onMouseOut={ this.onToggleOpen }
          onFocus={ this.onToggleOpen }
          onBlur={ this.onToggleOpen }
          icon={ icon }
        >
            { isOpen && (
            <InfoBox
              defaultPosition={ new window.google.maps.LatLng(position.lat, position.lng) }
              options={ {
                pixelOffset: new window.google.maps.Size(-10, -240),
                closeBoxURL: '', // set to "null" as it's closed on hover
              } }
            >
                <div className="box triangle">
                    <div className="dark-teal-infobox">
                        <p className="address-text">{address.split(',')[ 0 ]}</p>
                    </div>
                    <div className="type-icon-container">
                        {
                      trashBins.map((bin, i) => (
                          <InfoBoxItem
                            type={ bin.type }
                            fillStatus={ bin.fillStatus }
                            key={ i }
                          />
                      ))
                    }
                    </div>
                </div>
            </InfoBox>
            )}
        </Marker>
    )
  }
}

export default MarkerWithInfoBox;
