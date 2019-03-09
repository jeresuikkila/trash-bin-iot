import React, { Component } from 'react';
import './styles.css';
import FilterContainer from '../FilterContainer'
import LocationView from '../LocationView'
import GoogleMaps from '../GoogleMaps'
import * as statusLogic from '../StatusFilterLogic'

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

  getFilteredLocations(filters) {
    const { statusFilters } = this.state;
    const checkedFilters = new Map([ ...filters ].filter(([ , value ]) => value === true));
    const typesToRender = [ ...checkedFilters.keys() ];
    const locations = [];
    locationWasteTypes.forEach((loc, i) => {
      if (typesToRender.length === 0
        || typesToRender.filter(value => loc.indexOf(value) !== -1).length > 0) {
        locations.push(aaltoLocations[ i ])
      }
    })

    // filter additive functionality
    const overflowLocations = statusLogic.getOverflowLocations(locations);
    const overdueLocations = statusLogic.getOverdueLocations(locations);
    const noIssueLocations = statusLogic.getNoIssueLocations(locations);
    const oveflowMap = overflowLocations.map(a => a.id);
    const overdueMap = overdueLocations.map(a => a.id);
    const issueMap = noIssueLocations.map(a => a.id);

    if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
      return locations;
    }
    if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups')) {
      return locations.filter(a => statusLogic.arrUnion(oveflowMap, overdueMap).includes(a.id));
    }
    if (statusFilters.get('Trash overflows') && statusFilters.get('No issues')) {
      return locations.filter(a => statusLogic.arrUnion(oveflowMap, issueMap).includes(a.id));
    }
    if (statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
      return locations.filter(a => statusLogic.arrUnion(issueMap, overdueMap).includes(a.id));
    }
    if (statusFilters.get('Trash overflows')) {
      return overflowLocations;
    }
    if (statusFilters.get('Late pickups')) {
      return overdueLocations;
    }
    if (statusFilters.get('No issues')) {
      return noIssueLocations;
    }
    return locations;
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
    const { typeFilters } = this.state;

    return (
        <div className="fluid-container">
            {this.getSidebarView()}
            <div className="map">
                <GoogleMaps
                  locations={ this.getFilteredLocations(typeFilters) }
                  overflowLocations={ statusLogic.getOverflowLocations(aaltoLocations) }
                  toggleLocationView={ this.toggleLocationView }
                />
            </div>
        </div>
    );
  }
}

export default App;
