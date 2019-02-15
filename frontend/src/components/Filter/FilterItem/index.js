import React from 'react';
import './styles.css'

const FilterItem = ({ item, handleChange, checked=false }) => (
    <div>
        <label key={ item.key } htmlFor={ item.key }>
            <p className="filter-item-title" key={ item.key }>
                {`${ item.name.toUpperCase() } `}
            </p>
            <img src="http://ma3radi.com/843-thickbox_default/plastic-trash-bin-240-l.jpg" className="filter-icon"></img>
            <br/>
            <span>
            <input className="filter-checkbox"
                name={item.name}
                type="checkbox"
                onChange={handleChange}
                checked={checked} />
            </span>
        </label>
    </div>
)

export default FilterItem;