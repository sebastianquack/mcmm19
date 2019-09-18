import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

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
  
  render() {
    return (
      <div>
        <h1>home page</h1>
        <div style={{width: "66%", float: "left"}}>
          <MapComponent entries={this.state.data}/>
        </div>
        
        <div style={{width: "30%", float: "left"}}>
          <TopMusiciansList/>
        </div>

        <div style={{width: "100%", marginTop: 20, marginBottom: 50}}>
          <LineGraph/>
        </div>

        
      </div>
    );
  }
}

export default HomePage;
