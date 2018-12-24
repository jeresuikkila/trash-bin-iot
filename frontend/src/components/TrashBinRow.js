import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const TrashBinRow = (props) => {
    return (
      
      <tr>
        
        <td>
        <a href={props.bin.id}>
          {props.bin.id}</a>
        {/* <Router>
        <Link to={props.bin.id} onClick={() => props.setBinSelected(props.bin)}>
          <button className="btn btn-light">
            {props.bin.id}
          </button>
        </Link>
        </Router> */}
        </td>
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