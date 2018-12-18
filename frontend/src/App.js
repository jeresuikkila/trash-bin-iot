import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import TrashBinDetails from './components/TrashBinDetails'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedBin: null }
  }

  setBinSelected = bin =>
    this.setState({ selectedBin: bin })

  render() {
    return this.state.selectedBin === null ?
      <MainPage setBinSelected={this.setBinSelected} /> :
      <TrashBinDetails
        trashbin={this.state.selectedBin}
        setBinSelected={this.setBinSelected}/>

  }
}

export default App;
