import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import TrashBinDetails from './components/TrashBinDetails';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = { selectedBin: null }
  }
  
  setBinSelected = bin =>
  this.setState({ selectedBin: bin })

  render() {
    return (
        <BrowserRouter>
        <div>
          <Route exact path='/' render={() => (
            <div className="App">
              <MainPage setBinSelected={this.setBinSelected} />
            </div>
          )}/>
          <Route path='/:id' render={() => (
            <div className="App">
               <TrashBinDetails
        trashbin={this.state.selectedBin}
        setBinSelected={this.setBinSelected}/>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
