import React from 'react';
import { Marker } from 'react-google-maps';
import './styles.css'

const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

class MarkerWithInfoWindow extends React.Component {
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
    const { position, icon } = this.props
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
                pixelOffset: new window.google.maps.Size(-13, -262),
                closeBoxURL: '', // set to "null" as it's closed on hover
              } }
            >
                <div className="box tri">
                    <div className="dark-teal-infobox"><p className="address-text">Address: Blaah</p></div>
                </div>
            </InfoBox>
            )}
        </Marker>
    )
  }
}

export default MarkerWithInfoWindow;
