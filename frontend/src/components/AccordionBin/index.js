import React from 'react';

const AccordionBin = ({trashbin, idx}) => {

    const background = (idx % 2 === 0) ? "bin-section-light" : "bin-section-dark"

    return(
        <div className={background}>
            <p>{trashbin.wasteType + " " + idx}</p>
        </div>
    )
}


export default AccordionBin;