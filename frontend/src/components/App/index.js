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

  getTypeFilteredLocations(filters) {
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


  getOverflowLocations() {
    let overflowLocations = [];

    aaltoLocations.forEach((loc, i) => {

      let trashbins = loc.trashbins;

      trashbins.sort(function(a,b){
        if(a.wasteType < b.wasteType) { return -1; }
        if(a.wasteType > b.wasteType) { return 1; }
        return 0;
      })

      console.log(loc.id);
      console.log(trashbins)

      let currentWasteType = trashbins[0].wasteType;
      let binCounter = 0;
      let fullCounter = 0;

      trashbins.forEach(bin => {
      if (currentWasteType !== bin.wasteType) {
        
        if (binCounter === fullCounter) {
          overflowLocations.push(aaltoLocations[ i ])
          console.log(currentWasteType)
        }

        binCounter = 0;
        fullCounter = 0;
      }

      currentWasteType = bin.wasteType
      if (bin.fillStatus === 100) fullCounter += 1;
      binCounter += 1;

      });
        
      
    })
    console.log('overflowLocations:')
    console.log(overflowLocations);
    return overflowLocations;
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
                  locations={ this.getTypeFilteredLocations(typeFilters) }
                  overflowLocations = { this.getOverflowLocations() }
                />
            </div>
        </div>
    );
  }
}

export default App;
