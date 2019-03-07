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
    if(this.state.statusFilters.get("Late pickups")) {
      return this.getOverdueLocations(locations);
    } else if(this.state.statusFilters.get("No issues")){
      return this.getNoIssueLocations(locations);
    } else return locations;
  }

  getOverdueLocations(locations) {
    return locations.filter(a => a.trashbins.filter(c => c.pickupOverdue === true).length !== 0 );
  }
  
  getOverflowLocations(locations) {
    return this.getOverdueLocations(locations);
  }
  
  getNoIssueLocations(locations) {
    const orig_locations = locations;
    const overdue_locations = this.getOverdueLocations(locations);
    const ovrtflow_locations = this.getOverflowLocations(locations);
    const m_all = orig_locations.map(a => a.id);
    const m_overdue = overdue_locations.map(a => a.id);
    const m_overflow = ovrtflow_locations.map(a => a.id);

    function aMinusB(a, b) {
      return a.filter( 
        function(c) {
          return b.indexOf(c) < 0;
        }
      );
    }

    function arrUnion(a, b) {
      var obj = {};
      for (var i = a.length-1; i >= 0; -- i)
        obj[a[i]] = a[i];
      for (var j = b.length-1; j >= 0; -- j)
        obj[b[j]] = b[j];
      var res = []
      for (var c in obj) {
        if (obj.hasOwnProperty(c))
          res.push(obj[c]);
      }
      return res;
    }
    
    const noIssueIds = aMinusB(m_all,(arrUnion(m_overdue,m_overflow)));
    
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
