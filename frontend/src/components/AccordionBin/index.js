import React from 'react';
import SensorInfo from '../SensorInfo';
import PickupInfo from '../PickupInfo';
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
  const topSensorOk = bin.sensors[ 0 ].state;
  const bottomSensorOk = bin.sensors[ 1 ].state;
  const { fillStatus } = bin;

  if (fillStatus === 100) {
    if (topSensorOk && bottomSensorOk) return trashbinFullOnOn;
    if (topSensorOk && !bottomSensorOk) return trashbinFullOnOff;
    if (!topSensorOk && bottomSensorOk) return trashbinFullOffOn;
    if (!topSensorOk && !bottomSensorOk) return trashbinFullOffOff;
  } else {
    if (topSensorOk && bottomSensorOk) return trashbinOkOnOn;
    if (topSensorOk && !bottomSensorOk) return trashbinOkOnOff;
    if (!topSensorOk && bottomSensorOk) return trashbinOkOffOn;
    if (!topSensorOk && !bottomSensorOk) return trashbinOkOffOff;
  }
  return trashbinOkOnOn;
}

const AccordionBin = ({
  trashbin, idx, overflowTypes, type,
}) => {
  const background = (idx % 2 === 0) ? 'bin-section dark' : 'bin-section light'

  return (
      <div className={ `${ background } accordion-bin-text-style` }>
          <p className="bin-title bold">{`${ trashbin.wasteType.toUpperCase() } ${ idx }`}</p>
          <div className="sensor-info">
              {trashbin.sensors.map((sensor, idx) => (
                  <SensorInfo
                    sensor={ sensor }
                    idx={ idx + 1 }
                    key={ sensor.id }
                  />
              ))}
          </div>
          <PickupInfo trashbin={ trashbin } />
          <img src={ getBinImage(trashbin) } className="trashbin-image" alt="bin" />
          {overflowTypes.includes(type) && <img src={ alert } className="bin-alert" alt="alert" />}
      </div>
  )
}

export default AccordionBin;
