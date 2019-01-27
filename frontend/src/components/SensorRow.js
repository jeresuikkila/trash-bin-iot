import React from 'react';
import './CSS/SensorRow.css'

class SensorRow extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      tagloc: 'Bottom sensor',
    }
  }

  async componentDidMount() {
    if (this.props.sensor.taglocation === 'lid') {
      this.setState({
        tagloc: 'Top sensor'
      });
    }
  }

  render() {
    let tagloc = this.state.tagloc;
    return (
      <div className="sensor-row">
        <div style={{ flex: 1 }}>
          {tagloc}
        </div>
        <div style={{ flex: 3 }}>
          id: {this.props.sensor.id}
        </div>
      </div>
    )
  }
}

export default SensorRow;