import React from 'react'
import './styles.css'

const PickupInfo = ({ trashbin }) => (
    <div className="pickup-info">
        <p className="d-inline">
            <span className="bold">Last pickup date: </span>
            {trashbin.sensors[ 1 ].lastEvent}
        </p>
        <br />
        {
        (!trashbin.pickupOverdue) ? (
            <p className="d-inline">
                <span className="bold">Due pickup date: </span>
                {trashbin.nextPickup}
            </p>
        ) : (
            <p className="alert-text">
                <span className="alert-text bold">Due pickup date: </span>
                {trashbin.nextPickup}
            </p>
        )
        }
    </div>
)

export default PickupInfo;
