import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

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
          icon={ icon }
        >
            { isOpen && <InfoWindow><h5>test</h5></InfoWindow> }
        </Marker>
    )
  }
}

export default MarkerWithInfoWindow;
