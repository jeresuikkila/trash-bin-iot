import React, { Component } from 'react';
import Sidebar from 'react-sidebar'
import GoogleMaps from '../GoogleMaps'
import Filter from '../Filter'
import './style.css';

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
    const { sidebarDocked } = this.state;
    return (
        <div className="fluid-container">
            <Sidebar
              sidebar={ <Filter /> }
              docked={ sidebarDocked }
              styles={ { sidebar: { background: 'white', width: '400px' } } }
            >
                <div />
            </Sidebar>
            <div style={ styles }>
                <GoogleMaps />
            </div>
        </div>
    );
  }
}

export default App;
