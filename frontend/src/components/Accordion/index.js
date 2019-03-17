import React from 'react';
import AccordionItem from '../AccordionItem';
import './styles.css';
import { getOverflowTypes } from '../../utils'

const Accordion = ({ location }) => {
  let wasteTypes = location.trashbins.map(bin => bin.wasteType);
  wasteTypes = [ ...new Set(wasteTypes) ];

  const trashbinsByType = new Map();

  wasteTypes.forEach((type) => {
    const trashbins = location.trashbins.filter(bin => bin.wasteType === type)
    trashbinsByType.set(type, trashbins)
  });

  const overflowTypes = getOverflowTypes(location);

  return (
      <div className="accordion" id={ `accordion${ location.id }` }>
          {
            wasteTypes.map( type => (
                <AccordionItem
                  type={ type }
                  trashbins={ trashbinsByType.get(type) }
                  locationId={ location.id }
                  overflowTypes={ overflowTypes }
                  key={ trashbinsByType.get(type)[ 0 ].id }
                />
            ))
        }
      </div>
  )
}

export default Accordion;
