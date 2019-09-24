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
    console.log("request with yearFilter", this.props.yearFilter);
    axios.get(apiUrl + "/top_musicians/10/" 
      + (this.props.musicianFilter ? "?musician=" + this.props.musicianFilter : "")
      + (this.props.yearFilter ? "?year=" + this.props.yearFilter : "")
      )
    .then((response)=> {
      console.log(response.data);
      this.setState({ musicians: response.data })    
    })
    .catch((e)=> {
      console.log(e);
    });
  }  

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter || 
        this.props.userFilter !== prevProps.userFilter ||
        this.props.yearFilter !== prevProps.yearFilter) {
      this.fetchData();
    }
  }

  render() {

    const entries = this.state.musicians
      .sort((a, b) => (a.percent < b.percent) ? 1 : -1)
      .map((e, i)=> 
        <li key={i} onClick={ () => this.props.setMusicianFilter(e.name) }>
          <span>{e.percent}%</span>
          &nbsp;
          <span>{e.name}&nbsp;({e.count})</span>
        </li>)

    return (
      <Container filterOn={this.props.filterOn}>
        <ul>{entries}</ul>
      </Container>
    );
  }
}

export default TopMusiciansList;

const Container = styled.div`
  position: fixed;
  right: 0;
  top: ${props => props.filterOn ? "60px" : "0" };
  width: 33vw;
  padding: 1rem 1rem 0 0;
  box-sizing: border-box;

  ul {
    list-style-type: none;
  } ;
  li {
    display: flex;
    span:first-child {
      width: 2em;
    }
    span:last-child {
      flex: 1;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`

const Clear = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`