import React, { Component } from 'react';
import './App.css';
import Sidebar from 'react-sidebar'
import GoogleMaps from './GoogleMaps'

const styles = {
  width: '100%',
  height: '100vh',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
    };
  }

  render() {
    return (
        <div className="fluid-container">
            <Sidebar
              sidebar={ <button type="button" className="btn btn-light">Clearly Bootstrap</button> }
              docked={ this.state.sidebarDocked }
              styles={ { sidebar: { background: 'white', width: '400px' } } }
            />
            <div style={ styles }>
                <GoogleMaps />
            </div>
        </div>
    );
  }
}

export default App;
