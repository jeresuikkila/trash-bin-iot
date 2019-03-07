import React, { Component } from 'react';
import './styles.css';
import FilterContainer from '../FilterContainer'
import LocationView from '../LocationView'
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

    const overflowLocations = this.getOverflowLocations(locations);
    const overdueLocations = this.getOverdueLocations(locations);
    const noIssueLocations = this.getNoIssueLocations(locations);
    const oveflowMap = overflowLocations.map(a => a.id);
    const overdueMap = overdueLocations.map(a => a.id);
    const issueMap = noIssueLocations.map(a => a.id);

    if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
      return locations;
    }
    if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups')) {
      return locations.filter(a => this.arrUnion(oveflowMap, overdueMap).includes(a.id));
    }
    if (statusFilters.get('Trash overflows') && statusFilters.get('No issues')) {
      return locations.filter(a => this.arrUnion(oveflowMap, issueMap).includes(a.id));
    }
    if (statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
      return locations.filter(a => this.arrUnion(issueMap, overdueMap).includes(a.id));
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

  getOverdueLocations(locations) {
    return locations.filter(a => a.trashbins.filter(c => c.pickupOverdue === true).length !== 0 );
  }

  // Operate arrays using Set theory, https://en.wikipedia.org/wiki/Set_theory
  getNoIssueLocations(locations) {
    const origLocations = locations;
    const overdueLocations = this.getOverdueLocations(locations);
    const overflowLocations = this.getOverflowLocations(locations);
    const mapAll = origLocations.map(a => a.id);
    const mapOverdue = overdueLocations.map(a => a.id);
    const mapOverflow = overflowLocations.map(a => a.id);

    // i.e [1,2,3]-[1,2]=[3]
    function aMinusB(a, b) {
      return a.filter(
        c => b.indexOf(c) < 0,
      );
    }

    /*
    We assume that no issue locations should be locations that have no overdue nor overflow status,
    thus we remove the union of overflow and overdue ids from the list of all ids
    to get the ids with no issues.
      All-([Overdue]u[Overflow]) <-> [1,2,3,4,5]-([1,2]u[2,3]) = [4,5]
    */
    const noIssueIds = aMinusB(mapAll, (this.arrUnion(mapOverdue, mapOverflow)));

    return locations.filter(a => noIssueIds.includes(a.id));
  }

  getOverflowLocations(locations) {
    const overflowLocations = [];

    locations.forEach((loc, i) => {
      // const trashbins = loc.trashbins
      const { trashbins } = loc;

      trashbins.sort((a, b) => {
        if (a.wasteType < b.wasteType) { return -1; }
        if (a.wasteType > b.wasteType) { return 1; }
        return 0;
      })

      let currentWasteType = trashbins[ 0 ].wasteType;
      let binCounter = 0;
      let fullCounter = 0;

      trashbins.forEach((bin, j) => {
        if (currentWasteType !== bin.wasteType) {
          if (binCounter === fullCounter) {
            overflowLocations.push(locations[ i ])
          }
          binCounter = 0;
          fullCounter = 0;
        }

        currentWasteType = bin.wasteType
        if (bin.fillStatus === 100) fullCounter += 1;
        binCounter += 1;

        if (j === trashbins.length - 1 && binCounter === fullCounter) {
          overflowLocations.push(locations[ i ])
        }
      });
    })
    return overflowLocations;
  }

  getOverflowTypes(location) {
    const overflowTypes = [];
    // const trasbins = location.trashbins
    const { trashbins } = location;

    trashbins.sort((a, b) => {
      if (a.wasteType < b.wasteType) { return -1; }
      if (a.wasteType > b.wasteType) { return 1; }
      return 0;
    })

    let currentWasteType = trashbins[ 0 ].wasteType;
    let binCounter = 0;
    let fullCounter = 0;

    trashbins.forEach((bin, j) => {
      if (currentWasteType !== bin.wasteType) {
        if (binCounter === fullCounter) {
          overflowTypes.push(currentWasteType)
        }
        binCounter = 0;
        fullCounter = 0;
      }

      currentWasteType = bin.wasteType
      if (bin.fillStatus === 100) fullCounter += 1;
      binCounter += 1;

      if (j === trashbins.length - 1 && binCounter === fullCounter) {
        overflowTypes.push(currentWasteType)
      }
    });

    return overflowTypes;
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

  /*
  Helpervfunction to create unions of arrays using Set theory
  i.e [1,2,3]u[2,3,5] = [1,2,3,5]
  */
  arrUnion(a, b) {
    const obj = {};
    for (let i = a.length - 1; i >= 0; i -= 1) { obj[ a[ i ] ] = a[ i ]; }
    for (let j = b.length - 1; j >= 0; j -= 1) { obj[ b[ j ] ] = b[ j ]; }
    const res = []
    // for (const k in obj) {
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) { res.push(obj[ key ]); }
    })
    return res;
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
                  overflowLocations={ this.getOverflowLocations(aaltoLocations) }
                  toggleLocationView={ this.toggleLocationView }
                />
            </div>
        </div>
    );
  }
}

export default App;
