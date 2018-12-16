import React from 'react';

const TrashBinRow = (props) => {
    return (
      <tr>
        <td><a href={`/${props.bin.id}`}>{props.bin.id}</a></td>
        <td>{props.bin.owner}</td>
        <td>{props.bin.address}</td>
        <td>{props.bin.bintype}</td>
        <td>{props.bin.latestEvent}</td>
        
        {props.status === "OK" ? (
        <td className="text-success">{props.bin.status}</td> ) :
        (<td className="text-danger">{props.bin.status}</td>)
        }
      </tr>
    )
  }

  export default TrashBinRow;