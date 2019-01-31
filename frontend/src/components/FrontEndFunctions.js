//transforms event timestamps from database to cleaner form
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
		return "No Event";
	}
}

//unused, possibly useful if raw data is needed somewhere
//triggercodes are saved to database as numbers from touchtags, this returns what the number represents as text.
export const trigCodeToText = (param) => {
	switch (param) {
		case '0':
			return 'restart';
		case '1':
			return 'timer';
		case '2':
			return 'single click';
		case '3':
			return 'movement start';
		case '4':
			return 'movement stop';
		case '5':
			return 'freefall';
		case '6':
			return 'activation';
		case '7':
			return 'deactivation';
		case '8':
			return 'double click';
		case '9':
			return 'long click';
		case '10':
			return 'temp max treshold';
		case '11':
			return 'temp min treshold';
		default:
			return param;
	}
}	