import React, { Component } from 'react';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Trash Bin IoT</h1>
        <h2>Trash bins</h2>
        <table className="table table-dark">
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
            <tr>
              <th scope="row">1</th>
              <td>Aalto</td>
              <td>Otakaari 5</td>
              <td>Large bio waste</td>
              <td>Opened yesterday</td>
              <td className="text-success">OK</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Aalto</td>
              <td>Otakaari 7</td>
              <td>Small bio waste</td>
              <td>Opened today</td>
              <td className="text-danger">FULL</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
