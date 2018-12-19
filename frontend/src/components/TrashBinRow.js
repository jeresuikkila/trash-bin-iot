import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TrashBinDetails from "./TrashBinDetails"

const TrashBinRow = (props) => {
    return (
      <tr>
        <td>{props.bin.id}</td>
        <td>{props.bin.owner}</td>
        <td>{props.bin.address}</td>
        <td>{props.bin.bintype}</td>
        <td>{props.bin.latestEvent}</td>
        {props.status === "OK" ? (
        <td className="text-success">{props.bin.status}</td> ) :
        (<td className="text-danger">{props.bin.status}</td>)
        }
        <td>
        <Router>
          <div>
          <Link 
          to={'/trashbin/'+props.bin.id+'/'}>
          More
          </Link>
          <Route 
            exact path={'/trashbin/'+props.bin.id}
            component={Details}>
          </Route>
          </div>
        </Router>
        </td>
      </tr>
    )
  }

const Details = () => {
  return(
    <TrashBinDetails/>
  );
}

  export default TrashBinRow;