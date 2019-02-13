import React from 'react';
import Checkbox from './Checkbox';

const checkboxes = require('../../api/checkboxes_fi.json');

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    const { onFilterChange } = this.props
    onFilterChange(item, isChecked)
  }

  render() {
    const { filters } = this.props;
    return (
        <React.Fragment>
            {
              checkboxes.map(item => (
                  <p key={ item.key }>
                      <label key={ item.key } htmlFor={ item.key }>
                          {`${ item.name } `}
                          <Checkbox
                            id={ item.key }
                            name={ item.name }
                            checked={ filters.get(item.name) }
                            onChange={ this.handleChange }
                          />
                      </label>
                  </p>
              ))
            }
        </React.Fragment>
    );
  }
}

export default Filter;
