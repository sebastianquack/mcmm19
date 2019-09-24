import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import { capitalize } from '../helpers'
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
    console.log(this.props);
    let params = {}

    if(this.props.musicianFilter) {
      params.musician = this.props.musicianFilter;
    }
    if(this.props.userFilter && this.props.userFilter.length > 0) {
      params.userIds = JSON.stringify(this.props.userFilter);
    }
    if(this.props.yearFilter) {
      params.year = this.props.yearFilter;
    }

    axios.get(apiUrl + "/top_musicians/10/", {params})
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
          <span>{capitalize(e.name)}&nbsp;({e.count})</span>
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
  width: auto;
  padding: 1rem 1rem 0 0;
  box-sizing: border-box;

  ul {
    list-style-type: none;
  } ;
  li {
    display: flex;
    span:first-child {
      width: 2em;
      margin-right: 0.75em;
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