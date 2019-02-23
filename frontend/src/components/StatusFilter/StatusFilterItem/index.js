import React from 'react';
import './styles.css';

const StatusFilterItem = ({ item, handleChange, checked = false }) => (
    <div className="status-filter-item">
        <label htmlFor={ item.key }>
            <input
              id={ item.key }
              name={ item.name }
              type="checkbox"
              onChange={ handleChange }
              checked={ checked }
            />
            {item.name}
        </label>
    </div>
)

export default StatusFilterItem;
