import React, { Component } from 'react';
import './App.css';

import TrashBinRow from './components/TrashBinRow';

// eslint-disable-next-line
import GetData from './api/getData';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Trash Bin IoT</h1>
        <h2>Trash bins</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Bin ID</th>
              <th scope="col">Property manager</th>
              <th scope="col">Address</th>
              <th scope="col">Type</th>
              <th scope="col">Latest event</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <TrashBinRow
              id="1"
              owner="Aalto"
              address="Otakaari 5"
              type="Large Bio Waste"
              latestEvent="Opened yesterday"
              status="OK" />
            <TrashBinRow
              id="2"
              owner="Aalto"
              address="Otakaari 7"
              type="Small Bio Waste"
              latestEvent="Opened today"
              status="FULL" />
            <TrashBinRow
              id="3"
              owner="Aalto"
              address="Otakaari 5"
              type="Small Bio Waste"
              latestEvent="Opened yesterday"
              status="OK" />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
