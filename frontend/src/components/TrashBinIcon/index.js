import React from 'react'
import './styles.css'
import trashbinOk from '../../static/trashbin-white.png';
import trashbinFull from '../../static/trashbin-orange.png';

const TrashBinIcon = ({ trashbins, status }) => {
  const numberOfBins = status === 'full' ? trashbins.filter(bin => bin.fillStatus === 100).length
    : trashbins.filter(bin => bin.fillStatus !== 100).length
  const binStatus = status === 'full' ? 'bin-full' : 'bin-ok'
  const numberStatus = status === 'full' ? 'number-full' : 'number-ok'
  const binImage = status === 'full' ? trashbinFull : trashbinOk

  return (
      <div className="trash-bin-icon-container">
          <img src={ binImage } className={ `trashbin-icon ${ binStatus }` } alt="trash-icon" />
          <div className={ `number-text ${ numberStatus }` }>{numberOfBins}</div>
      </div>
  )
}

export default TrashBinIcon;
