import React from 'react';

const TrashBinRow = (props) => {
    return (
      <tr>
        <td>{props.id}</td>
        <td>{props.owner}</td>
        <td>{props.address}</td>
        <td>{props.type}</td>
        <td>{props.latestEvent}</td>
        
        {props.status == "OK" ? (
        <td className="text-success">OK</td> ) :
        (<td className="text-danger">FULL</td>)
        }
      </tr>
    )
  }

  export default TrashBinRow;