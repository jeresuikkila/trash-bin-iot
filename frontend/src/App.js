import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './GoogleMaps'

const styles = {
  width: '100%',
  height: '536px'
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Trash Bin IoT</h1>
        <div style={styles}>
        <GoogleMaps/>
        </div>
    </div>
    );
  }
}

export default App;
