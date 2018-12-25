import React from 'react';
import './CSS/TrashBinRow.css'

const TrashBinRow = (props) => {
    return (
      
      <tr>
        <td><a href={props.bin.id}>{props.bin.id}</a></td>
        <td><a href={props.bin.id}>{props.bin.owner}</a></td>
        <td><a href={props.bin.id}>{props.bin.address}</a></td>
        <td><a href={props.bin.id}>{props.bin.bintype}</a></td>
        <td><a href={props.bin.id}>{props.bin.latestEvent}</a></td>
        
        {props.status === "OK" ? (
        <td className="text-success"><a href={props.bin.id}>{props.bin.status}</a></td> ) :
        (<td className="text-danger"><a href={props.bin.id}>{props.bin.status}</a></td>)
        }
      </tr>
      
    )
  }

  export default TrashBinRow;