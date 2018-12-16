import React, { Component } from 'react';
import './App.css';

import TrashBinRow from './components/TrashBinRow';

// eslint-disable-next-line
import GetTrashbinData from './api/getTrashbinData';

const createTrashbinRows = ({trashbins}) => (
  trashbins.map(trashbin => 
    <TrashBinRow key={trashbin.id}
      bin={trashbin} />
  )
)

class App extends Component {
  constructor() {
    super();
    this.state = { trashbins: [] }
  }
  componentWillMount() {
    GetTrashbinData().then(bins => {
      this.setState({trashbins: bins});
    });
  }
  render() {
    let trashbins = this.state.trashbins
    console.log("trashbins: ", trashbins)
    console.log("test: ", trashbins[0])
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
              <TrashBinRow key={trashbin.id}
                bin={trashbin} />
            )}
          </tbody>
        </table>
      </div>

    );
  }
}

export default App;
