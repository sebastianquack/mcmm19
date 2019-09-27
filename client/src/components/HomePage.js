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
          setUserFilter={this.props.setUserFilter}
          musicianFilter={this.props.musicianFilter}
          yearFilter={this.props.yearFilter}
          translations={this.props.translations}
          locale={this.props.locale}
          largeScreen={this.props.largeScreen}
          setInfoWindow={this.props.setInfoWindow}
          showInfoWindow={this.props.showInfoWindow}
        />
        
        { this.props.largeScreen &&
          <TopMusiciansList 
            musicianFilter={this.props.musicianFilter}
            userFilter={this.props.userFilter}
            setMusicianFilter={this.props.setMusicianFilter}
            yearFilter={this.props.yearFilter}
            filterOn={showFilterBar}
          />
        }

        { this.props.largeScreen &&
          <LineGraph 
            musicianFilter={this.props.musicianFilter}
            yearFilter={this.props.yearFilter}
            setYearFilter={this.props.setYearFilter}
            userFilter={this.props.userFilter}
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