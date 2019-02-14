import React, { Component } from 'react';
import './style.css';
import HSYSidebar from '../HSYSidebar'
import GoogleMaps from '../GoogleMaps'

const styles = {
  width: '100%',
  height: '100vh',
}

const aaltoLocations = require('../../api/aalto-with-trashbins.json')

let locationWasteTypes = aaltoLocations.map(
  loc => loc.trashbins,
).map(trashbin => trashbin.map(bin => bin.wasteType));
locationWasteTypes = locationWasteTypes.map(loc => [ ...new Set(loc) ]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filters: new Map() };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(item, isChecked) {
    this.setState(prevState => ({ filters: prevState.filters.set(item, isChecked) }));
  }

  getFilteredLocations(filters) {
    const checkedFilters = new Map([ ...filters ].filter(([ , value ]) => value === true));
    const typesToRender = [ ...checkedFilters.keys() ];
    const locationIndices = [];
    locationWasteTypes.forEach((loc, i) => {
      let counter = 0;
      loc.forEach((type) => {
        if (typesToRender.includes(type)) counter += 1;
      })
      if (counter >= typesToRender.length) locationIndices.push(i)
    })
    const locations = locationIndices.map(i => aaltoLocations[ i ]);
    return locations;
  }

  render() {
    const { filters } = this.state;
    console.log(this.getFilteredLocations(filters))
    return (
        <div className="fluid-container">
            <HSYSidebar
              onFilterChange={ this.onFilterChange }
              filters={ filters }
            />
            <div style={ styles }>
                <GoogleMaps
                  locations={ this.getFilteredLocations(filters) }
                />
            </div>
        </div>
    );
  }
}

export default App;
