import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { apiUrl } from '../helpers'
import axios from 'axios';

export default class LineGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get(apiUrl + "/year_data/")
    .then((response)=> {
      console.log("yearly data loaded")
      this.setState({
        data: response.data
      });
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  renderYear(year, amount) {
    return <li key={year}>
      <span className="year_top">
        { amount > 0 ? 
          <img style={{transform: "scale("+amount+")"}} alt={year} src="/images/marker.svg" /> 
        : null }
      </span>
      <span className="year_middle"></span>
      <span className="year_bottom">
        <span>
          { amount > 0 ? year : null }
        </span>  
      </span>
    </li>
  }

  render() {
    let data = this.state.data
    if (!data || data.length === 0) return null

    // prepend some years at the beginning
    const prependAmount = 4
    data.unshift(...Array.from(Array(prependAmount), (e,i)=>({
      year:i+(data[0].year-prependAmount), 
      amount:0
    })))

    // append some years at the end
    const appendAmount = 1
    data.push(...Array.from(Array(appendAmount), (e,i)=>({
      year:i+(data[data.length-1].year + appendAmount), 
      amount:0
    })))

    const startYear = data[0].year
        
    const listEntries = data.map( d => this.renderYear(d.year, d.amount) )

    return <Ol start={startYear}>
        {listEntries}
    </Ol>;
  }
}

const Ol = styled.ol`
  position: fixed;
  bottom:0;
  left:0;
  right: 0;
  padding: 1rem;
  box-sizing: border-box;

  display: flex;
  width: 100%;

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 6em;
  }

  li .year_top {
    height: 3vh;
    /* background: red; */
  }

  li .year_top img {
    width: auto;
    height: 1vh;
    /* background: yellow; */
  }

  li .year_middle {
    height: 3vh;
  }

  li .year_middle:before {
    content: "";
    border: solid 1px black;
    border-width: 0 0 0 1px;
    position: relative;
    left: calc(50% - 1px);
  }

  li .year_bottom {
    height: 3vh;
    /* background: green; */
  }

  li .year_bottom span {
    width: calc(1em + 20%);
    transform: rotate(-90deg) translateX(-100%);
    overflow: visible;
    /* background: red; */
  }

  li > * {
    position: relative;
  }

  li > * > * {
    position: absolute;
  }
`