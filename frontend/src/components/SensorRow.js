import React from 'react';

const TrashBinRow = (props) => {
  return (
      <tr>
      <td>{props.sensor.id}</td>
      <td>{props.sensor.position}</td>
      <td>{props.sensor.battery}</td>
      </tr>
  )
}

export default TrashBinRow;