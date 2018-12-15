import React from 'react';

const TrashBinRow = (props) => {
    return (
      <tr>
        <td><a href={`/${props.id}`}>{props.id}</a></td>
        <td>{props.owner}</td>
        <td>{props.address}</td>
        <td>{props.type}</td>
        <td>{props.latestEvent}</td>
        
        {props.status == "OK" ? (
        <td className="text-success">{props.status}</td> ) :
        (<td className="text-danger">{props.status}</td>)
        }
      </tr>
    )
  }

  export default TrashBinRow;