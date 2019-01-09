import React, { Component } from 'react';
//import './MainPage.css';

import TrashBinRow from './TrashBinRow';
//import './CSS/TrashBinRow.css'

// eslint-disable-next-line
import GetTrashbinData from '../api/getTrashbinData';

import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom';

class MainPage extends Component {
  history = createBrowserHistory();
  constructor(props) {
    super(props);
    this.state = { trashbins: [], binid: 0 }
    this.handleClick = this.handleClick.bind(this);

  }

  async componentDidMount() {
    this.setState({ trashbins: await GetTrashbinData() })
  }

  handleClick = (id) => {
    console.log("lul: ", id);
    this.history.push('/' + id);
    this.setState({ binid: id })
  }

  render() {
    if (this.state.binid !== 0) {
      return <Redirect to={'/' + this.state.binid} />
    }
    let trashbins = this.state.trashbins
    return (
      <div className="container">
        <h1 style={{ 'font-size': '50px' }}>Trash Bin IoT</h1>
        <h2 style={{ 'font-size': '40px' }}>Trash bins</h2>
        <table className="table table-hover" >
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
                clickhandler={this.handleClick}
                bin={trashbin}
                setBinSelected={this.props.setBinSelected} />
            )}
          </tbody>
        </table>
      </div>

    )
  }
}

export default MainPage;