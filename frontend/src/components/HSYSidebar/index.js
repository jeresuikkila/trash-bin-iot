import React, { Component } from 'react';
import Filter from '../Filter';
import './styles.css'

class HSYSidebar extends Component {
  render() {
    const { onFilterChange, filters } = this.props;
    return (
        <div id="sidebar">
            <p className="title">HSY SMART WASTE</p>
            <div className="white-background">
                <Filter
                  onFilterChange={ onFilterChange }
                  filters={ filters }
                />
            </div>
        </div>
    );
  }
}

export default HSYSidebar;
