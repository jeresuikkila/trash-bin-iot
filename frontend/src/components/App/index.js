import React, { Component } from 'react';
import './styles.css';
import FilterContainer from '../FilterContainer'
import GoogleMaps from '../GoogleMaps'

const aaltoLocations = require('../../api/aalto-with-trashbins.json')

const locationWasteTypes = aaltoLocations.map(
  loc => loc.trashbins,
).map(trashbin => trashbin.map(bin => bin.wasteType));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeFilters: new Map(),
      statusFilters: new Map(),
    };
    this.onTypeFilterChange = this.onTypeFilterChange.bind(this);
    this.onStatusFilterChange = this.onStatusFilterChange.bind(this);
  }

  onTypeFilterChange(item, isChecked) {
    this.setState(prevState => ({ typeFilters: prevState.typeFilters.set(item, isChecked) }));
  }

  onStatusFilterChange(item, isChecked) {
    this.setState(prevState => ({ statusFilters: prevState.statusFilters.set(item, isChecked) }));
  }

  getFilteredLocations(filters) {
    const checkedFilters = new Map([ ...filters ].filter(([ , value ]) => value === true));
    const typesToRender = [ ...checkedFilters.keys() ];
    const locations = [];
    locationWasteTypes.forEach((loc, i) => {
      if (typesToRender.length === 0
        || typesToRender.filter(value => loc.indexOf(value) !== -1).length > 0) {
        locations.push(aaltoLocations[ i ])
      }
    })
    return locations;
  }

  render() {
    const { typeFilters, statusFilters } = this.state;
    return (
        <div className="fluid-container">
            <FilterContainer
              onTypeFilterChange={ this.onTypeFilterChange }
              typeFilters={ typeFilters }
              onStatusFilterChange={ this.onStatusFilterChange }
              statusFilters={ statusFilters }
            />
            <div className="map">
                <GoogleMaps
                  locations={ this.getFilteredLocations(typeFilters) }
                />
            </div>
        </div>
    );
  }
}

export default App;
