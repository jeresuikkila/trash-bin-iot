import React from 'react'

const SensorInfo = ({ sensor, idx }) => (
    <div>
        {
        (sensor.state === 1) ? (
            <p className="d-inline">
                <span className="bold">{`Sensor ${ idx }: `}</span>
                Working
            </p>
        ) : (
            <p className="alert-text">
                <span className="alert-text bold">{`Sensor ${ idx }: `}</span>
                Not working
            </p>
        )}
    </div>
)

export default SensorInfo;
