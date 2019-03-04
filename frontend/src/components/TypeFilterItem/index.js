import React from 'react';
import './styles.css'
import biowaste from '../../static/biowaste.png';
import carton from '../../static/carton.png';
import metal from '../../static/metal.png';
import general from '../../static/general.png';
import glass from '../../static/glass.png';
import plastic from '../../static/plastic.png'

const imageMap = {
  'biowaste.png': biowaste,
  'carton.png': carton,
  'metal.png': metal,
  'general.png': general,
  'glass.png': glass,
  'plastic.png': plastic
}

const TypeFilterItem = ({ item, handleChange, checked = false }) => (
    <div style={ { textAlign: 'center' } }>
        <label className="filter-item-title" key={ item.key } htmlFor={ item.name }>
            <span className="trash-type-title">{ item.name.toUpperCase() }</span>
            <br />
            <img src={ imageMap[ item.img ] } className="filter-icon" alt="filter" />
            <br />
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
        </label>
    </div>
)

export default TypeFilterItem;
