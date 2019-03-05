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
      showLocationView: false,
      currentLocationId: null
    };
    this.onTypeFilterChange = this.onTypeFilterChange.bind(this);
    this.onStatusFilterChange = this.onStatusFilterChange.bind(this);
    this.toggleLocationView = this.toggleLocationView.bind(this);
  }

  onTypeFilterChange(item, isChecked) {
    this.setState(prevState => ({ typeFilters: prevState.typeFilters.set(item, isChecked) }));
  }

  onStatusFilterChange(item, isChecked) {
    this.setState(prevState => ({ statusFilters: prevState.statusFilters.set(item, isChecked) }));
  }

  toggleLocationView(id) {
    const {showLocationView, currentLocationId} = this.state;
    if (!showLocationView || currentLocationId === id) {
      this.setState({showLocationView: !showLocationView, currentLocationId: id})
    }
    console.log("Clicked location:", id)
    console.log("showLocationView:", this.state.showLocationView)
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

  getSidebarView() {
    const {showLocationView, typeFilters, statusFilters} = this.state
    if (!showLocationView) {
      return (
        <FilterContainer
              onTypeFilterChange={ this.onTypeFilterChange }
              typeFilters={ typeFilters }
              onStatusFilterChange={ this.onStatusFilterChange }
              statusFilters={ statusFilters }
            />
      )
    }
    else {
      return(
        <div>
          <h1>LOCATION VIEW</h1>
          <button className="btn btn-black" onClick={() => this.setState({showLocationView: !this.state.showLocationView})}></button>
        </div>
      )
    }
  }

  render() {
    const { typeFilters } = this.state;
    return (
        <div className="fluid-container">
            {this.getSidebarView()}
            <div className="map">
                <GoogleMaps
                  locations={ this.getFilteredLocations(typeFilters) }
                  toggleLocationView={this.toggleLocationView}
                />
            </div>
        </div>
    );
  }
}

export default App;
