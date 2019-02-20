import React from 'react';
import './styles.css';

const StatusFilterItem = ({ item, handleChange, checked = false }) => (
    <div className="status-filter-item">
        <input
          name={ item.name }
          type="checkbox"
          onChange={ handleChange }
          checked={ checked }
        />
        {item.name}
    </div>
)

export default StatusFilterItem;
