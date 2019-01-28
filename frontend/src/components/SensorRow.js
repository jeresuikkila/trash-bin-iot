import React from 'react';
import './CSS/SensorRow.css'
import {timeClean} from './TrashBinDetails.js';

class SensorRow extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      tagloc: 'Bottom sensor',
      lastevent: '-',
    }
  }

  async componentDidMount() {
    if (this.props.sensor.taglocation === 'lid') {
      let reversedArray = this.props.events.reverse();
      let event = reversedArray.find((each)=>{return each.event_type === 'Bin opened'})
      this.setState({
        tagloc: 'Top sensor',
        lastevent: event ? timeClean(event.event_time) : "-",
      });
    /*} else {
      let reversedArray = events.reverse();
      event = reversedArray.find((each)=>{return each.event_type === 'Bin emptied'})
      this.setState({
        tagloc: 'Bottom sensor',
        lastevent: event.event_time,
      });*/
    }
  }

  render() {
    let tagloc = this.state.tagloc;
    let lastevent = this.state.lastevent;
    return (
      <div className="sensor-row">
        <div style={{ flex: 1 }}>
          {tagloc}
        </div>
        <div style={{ flex: 1 }}>
          id: {this.props.sensor.id}
        </div>
        <div style={{ flex: 1 }}>
          Last event: {lastevent}
        </div>
      </div>
    )
  }
}

export default SensorRow;