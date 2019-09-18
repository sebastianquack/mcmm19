import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components'

import axios from 'axios';
import { apiUrl } from '../helpers'

import LineGraph from './LineGraph.js';
import MapComponent from './MapComponent.js';
import TopMusiciansList from './TopMusiciansList.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data: []
    }
  }

  async componentDidMount() {
    axios.get(apiUrl + "/entries_by_users/")
    .then((response)=> {
      this.setState({ data: response.data})    
    })
    .catch((e)=> {
      console.log(e);
    });
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
        
        <MapComponent entries={this.state.data}/>
        
        { this.state.showTopMusiciansList &&
          <TopMusiciansList/>
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
