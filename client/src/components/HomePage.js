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
        userFilter: []
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

      { (this.props.userFilter.length > 0) && 
        <UserFilterInfo>
          <span>user filter on</span>
          <ExitButton src="/images/close.png" onClick={()=>this.props.setUserFilter([])}/>
        </UserFilterInfo>
      }
        
        <MapComponent userFilter={this.props.userFilter} musicianFilter={this.state.musicianFilter}/>
        
        { this.props.wideView &&
          <TopMusiciansList setMusicianFilter={this.setMusicianFilter} musicianFilter={this.state.musicianFilter}/>
        }

        { this.state.showLineGraph &&
          <LineGraph musicianFilter={this.state.musicianFilter}/>
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

const UserFilterInfo = styled.div`
  min-height: 50px;
`

const ExitButton = styled.img`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  :hover {cursor: pointer};
`

