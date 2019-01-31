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
const btnHelpers = {	
		//button color, manages the changing colors of the compound button [All | Bin Opened | Bin Emptied | Unprocessed Events]. 
	//'btn' dictates which button we are manipulating at the moment, while 'input' gives which of the 4 is last clicked on website.
	btnClr: function(btn, input) {
		if(btn === 0 && input === 0) {
			return "btn btn-success";
		} else if(btn === 0 && input !== 0) {
			return "btn btn-dark";
		} else if(btn === 1 && input === 1) {
			return "btn btn-success";
		} else if(btn === 1 && input !== 1) {
			return "btn btn-dark";
		}else if(btn === 2 && input === 2) {
			return "btn btn-success";
		} else if(btn === 2 && input !== 2) {
			return "btn btn-dark";
		} if(btn === 3 && input === 3) {
			return "btn btn-success";
		} else if(btn === 3 && input !== 3) {
			return "btn btn-dark";
		} else {
			return "btn btn-danger";
		}
	},
	
	//this method is called when we want to change the active event button. (put to memory which button was last clicked in compound button [All | Bin Opened | Bin Emptied | Unprocessed Events])
	changeActiveEventBtnState: function(input) {
		this.setState({
			activeEventBtnState: input
		});
	},
	
	//used to track the state of (Show Events/Hide Events) button.
	flipCollapseBtnState: function() {
		if(this.state.isCollapseBtnActive === false) {
			this.setState({
				isCollapseBtnActive: true
			});
		} else {
			this.setState({
				isCollapseBtnActive: false
			});
		}
	},
	
	//changes the color & text of (Show Events/Hide Events) button depending on wether it's active or not. input tells if we are changing "color" or "text"
	collapseBtnColorAndText: function(input) {
		if(input === "color" && this.state.isCollapseBtnActive === true) {
			return ("btn btn-success");
		} else if(input === "color" && this.state.isCollapseBtnActive === false){ 
			return ("btn btn-dark"); 
		} else if(input === "text" && this.state.isCollapseBtnActive === true) {
			return ("Hide Events");
		} else if(input === "text" && this.state.isCollapseBtnActive === false){ 
			return ("Show Events"); 
		}
	}
}

export default btnHelpers;