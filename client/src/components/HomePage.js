import React, { Component } from 'react';

import styled from 'styled-components'

import LineGraph from './LineGraph.js';
import MapComponent from './MapComponent.js';
import TopMusiciansList from './TopMusiciansList.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        musicianFilter: null,
        userFiler: []
    }

    this.setMusicianFilter = this.setMusicianFilter.bind(this);
  }

  setMusicianFilter(musician) {
    this.setState({
      musicianFilter: musician,
      userFilter: []
    })
  }
  
  render() {
    return (
      <div>
        <h1>home page</h1>
        <div style={{width: "66%", float: "left"}}>
          <MapComponent musicianFilter={this.state.musicianFilter}/>
        </div>
        
        <div style={{width: "30%", float: "left"}}>
          <TopMusiciansList setMusicianFilter={this.setMusicianFilter} musicianFilter={this.state.musicianFilter}/>
        </div>

        <div style={{width: "100%", marginTop: 20, marginBottom: 50}}>
          <LineGraph/>
        </div>

        
      </div>
    );
  }
}

export default HomePage;
