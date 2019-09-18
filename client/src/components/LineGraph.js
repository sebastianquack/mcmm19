import React, { PureComponent } from 'react';

import { apiUrl } from '../helpers'
import axios from 'axios';

export default class LineGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    axios.get(apiUrl + "/year_data/" + (this.props.musicianFilter ? "?musician=" + this.props.musicianFilter : ""))
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

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter) {
      this.fetchData();
    }
  }

  renderYear(year, amount) {
    return <li key={year}>
      <span class="year_top">
        { amount > 0 ? 
          <img style={{transform: "scale("+amount+")"}} alt={year} src="/images/marker.svg" /> 
        : null }
      </span>
      <span class="year_middle"></span>
      <span class="year_bottom">
        <span>
          { amount > 0 ? year : null }
        </span>  
      </span>
    </li>
  }

  render() {
    let data = this.state.data
    if (!data || data.length === 0) return null

    console.log(data)

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

    console.log(data)

    const startYear = data[0].year
    const endYear = data[data.length-1].year
        
    const listEntries = data.map( d => this.renderYear(d.year, d.amount) )

    return <ol className="LineGraph" start={startYear}>
        {listEntries}
    </ol>;
  }
}
