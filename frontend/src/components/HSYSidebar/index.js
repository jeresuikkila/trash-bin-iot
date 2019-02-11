import React, { Component } from 'react';
import MainPage from '../MainPage.js'
import './styles.css'

class HSYSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
      content: null
    };
  }

  openMainPage = (e) => {
    this.setState({ content: <MainPage /> })
  }

  render() {
    return (
        <div id="sidebar">
          <p className="title">HSY SMART WASTE</p>
          <div className="white-background">
            { !this.state.content && <button className="filter-button" onClick={this.openMainPage}>Filters</button> }
            { this.state.content }
          </div>
        </div>
    );
  }
}

export default HSYSidebar;
