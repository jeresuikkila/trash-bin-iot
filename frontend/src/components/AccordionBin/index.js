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
    return trashbinFullOnOn
}

const AccordionBin = ({ trashbin, idx }) => {
  const background = (idx % 2 === 0) ? 'bin-section-dark' : 'bin-section-light'

  return (
      <div className={ background }>
            <p className='bin-title'>{`${ trashbin.wasteType.toUpperCase() } ${ idx }`}</p>
            
            <div className='sensor-info'>
                {
                    trashbin.sensors[0].state === 1 ? 
                    <p className="d-inline">
                        <span className="font-weight-bold">Sensor 1: </span>
                        Working
                    </p> : 
                    <p className="alert-text"><span className="alert-text-bold">Sensor 1: </span>Not working</p> 
                }
                <br/>
                {
                    trashbin.sensors[1].state === 1 ? 
                    <p className="d-inline">
                        <span className="font-weight-bold">Sensor 2: </span>
                        Working
                    </p> : 
                    <p className="alert-text"><span className="alert-text-bold">Sensor 1: </span>Not working</p> 
                }
            </div>

            <div className='pickup-info'>
                <p className="d-inline">
                    <span className="font-weight-bold">Last pickup date: </span>
                    {trashbin.sensors[1].lastEvent}
                </p>
                <br/>
                {
                    !trashbin.pickupOverdue ? 
                    <p className="d-inline">
                        <span className="font-weight-bold">Due pickup date: </span>
                        {trashbin.nextPickup}
                    </p> : 
                    <p className="alert-text">
                        <span className="alert-text-bold">Due pickup date: </span>
                        {trashbin.nextPickup}
                    </p> 
                }
            </div>
            <img src={getBinImage(trashbin)} className='trashbin-image'></img>
      </div>
  )
}

export default AccordionBin;
