import React, { Component } from 'react';
import logo from './logo.svg';
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
        /</div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
