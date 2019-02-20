import React from 'react';

const StatusFilterItem = ({ item, handleChange, checked = false}) => (
    <div>
        <input
        name={item.name}
        type="checkbox"
        onChange={ handleChange}
        checked={ checked } 
        />
        {item.name}
    </div>
)

export default StatusFilterItem;