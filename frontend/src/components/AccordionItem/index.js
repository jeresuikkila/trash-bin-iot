import React from 'react';
import AccordionBin from '../AccordionBin';

const AccordionItem = ({trashbins, type, locationId}) => {
    
    return(
        <div className="card">
            <div className="card-header" id={type+locationId+'-heading'} data-toggle="collapse" data-target={'#'+type+locationId} aria-expanded="false" aria-controls={type+locationId}>
                <p>{type}</p>
            </div>
            <div id={type+locationId} className="collapse" aria-labelledby={type+locationId+'-heading'} data-parent={"#accordion"+locationId}>
                <div className="card-body">
                    {
                        trashbins.map( bin => (
                            <p key={bin.id}> {bin.wasteType}</p>
                        ))
                    }
                </div>
            </div>
        </div>    
    )
}

export default AccordionItem;