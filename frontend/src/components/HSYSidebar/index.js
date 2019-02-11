import React, { Component } from 'react';
import MainPage from '../MainPage'
import './styles.css'

class HSYSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  openMainPage = () => {
    this.setState({ content: <MainPage /> })
  }

  render() {
    const { content } = this.state

    return (
        <div id="sidebar">
            <p className="title">HSY SMART WASTE</p>
            <div className="white-background">
                { !content && <button type="button" className="filter-button" onClick={ this.openMainPage }>Filters</button> }
                { content }
            </div>
        </div>
    );
  }
}

export default HSYSidebar;
