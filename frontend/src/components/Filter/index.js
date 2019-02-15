import React from 'react';
import FilterItem from './FilterItem';
import './styles.css';

const checkboxes = require('../../api/checkboxes.json');

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event);
    const item = event.target.name;
    const isChecked = event.target.checked;
    const { onFilterChange } = this.props
    onFilterChange(item, isChecked)
  }

  render() {
    const { filters } = this.props;
    return (
      <div>
        <p className="filter-title">FILTER BY TYPE:</p>
          <div className="teal-rectangle">
              { checkboxes.map(item => (
                 <FilterItem
                    key={item.name}
                    item={item}
                    handleChange={this.handleChange}
                    checked={filters.get(item.name)} />
                )) }
          </div>
        </div>
    );
  }
}

export default Filter;
