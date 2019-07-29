import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

import SimpleGraph from './SimpleGraph.js';
import MapPage from './MapPage.js';

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
      console.log(response.data);
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
        <div style={{width: "100%", float: "left"}}>
          <MapPage entries={this.state.data}/>
        </div>
        <div style={{width: "100%", float: "left"}}>
          <SimpleGraph/>
        </div>
      </div>
    );
  }
}

export default HomePage;
