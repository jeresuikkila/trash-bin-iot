import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './GoogleMaps'
import Sidebar from 'react-sidebar'

const styles = {
	width: '100%',
	height: '100vh'
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarDocked: true
		};
	}

	render() {
		return (
			<div className="fluid-container">
				<Sidebar
					sidebar={<button className="btn btn-light">Clearly Bootstrap</button>}
					docked={this.state.sidebarDocked}
					styles={{ sidebar: { background: "white", width: '400px' } }}
				>
				</Sidebar>
				<div style={styles}>
					<GoogleMaps />
				</div>
			</div>
		);
	}
}

export default App;
