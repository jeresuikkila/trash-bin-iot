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
    if (statusFilters.get('Late pickups')) {
      return this.getOverdueLocations(locations);
    } if (statusFilters.get('No issues')) {
      return this.getNoIssueLocations(locations);
    } return locations;
  }

  getOverdueLocations(locations) {
    return locations.filter(a => a.trashbins.filter(c => c.pickupOverdue === true).length !== 0 );
  }

  getOverflowLocations(locations) {
    return this.getOverdueLocations(locations);
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

    // i.e [1,2,3]u[2,3,5] = [1,2,3,5]
    function arrUnion(a, b) {
      const obj = {};
      for (let i = a.length - 1; i >= 0; i -= 1) { obj[ a[ i ] ] = a[ i ]; }
      for (let j = b.length - 1; j >= 0; j -= 1) { obj[ b[ j ] ] = b[ j ]; }
      const res = []
      for (const k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) { res.push(obj[ k ]); }
      }
      return res;
    }

    /*
    We assume that no issue locations should be locations that have no overdue nor overflow status,
    thus we remove the union of overflow and overdue ids from the list of all ids
    to get the ids with no issues.
      All-([Overdue]u[Overflow]) <-> [1,2,3,4,5]-([1,2]u[2,3]) = [4,5]
    */
    const noIssueIds = aMinusB(mapAll, (arrUnion(mapOverdue, mapOverflow)));

    return locations.filter(a => noIssueIds.includes(a.id));
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
