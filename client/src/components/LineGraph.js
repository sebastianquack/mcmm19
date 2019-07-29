import React, { Component } from 'react';

import { apiUrl } from '../helpers'
import axios from 'axios';

import * as d3 from 'd3'

var width = 500,
    height = 100;

var margin = {top: 30, right: 50, bottom: 50, left: 30};

var svg;

export default class LineGraph extends Component {
  constructor(props) {
    super(props);
    this._rootNode = React.createRef();
  }

  componentDidMount() {

    // D3 Code to create the chart
    // using this._rootNode as container
    width = this._rootNode.current.offsetWidth ;
    axios.get(apiUrl + "/year_data/")
    .then((response)=> {
      this.renderGraph(this._rootNode.current, response.data);
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

  render() {
    return <div ref={this._rootNode} />;
  }

  renderGraph(element, json) {
  
    svg = d3.select(element)
      .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var xScale = d3.scaleBand()
      .range([ 0, width ])
      .domain([...Array(63).keys()].map(i=>i+1960))
      .padding(0.2);
    
    var xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter(function(d,i){ return !((i)%5)}));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-80)")
        .style("text-anchor", "end");

    let yExtent = d3.extent(json, function(d) { return d.amount; });

    // Add Y axis
    var y = d3.scaleLinear()
      .domain(yExtent)
      .range([ height, 0]);

    var yAxis = d3.axisLeft(y)
      .tickFormat(d3.format("d"))
      .ticks(yExtent[1])

    svg.append("g")
      .call(yAxis);

    // Bars
    svg.selectAll("mybar")
      .data(json)
      .enter()
      .append("rect")
        .attr("x", function(d) { return xScale(d.year); })
        .attr("y", function(d) { return y(d.amount); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - y(d.amount); })
        .attr("fill", "#69b3a2")
  }
}
