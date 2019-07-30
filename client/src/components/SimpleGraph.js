import React, { Component } from 'react';

import { apiUrl } from '../helpers'
import axios from 'axios';

import * as d3 from 'd3'

/* build the network */

class SimpleGraph extends Component {
  constructor(props) {
    super(props);
    this._rootNode = React.createRef();
  }

  componentDidMount() {
    axios.get(apiUrl + "/graph_data/")
    .then((response)=> {
      this.setupGraph(this._rootNode.current, response.data);
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

  setupGraph(element, data) {

    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const width = element.offsetWidth;
    const height = 400;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force('collide', d3.forceCollide().radius(10).strength(5))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.select(element)
      .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      
    const nodeCircles = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")    
    
    let circles = [];
    for(let i = 0; i < 5; i++) {
      circles[i] = nodeCircles.append("circle")
        .attr("stroke", "#eee")      
        .attr("fill", "none")
        .attr("r", d => d.weight + Math.pow(i + 1, 3))
    }

    const nodeColor = "#69b3a2";

    const link = svg.append("g")
        .attr("stroke", nodeColor)
        .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", 1);

    const nodeContainer = svg.append("g")
        .attr("stroke", "#eee")
        .attr("stroke-width", 1)
      .selectAll("g")
      .data(nodes)
      .join("g")

    const node = nodeContainer.append("circle")
          .attr("stroke", "#69b3a2")
          .attr("fill", "#fff")
          .attr("r", d => d.weight)
          .call(this.drag(simulation));

    const label = svg.append("g")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .attr("stroke", "#666")
        .attr("stroke-width", 0.1)
        .attr("font-size", 10)
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.id);

    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

      for(let i = 0; i < 5; i++) {
        circles[i]
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
      }

      label
          .attr("x", d => d.x + 7 + d.weight)
          .attr("y", d => d.y + 3);

    });

  }

  // standard dragging behaviour
  drag(simulation) {
  
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

}

export default SimpleGraph;