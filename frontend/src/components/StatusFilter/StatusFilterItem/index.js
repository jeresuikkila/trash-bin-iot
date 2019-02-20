import React from 'react';
import './styles.css';

const StatusFilterItem = ({ item, handleChange, checked = false }) => (
    <div>
        <label className="status-label" htmlFor={ item.name }>
            <input
              id={ item.name }
              name={ item.name }
              type="checkbox"
              onChange={ handleChange }
              checked={ checked }
            />
        </label>

    </div>
)

export default StatusFilterItem;
