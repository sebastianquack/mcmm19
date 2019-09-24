import React, { Component } from 'react';
import styled from 'styled-components'

import LineGraph from './LineGraph.js';
import MapComponent from './MapComponent.js';
import TopMusiciansList from './TopMusiciansList.js';

import axios from 'axios';
import { apiUrl } from '../helpers'

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const showFilterBar = (this.props.userFilter.length > 0 || this.props.musicianFilter || this.props.yearFilter)

    return (
      <Container>
        <MapComponent 
          userFilter={this.props.userFilter} 
          musicianFilter={this.props.musicianFilter}
          yearFilter={this.props.yearFilter}
        />
        
        { this.props.largeScreen &&
          <TopMusiciansList 
            musicianFilter={this.props.musicianFilter}
            setMusicianFilter={this.props.setMusicianFilter}
            yearFilter={this.props.yearFilter}
            filterOn={showFilterBar}
          />
        }

        { this.props.largeScreen && !this.props.yearFilter &&
          <LineGraph 
            musicianFilter={this.props.musicianFilter}
            yearFilter={this.props.yearFilter}
            setYearFilter={this.props.setYearFilter}
          />
        }
        
      </Container>
    );
  }
}

export default HomePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`