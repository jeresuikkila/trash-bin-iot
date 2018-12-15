import React, { Component } from 'react';
import './App.css';

import TrashBinRow from './components/TrashBinRow';

// eslint-disable-next-line
import GetData from './api/getData';


class App extends Component {
  constructor() {
    super();
    this.state = { trashbins: [] }
  }
  componentWillMount() {
    //var foo = []
    GetData().then(bins => {
      this.setState({trashbins: bins});
    });
    // console.log("trashbins: ",foo)
    // this.setState({trashbins: foo});
    //console.log("trashbins:",trashbins);
  }
  render() {
    let trashbins = this.state.trashbins

    // var stations = [
    //   {call:'station one',frequency:'000',id:'1'},
    //   {call:'station two',frequency:'001',id:'2'}
    // ];
    // stations.push({call:'station one',frequency:'000',id:'3'})
    var stations = []
    stations.push({test1:'123',test2:'234',test3:'345'})
    stations.push({test1:'345',test2:'456',test3:'678'})
    console.log("testarray: ", stations)
    console.log("trashbins: ", trashbins)
    console.log("test: ", trashbins[0])
    console.log("test2: ", stations[0])
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
                id={trashbin.id}
                owner={trashbin.owner}
                address={trashbin.address}
                bintype={trashbin.bintype}
                latestEvent={trashbin.latestEvent}
                status={trashbin.status} />
            )}


          </tbody>
        </table>
      </div>

    );
  }
}

export default App;
