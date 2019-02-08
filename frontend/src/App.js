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
			<div className="container">
				<Sidebar
					sidebar={<b>Sidebar content</b>}
					open={this.state.sidebarOpen}
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
