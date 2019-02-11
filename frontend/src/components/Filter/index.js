import React from 'react';
import Checkbox from './Checkbox';

const checkboxes = require('../../api/checkboxes.json');

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ filters: prevState.filters.set(item, isChecked) }));
  }

  render() {
    const { filters } = this.state;
    return (
        <React.Fragment>
            {
              checkboxes.map(item => (
                  <p key={ item.key }>
                      <label key={ item.key } htmlFor={ item.key }>
                          {`${ item.name } `}
                          <Checkbox
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
