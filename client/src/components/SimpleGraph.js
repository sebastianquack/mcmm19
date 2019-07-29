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
    const height = 300;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force('collide', d3.forceCollide().radius(10).strength(5))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.select(element)
      .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const nodeContainer = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(nodes)
      .join("g")

    const node = nodeContainer.append("circle")
          .attr("r", d => 4 + d.weight)
          .attr("fill", d => "#eee")
          .call(this.drag(simulation));

    node.append("title")
        .text(d => d.id);

    const label = nodeContainer.append("text")
        .attr("class", "node-label")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .attr("stroke", "#666")
        .attr("stroke-width", 0.1)
        .attr("font-size", 10)
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

      label
          .attr("x", d => d.x)
          .attr("y", d => d.y);

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