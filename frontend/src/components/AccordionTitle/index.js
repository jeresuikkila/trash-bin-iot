import React from 'react';

const AccordionTitle = ({trashbins, type}) => {

    return(
        <div>
            <div className="card-header" id={type+'-heading'} data-toggle="collapse" data-target={type} aria-expanded="false" aria-controls="collapseOne">
                <p>{type}</p>
            </div>
            <div id={type} className="collapse" aria-labelledby={type+'-heading'} data-parent="#accordionExample">
                <div className="card-body">
                    ad squid. 3 wolf moon officia aute
                </div>
            </div>
        </div>    
    )
}

export default AccordionTitle;