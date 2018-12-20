import React, { Component } from 'react';
import TrashBinRow from './TrashBinRow';
import { BrowserRouter as Router, Route } from "react-router-dom";
// eslint-disable-next-line
import GetTrashbinData from '../api/getTrashbinData';

class MainPage extends Component {
  state = {trashbins: [] }

  componentWillMount() {
    GetTrashbinData().then(
        bins => this.setState({trashbins: bins})
    );
  }


  render() {
    let trashbins = this.state.trashbins
    console.log(trashbins)
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
            {trashbins.map(trashbin => 
              <TrashBinRow
                key={trashbin.id}
                bin={trashbin}
                setBinSelected={this.props.setBinSelected}
                />
            )}
          </tbody>
        </table>
      </div>


    )
  }
}

export default MainPage;


