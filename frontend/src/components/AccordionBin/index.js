import React from 'react';
import './styles.css';
import trashbinWhite from '../../static/trash-can-white.png';
import trashbinOrange from '../../static/trash-can-orange.png';

const AccordionBin = ({ trashbin, idx }) => {
  const background = (idx % 2 === 0) ? 'bin-section-dark' : 'bin-section-light'

  return (
      <div className={ background }>
          <p>{`${ trashbin.wasteType } ${ idx }`}</p>
      </div>
  )
}

export default AccordionBin;
