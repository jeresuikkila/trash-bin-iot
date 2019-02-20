import React, { Component } from 'react';
import statusCheckboxes from '../../api/status-checkboxes.json'
import StatusFilterItem from './StatusFilterItem'
import './styles.css'

class StatusFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedItems: new Map() }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    const { checkedItems } = this.state;
    console.log(checkedItems);

    return (
        <div className="status-filter">
            { statusCheckboxes.map(item => (
                <StatusFilterItem
                  key={ item.key }
                  item={ item }
                  handleChange={ this.handleChange }
                  checked={ checkedItems.get(item.name) }
                />
            ))
                }
        </div>
    )
  }
}

export default StatusFilter;
