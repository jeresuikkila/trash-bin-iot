import React, { Component } from 'react';
import TypeFilter from '../TypeFilter';
import './styles.css';
import hsylogo from '../../static/hsy-logo.png';
import StatusFilter from '../StatusFilter';

class Filter extends Component {
  render() {
    const {
      onTypeFilterChange,
      typeFilters,
      onStatusFilterChange,
      statusFilters,
    } = this.props;

    return (
        <div id="sidebar">
            <p className="sidebar-title">HSY SMART WASTE</p>
            <div className="white-background">
                <TypeFilter
                  onTypeFilterChange={ onTypeFilterChange }
                  typeFilters={ typeFilters }
                />
            </div>
            <div className="light-teal-rectangle" />
            <div className="dark-teal-rectangle">
                <StatusFilter
                  onStatusFilterChange={ onStatusFilterChange }
                  statusFilters={ statusFilters }
                />
            </div>
            <p className="location-status-title">LOCATION STATUS</p>
            <img src={ hsylogo } className="hsy-logo" alt="logo" />
        </div>
    );
  }
}

export default Filter;
