import React, { Component } from 'react';
import Filter from '../Filter';
import './styles.css';
import hsylogo from '../../static/hsy-logo.png';


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
            <div className="light-teal-rectangle"></div>
            <div className="dark-teal-rectangle"></div>
            <p className="location-status-title">LOCATION STATUS</p>
            <img src={ hsylogo } className="hsy-logo"></img>
        </div>
    );
  }
}

export default HSYSidebar;
