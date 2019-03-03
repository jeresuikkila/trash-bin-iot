import React from 'react';
import TypeFilterItem from './TypeFilterItem';
import './styles.css';

const checkboxes = require('../../../api/type-checkboxes.json');

class TypeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    const { onTypeFilterChange } = this.props
    onTypeFilterChange(item, isChecked)
  }

  render() {
    const { typeFilters } = this.props;
    return (
        <div>
            <p className="filter-title">FILTER BY TYPE:</p>
            <div className="teal-rectangle">
                { checkboxes.map(item => (
                    <TypeFilterItem
                      key={ item.name }
                      item={ item }
                      handleChange={ this.handleChange }
                      checked={ typeFilters.get(item.name) }
                    />
                )) }
            </div>
        </div>
    );
  }
}

export default TypeFilter;
