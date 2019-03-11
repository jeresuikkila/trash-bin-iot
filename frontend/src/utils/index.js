/*
  Helper function to create unions of arrays using Set theory
  i.e [1,2,3]u[2,3,5] = [1,2,3,5]
  */
export function arrUnion(a, b) {
  const obj = {};
  for (let i = a.length - 1; i >= 0; i -= 1) { obj[ a[ i ] ] = a[ i ]; }
  for (let j = b.length - 1; j >= 0; j -= 1) { obj[ b[ j ] ] = b[ j ]; }
  const res = []
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { res.push(obj[ key ]); }
  })
  return res;
}

// Operate arrays using Set theory, https://en.wikipedia.org/wiki/Set_theory
export function getNoIssueLocations(locations) {
  const origLocations = locations;
  const overdueLocations = this.getOverdueLocations(locations);
  const overflowLocations = this.getOverflowLocations(locations);
  const allLocationIDs = origLocations.map(loc => loc.id);
  const overdueLocIDs = overdueLocations.map(loc => loc.id);
  const overflowLocIDs = overflowLocations.map(loc => loc.id);

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
  const noIssueIds = aMinusB(allLocationIDs, this.arrUnion(overdueLocIDs, overflowLocIDs));

  return locations.filter(loc => noIssueIds.includes(loc.id));
}

// finds locations which are flagged overduw in database
export function getOverdueLocations(loc) {
  return loc.filter(loc => loc.trashbins.filter(bin => bin.pickupOverdue === true).length !== 0);
}

export function getOverflowTypes(location) {
  const overflowTypes = [];
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

export function getOverflowLocations(locations) {
  const overflowLocations = [];

  locations.forEach((loc, i) => {
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

  const uniqueOverflowLocations = [ ...new Set(overflowLocations) ];
  return uniqueOverflowLocations;
}

export function getFilteredLocations(typeFilters, statusFilters, locWasteTypes, aaltoLocations) {
  const checkedFilters = new Map([ ...typeFilters ].filter(([ , value ]) => value === true));
  const typesToRender = [ ...checkedFilters.keys() ];
  const locations = [];
  locWasteTypes.forEach((loc, i) => {
    if (typesToRender.length === 0
      || typesToRender.filter(value => loc.indexOf(value) !== -1).length > 0) {
      locations.push(aaltoLocations[ i ])
    }
  })

  // filter additive functionality
  const overflowLocations = this.getOverflowLocations(locations);
  const overdueLocations = this.getOverdueLocations(locations);
  const noIssueLocations = this.getNoIssueLocations(locations);
  const overflowLocIDs = overflowLocations.map(loc => loc.id);
  const overdueLocIDs = overdueLocations.map(loc => loc.id);
  const noIssueLocIDs = noIssueLocations.map(loc => loc.id);

  if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
    return locations;
  }
  if (statusFilters.get('Trash overflows') && statusFilters.get('Late pickups')) {
    return locations.filter(loc => this.arrUnion(overflowLocIDs, overdueLocIDs).includes(loc.id));
  }
  if (statusFilters.get('Trash overflows') && statusFilters.get('No issues')) {
    return locations.filter(loc => this.arrUnion(overflowLocIDs, noIssueLocIDs).includes(loc.id));
  }
  if (statusFilters.get('Late pickups') && statusFilters.get('No issues')) {
    return locations.filter(loc => this.arrUnion(noIssueLocIDs, overdueLocIDs).includes(loc.id));
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
