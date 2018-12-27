import React, { Component } from 'react';
//import './MainPage.css';

import TrashBinRow from './TrashBinRow';

// eslint-disable-next-line
import GetTrashbinData from '../api/getTrashbinData';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { trashbins: [] }
  }

  async componentDidMount() {
    this.setState({trashbins: await GetTrashbinData()})
  }

  render() {
    let trashbins = this.state.trashbins
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
                setBinSelected={this.props.setBinSelected}/>
            )}
          </tbody>
        </table>
      </div>

    )
  }
}

export default MainPage;