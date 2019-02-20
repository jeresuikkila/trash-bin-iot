import React, { Component } from 'react';
import statusCheckboxes from '../../api/status-checkboxes.json'
import StatusFilterItem from './StatusFilterItem'
import './styles.css'

class StatusFilter extends Component {
  handleChange(event) {
    console.log(event)
  }

  render() {
    return (
        <div className="status-filter">
            { statusCheckboxes.map(item => (
                <StatusFilterItem
                  key={ item.key }
                  item={ item }
                  handleChange={ this.handleChange }
                  checked={ false }
                />
            ))
                }
        </div>
    )
  }
}

export default StatusFilter;
