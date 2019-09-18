import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

class TopMusiciansList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicians: []
    }
  }

  async componentDidMount() {

    axios.get(apiUrl + "/top_musicians/10/")
    .then((response)=> {
      console.log(response.data);
      this.setState({ musicians: response.data })    
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  render() {

    const entries = this.state.musicians.map((e, i)=>
      <li key={i}>
        {e.name} {e.count} {e.percent}%
      </li>);
    return (
      <div>
        <ul>{entries}</ul>
      </div>
    );
  }
}

export default TopMusiciansList;