import React from 'react';
import AccordionItem from '../AccordionItem';
import './styles.css';

const Accordion = ({ location }) => {
  let wasteTypes = location.trashbins.map(bin => bin.wasteType);
  wasteTypes = [ ...new Set(wasteTypes) ];

  const trashbinsByType = new Map();

  wasteTypes.forEach((type) => {
    const trashbins = location.trashbins.filter(bin => bin.wasteType === type)
    console.log(trashbins)
    trashbinsByType.set(type, trashbins)
  });

  return (
      <div className="accordion" id={ `accordion${ location.id }` }>
          {
            wasteTypes.map( type => (
                <AccordionItem
                  type={ type }
                  trashbins={ trashbinsByType.get(type) }
                  locationId={ location.id }
                  key={ trashbinsByType.get(type)[ 0 ].id }
                />
            ))
        }
      </div>
  )
}

export default Accordion;
