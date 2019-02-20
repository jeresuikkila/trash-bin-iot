import React from 'react';
import './styles.css'
import biowaste from '../../../static/biowaste.png';
import carton from '../../../static/carton.png';
import paper from '../../../static/paper.png';
import general from '../../../static/general.png';
import hazardous from '../../../static/hazardous.png';
import textiles from '../../../static/textiles.png';
import battery from '../../../static/battery.png';
import glass from '../../../static/glass.png';

const imageMap = {
  'biowaste.png': biowaste,
  'carton.png': carton,
  'paper.png': paper,
  'general.png': general,
  'hazardous.png': hazardous,
  'textiles.png': textiles,
  'battery.png': battery,
  'glass.png': glass,
}

const TypeFilterItem = ({ item, handleChange, checked = false }) => (
    <div style={ { textAlign: 'center' } }>
        <label key={ item.key } htmlFor={ item.key }>
            <p className="filter-item-title" key={ item.key }>
                {`${ item.name.toUpperCase() } `}
            </p>
            <img src={ imageMap[ item.img ] } className="filter-icon" alt="filter" />
            <br />
            <input
              id={ item.name }  
              name={ item.name }
              type="checkbox"
              onChange={ handleChange }
              checked={ checked }
            />
            <label htmlFor= {item.name} />
        </label>
    </div>
)

export default TypeFilterItem;
