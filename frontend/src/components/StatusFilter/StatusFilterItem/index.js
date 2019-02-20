import React from 'react';
import './styles.css';

const StatusFilterItem = ({ item, handleChange, checked = false }) => (
    <div>
        <input
          id={ item.name }  
          name={ item.name }
          type="checkbox"
          onChange={ handleChange }
          checked={ checked }
        />
        <label className="status-label" htmlFor= {item.name}>{item.name}</label>
    </div>
)

export default StatusFilterItem;
