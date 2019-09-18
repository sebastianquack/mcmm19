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

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(apiUrl + "/top_musicians/10/" 
      + (this.props.musicianFilter ? "?musician=" + this.props.musicianFilter : ""))
    .then((response)=> {
      console.log(response.data);
      this.setState({ musicians: response.data })    
    })
    .catch((e)=> {
      console.log(e);
    });
  }  

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter) {
      this.fetchData();
    }
  }

  render() {

    const entries = this.state.musicians.map((e, i)=> 
      <li key={i} onClick={ () => this.props.setMusicianFilter(e.name) }>
        <span>{e.percent}%</span>
        &nbsp;
        <span>{e.name}&nbsp;({e.count})</span>
      </li>)

    return (
      <Container>
        { this.props.musicianFilter && 
          <p>filter: {this.props.musicianFilter} 
            <span onClick={()=>this.props.setMusicianFilter(null)}>
              clear
            </span>
          </p>
        }
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