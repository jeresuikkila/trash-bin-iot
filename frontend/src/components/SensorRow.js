import React from 'react';

const TrashBinRow = (props) => {
  return (
      <tr>
      <td>{props.sensor.id}</td>
      <td>{props.sensor.taglocation}</td>
      </tr>
  )
}

export default TrashBinRow;