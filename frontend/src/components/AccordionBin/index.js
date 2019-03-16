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
import alert from '../../static/alert.png';

const getBinImage = (bin) => {

    const topSensorOk = bin.sensors[0].state;
    const bottomSensorOk = bin.sensors[1].state;
    const fillStatus = bin.fillStatus;

    if(fillStatus === 100) {
        if(topSensorOk && bottomSensorOk) return trashbinFullOnOn;
        if(topSensorOk && !bottomSensorOk) return trashbinFullOnOff;
        if(!topSensorOk && bottomSensorOk) return trashbinFullOffOn;
        if(!topSensorOk && !bottomSensorOk) return trashbinFullOffOff;
    }
    else{
        if(topSensorOk && bottomSensorOk) return trashbinOkOnOn;
        if(topSensorOk && !bottomSensorOk) return trashbinOkOnOff;
        if(!topSensorOk && bottomSensorOk) return trashbinOkOffOn;
        if(!topSensorOk && !bottomSensorOk) return trashbinOkOffOff;
    }
}

const AccordionBin = ({ trashbin, idx, overflowTypes, type }) => {
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
            <img src={getBinImage(trashbin)} className='trashbin-image' alt="bin" />
            {overflowTypes.includes(type) && <img src={ alert } className="bin-alert" alt="alert" />}
      </div>
  )
}

export default AccordionBin;
