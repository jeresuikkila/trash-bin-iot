import React, { Component } from 'react';
import './style.css';
import HSYSidebar from '../HSYSidebar'
import GoogleMaps from '../GoogleMaps'

const styles = {
  width: '100%',
  height: '100vh',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filters: new Map() };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(item, isChecked) {
    this.setState(prevState => ({ filters: prevState.filters.set(item, isChecked) }));
  }

  render() {
    const { filters } = this.state;
    return (
        <div className="fluid-container">
            <HSYSidebar
              onFilterChange={ this.onFilterChange }
              filters={ filters }
            />
            <div style={ styles }>
                <GoogleMaps
                  filters={ filters }
                />
            </div>
        </div>
    );
  }
}

export default App;
