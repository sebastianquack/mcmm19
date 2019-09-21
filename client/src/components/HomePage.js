import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components'

import LineGraph from './LineGraph.js';
import MapComponent from './MapComponent.js';
import TopMusiciansList from './TopMusiciansList.js';

import axios from 'axios';
import { apiUrl } from '../helpers'

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        musicianFilter: null,
        userFilter: []
    }

    this.handleFilterClose = this.handleFilterClose.bind(this);
  }

  
  onResize = (width, height) => {
    // console.log(width, height)
    this.setState({
      showTopMusiciansList: width > 600,
      showLineGraph: width > 600
    })
  }

  handleFilterClose() {

    console.log("handleFilterClose");

    axios.post(apiUrl + "/remove_filter/" + this.props.mcmmId)
    .then((response)=> {
      console.log(response);
    })
    .catch((e)=> {
      console.log(e);
    });

    this.props.setUserFilter([]);
    this.props.setMusicianFilter(null)
  }
  
  render() {
    const showFilterBar = (this.props.userFilter.length > 0 || this.props.musicianFilter)

    return (
      <Container>

      { showFilterBar && 
        <UserFilterInfo>
          {(this.props.userFilter.length > 0) && <span>filter for {this.props.userFilter.length} users</span>}
          {(this.props.musicianFilter) && <span>filter for users that named {this.props.musicianFilter}</span>}

          <ExitButton src="/images/close.png" onClick={this.handleFilterClose}/>
        </UserFilterInfo>
      }

        <MapComponent userFilter={this.props.userFilter} musicianFilter={this.props.musicianFilter}/>
        
        { this.state.showTopMusiciansList &&
          <TopMusiciansList 
            musicianFilter={this.props.musicianFilter}
            setMusicianFilter={this.props.setMusicianFilter}
            filterOn={showFilterBar}
          />
        }

        { this.state.showLineGraph &&
          <LineGraph musicianFilter={this.props.musicianFilter}/>
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
  min-height: 60px;
  padding: 20px;
`

const ExitButton = styled.img`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  z-index: 100;
  :hover {cursor: pointer};
`

