import React, { Component } from 'react';
import './styles.css';
import FilterContainer from '../FilterContainer'
import LocationView from '../LocationView'
import GoogleMaps from '../GoogleMaps'
import * as utils from '../../utils'

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
      currentLocationId: null,
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

  getSidebarView() {
    const {
      showLocationView, typeFilters, statusFilters, currentLocationId,
    } = this.state
    return showLocationView
      ? (
          <LocationView
            toggleLocationView={ this.toggleLocationView }
            location={ aaltoLocations.filter(loc => loc.id === currentLocationId)[ 0 ] }
          />
      )
      : (
          <FilterContainer
            onTypeFilterChange={ this.onTypeFilterChange }
            typeFilters={ typeFilters }
            onStatusFilterChange={ this.onStatusFilterChange }
            statusFilters={ statusFilters }
          />
      )
  }

  /* When marker is clicked, location view is shown. When same marker is clicked again
    location view is closed.
    When location view is shown and another marker is clicked, location view remains visible.
    If this another marker is clicked again, location view is closed
  */
  toggleLocationView(id) {
    const { showLocationView, currentLocationId } = this.state;
    if (!showLocationView || currentLocationId === id) {
      this.setState({ showLocationView: !showLocationView, currentLocationId: id })
    }
    if (showLocationView && currentLocationId !== id) {
      this.setState({ currentLocationId: id })
    }
  }

  render() {
    const { typeFilters, statusFilters } = this.state;

    return (
        <div className="fluid-container">
            {this.getSidebarView()}
            <div className="map">
                <GoogleMaps
                  toggleLocationView={ this.toggleLocationView }
                  locations={ utils.getFilteredLocations(typeFilters, statusFilters,
                    locationWasteTypes, aaltoLocations) }
                />
            </div>
        </div>
    );
  }
}

export default App;
