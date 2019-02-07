import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './GoogleMaps'

const styles = {
  width: '100%',
  height: '100vh'
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div style={styles}>
        <GoogleMaps/>
        </div>
    </div>
    );
  }
}

export default App;
