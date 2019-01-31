import React from 'react';

const TrashBinRow = (props) => {
  return (
    <tr style={{ 'cursor': 'pointer' }} onClick={() => props.clickhandler(props.bin.id)}>
      <td>{props.bin.id}</td>
      <td>{props.bin.owner}</td>
      <td>{props.bin.address}</td>
      <td>{props.bin.bintype}</td>
      <td>{timeClean(props.bin.latestEvent)}</td>

      {props.status === "OK" ? (
        <td className="text-success">{props.bin.status}</td>) :
        (<td className="text-danger">{props.bin.status}</td>)
      }
    </tr>
  )
}

export const timeClean = (input) => {
    if(input !== null) {
		if(input.includes("T")) {
			var res = input.split("T");
			var res2 = res[1].split(".");
			var ret = res[0] + " " + res2[0];
			return ret;
		} else {
			return input;
		}
	} else {
		return "no event";
	}
}

export default TrashBinRow;