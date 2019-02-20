import React, { Component } from 'react';
import './styles.css'
import statusCheckboxes from '../../api/status-checkboxes.json'
import StatusFilterItem from './StatusFilterItem'

class StatusFilter extends Component {

    handleChange(event) {
        console.log(event)
    }

    render() {
        return (
            <div>
                { statusCheckboxes.map(item => (
                    <StatusFilterItem
                    key={ item.key }
                    item={ item }
                    handleChange = {this.handleChange}
                    checked={false}
                    />
                ))
                }        
            </div>
        )
    }
}

export default StatusFilter;