import React from 'react';
import './styles.css';
import trashbinOkOnOn from '../../static/trashbin-closed-green-green.png';
import trashbinOkOnOff from '../../static/trashbin-closed-green-red.png';
import trashbinOkOffOn from '../../static/trashbin-closed-red-green.png';
import trashbinOkOffOff from '../../static/trashbin-closed-red-red.png';
import trashbinFullOnOn from '../../static/trashbin-open-green-green.png';
import trashbinFullOnOff from '../../static/trashbin-open-green-red.png';
import trashbinFullOffOn from '../../static/trashbin-open-red-green.png';
import trashbinFullOffOff from '../../static/trashbin-open-red-red.png';

const getBinImage = (bin) => {
    return trashbinFullOffOff
}

const AccordionBin = ({ trashbin, idx }) => {
  const background = (idx % 2 === 0) ? 'bin-section-dark' : 'bin-section-light'

  return (
      <div className={ background }>
            <p className='bin-title'>{`${ trashbin.wasteType } ${ idx }`}</p>
            <img src={getBinImage(trashbin)} className='trashbin-image'></img>
      </div>
  )
}

export default AccordionBin;
