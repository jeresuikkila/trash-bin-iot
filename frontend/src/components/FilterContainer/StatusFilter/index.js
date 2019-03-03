import React, { Component } from 'react';
import statusCheckboxes from '../../../api/status-checkboxes.json'
import StatusFilterItem from './StatusFilterItem'
import './styles.css'

class StatusFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    const { onStatusFilterChange } = this.props;

    onStatusFilterChange(item, isChecked);
  }

  render() {
    const { statusFilters } = this.props;

    return (
        <div>
            <div className="status-filter">
                { statusCheckboxes.map(item => (
                    <StatusFilterItem
                      key={ item.key }
                      item={ item }
                      handleChange={ this.handleChange }
                      checked={ statusFilters.get(item.name) }
                    />
                ))
                  }
            </div>
        </div>
    )
  }
}

export default StatusFilter;
