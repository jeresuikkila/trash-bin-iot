
import React from 'react';
import AccordionTitle from '../AccordionTitle';


const Accordion = ({location}) => {
    
    let wasteTypes = location.trashbins.map(bin => bin.wasteType);
    wasteTypes = [...new Set(wasteTypes)];

    let trashbinsByType = new Map();

    wasteTypes.forEach(type => {
        const trashbins = location.trashbins.filter(bin => bin.wasteType === type)
        console.log(trashbins)
        trashbinsByType.set(type, trashbins)        
    });

    return (
    <div className="accordion" id="accordionExample">
        {
            wasteTypes.map( type =>(
                <div className="card">
                    <AccordionTitle 
                        type={type}
                        trashbins={trashbinsByType.get({type})}
                    />
                </div>
            ))
        }
    </div>
    )
}

export default Accordion;