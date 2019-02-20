import React, { Component } from 'react';
import Filter from '../Filter';
import './styles.css';
import hsylogo from '../../static/hsy-logo.png';
import StatusFilter from '../StatusFilter';

class HSYSidebar extends Component {
  render() {
    const { onFilterChange, filters } = this.props;
    return (
        <div id="sidebar">
            <p className="sidebar-title">HSY SMART WASTE</p>
            <div className="white-background">
                <Filter
                  onFilterChange={ onFilterChange }
                  filters={ filters }
                />
            </div>
            <div className="light-teal-rectangle" />
            <div className="dark-teal-rectangle">
              <StatusFilter/>
            </div>
            <p className="location-status-title">LOCATION STATUS</p>
            <img src={ hsylogo } className="hsy-logo" alt="logo" />
        </div>
    );
  }
}

export default HSYSidebar;
