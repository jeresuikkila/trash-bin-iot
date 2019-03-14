import React from 'react';

const AccordionTitle = ({trashbins, type}) => {

    return(
        <div className="card">
            <div className="card-header" id={type+'-heading'} data-toggle="collapse" data-target={'#'+type} aria-expanded="false" aria-controls={type}>
                <p>{type}</p>
            </div>
            <div id={type} className="collapse" aria-labelledby={type+'-heading'} data-parent="#accordionExample">
                <div className="card-body">
                    {
                        trashbins.map(bin => (
                            <p>{bin.wasteType}</p>
                        ))
                    }
                </div>
            </div>
        </div>    
    )
}

export default AccordionTitle;