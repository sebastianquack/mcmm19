import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
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

  onResize = (width, height) => {
    // console.log(width, height)
    this.setState({
      showTopMusiciansList: width > 600,
      showLineGraph: width > 600
    })
  }
  
  render() {
    return (
      <Container>
        
        <MapComponent musicianFilter={this.state.musicianFilter}/>
        
        { this.state.showTopMusiciansList &&
          <TopMusiciansList setMusicianFilter={this.setMusicianFilter} musicianFilter={this.state.musicianFilter}/>
        }

        { this.state.showLineGraph &&
          <LineGraph/>
        }
        
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      </Container>
    );
  }
}

export default HomePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`
