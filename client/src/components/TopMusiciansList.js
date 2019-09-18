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
        <span>{e.percent}%</span>
        &nbsp;
        <span>{e.name}&nbsp;({e.count})</span>
      </li>);    return (
      <Container>
        <ul>{entries}</ul>
      </Container>
    );
  }
}

export default TopMusiciansList;

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;

  ul {
    list-style-type: none;
  } ;
  li {
    display: flex;
    span {
    }    
    span:first-child {
      width: 2em;
    }
  }
`