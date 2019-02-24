import React from 'react';
import './styles.css';

const StatusFilterItem = ({ item, handleChange, checked = false }) => (
    <div>
        <label className="status-filter-item" htmlFor={ item.name }>
            <input
              id={ item.name }
              name={ item.name }
              type="checkbox"
              onChange={ handleChange }
              checked={ checked }
            />
            <label htmlFor={ item.name }>
                {/* fix eslint */}
                <input type="hidden" />
            </label>
            <span className="status-filter-item-name">
                { item.name }
            </span>
        </label>
    </div>
)

export default StatusFilterItem;
