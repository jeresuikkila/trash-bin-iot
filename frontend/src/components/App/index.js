import React, { Component } from 'react';
import './style.css';
import HSYSidebar from '../HSYSidebar'
import GoogleMaps from '../GoogleMaps'

const styles = {
  width: '100%',
  height: '100vh',
}

class App extends Component {
  render() {
    return (
        <div className="fluid-container">
            <HSYSidebar />
            <div style={ styles }>
                <GoogleMaps />
            </div>
        </div>
    );
  }
}

export default App;
