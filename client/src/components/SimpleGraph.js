import React, { Component } from 'react';

import { apiUrl } from '../helpers'

import _ from "underscore";
import * as d3 from 'd3'

/* build the network */

var width = window.innerWidth || 0,
      height = window.innerHeight || 0;

var zoom = d3.behavior.zoom().scaleExtent([-5, 12]).on("zoom", zoomed);

var nodes, links, oldNodes, matchIndex, // data
  svg, node, link, // d3 selections
  force = d3.layout.force()
  .gravity(0.05)
  .distance(170)
  .charge(-100)
  .size([width, height]); 


force.on("tick", function(e) {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});

class SimpleGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    }
    this._rootNode = React.createRef();
  }

  componentDidMount() {

    // D3 Code to create the chart
    // using this._rootNode as container
    renderGraph(this._rootNode.current);
  }

  shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

  render() {
    return <div ref={this._rootNode} />;
  }
}

export default SimpleGraph;


function loadData(callback) {
  d3.json(apiUrl + "/graph_data/", function(error, json) {
    if(error) {
      console.log(error);
    }
    console.log(json);
    if(!json) return;

    oldNodes = nodes;
    nodes = json.nodes;
    links = json.links;
    maintainNodePositions();
    callback();
  });
}

function renderGraph(element) {
  loadData(()=>{
    force.nodes(nodes).links(links);
    svg = d3.select(element).append("svg")
      .attr("width", width)
      .attr("height", height)
              .append("g");
    var l = svg.selectAll(".link")
      .data(links, function(d) {return d.source + "," + d.target});
    var n = svg.selectAll(".node")
      .data(nodes, function(d) {return d.key});
    enterLinks(l);
    enterNodes(n);
    node = svg.selectAll(".node"); 
    link = svg.selectAll(".link");
    applyStyling();
    force.start();
  });
}

function update() {
  loadData(()=>{
    force.nodes(nodes).links(links);
    var n = svg.selectAll(".node")
      .data(nodes, function(d) {return d.key});
    var l = svg.selectAll(".link")
      .data(links, function(d) {return d.source + "," + d.target});
    enterNodes(n);
    exitNodes(n);
    enterLinks(l);
    exitLinks(l);
    node = svg.selectAll(".node");
    link = svg.selectAll(".link");
    applyStyling();
    force.start();
  });
}

function enterNodes(n) {
  var g = n.enter().append("g")
    .attr("class", "node element")
    .call(force.drag);

  /*g.append("svg:circle")
      .style("opacity", 0.5);*/

  /*g.append("svg:image")
    .attr('x', -10)
    .attr('y', -10)
    .attr('width', 20)
    .attr('height', 20)
    .attr("xlink:href", "/images/dot.png")*/

  g.append("text")
      .attr("dx", -5)
      .attr("dy", ".25em");        
}

function enterLinks(l) {
  l.enter().insert("line", ".node")
    .attr("class", "link element")
    .style("opacity", 1.0);
}

function exitNodes(n) {
  n.exit().remove();
}

function exitLinks(l) {
  l.exit().remove();
}

function maintainNodePositions() {
  var kv = {};
  _.each(oldNodes, function(d) {
    kv[d.key] = d;
  });
  _.each(nodes, function(d) {
    if (kv[d.key]) {
      // if the node already exists, maintain current position
      d.x = kv[d.key].x;
      d.y = kv[d.key].y;
    } else {
      // else assign it a random position near the center
      d.x = width / 2 + _.random(-150, 150);
      d.y = height / 2 + _.random(-25, 25);
    }
  });
}

/* zoom and pan */
function zoomed() {
  svg.attr("transform",
      "translate(" + zoom.translate() + ")" +
      "scale(" + zoom.scale() + ")"
  );
}

function interpolateZoom (translate, scale) {
  var self = this;
  return d3.transition().duration(350).tween("zoom", function () {
      var iTranslate = d3.interpolate(zoom.translate(), translate),
          iScale = d3.interpolate(zoom.scale(), scale);
      return function (t) {
          zoom
              .scale(iScale(t))
              .translate(iTranslate(t));
          zoomed();
      };
  });
}

function zoomButton(dir) {
    var direction = 1,
        factor = 0.2,
        target_zoom = 1,
        center = [width / 2, height / 2],
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        translate0 = [],
        l = [],
        view = {x: translate[0], y: translate[1], k: zoom.scale()};

    direction = (dir === 'in') ? 1 : -1;
    target_zoom = zoom.scale() * (1 + factor * direction);

    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];      
    view.k = target_zoom;
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    interpolateZoom([view.x, view.y], view.k);
}

function panButton(dir) {
  var step = 50;
  var xOffset = (dir == "right" ? -step : 0) + (dir == "left" ? step : 0);
  var yOffset = (dir == "up" ? step : 0) + (dir == "down" ? -step : 0);  
    
  var center = [width / 2, height / 2],
      translate = zoom.translate(),
      translate0 = [],
      l = [],
      view = {x: translate[0], y: translate[1], k: zoom.scale()};

  translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
  l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
  view.x += center[0] - l[0] + xOffset;
  view.y += center[1] - l[1] + yOffset;

  interpolateZoom([view.x, view.y], view.k);
}

/* color management */
var percentColors = [
  { pct: 0.0, color: { r: 0x00, g: 0x86, b: 0xcb } },
  { pct: 0.8, color: { r: 0xe7, g: 0x37, b: 0x2A } },
  { pct: 1.0, color: { r: 0xff, g: 0xcc, b: 0x00 } } ];

var getColorForPercentage = function(pct) {
    if(pct > 1) pct = 1;
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
}  

var getNodeColor = function(node) {
  getColorForPercentage(node.popularity / 7.0);
}

var getLinkColor = function(link) {
  return "#ccc";
}

function applyStyling() {

    link.style("stroke", (d)=>{return getLinkColor(d)} )
    .attr("stroke-width", function(d) { return 1 })

    node.select("circle")
      .attr("r", function(d) {      
         if(d.type == "player") return 7;

         d.popularity = links.filter((l)=> {
           return l.targetId == d.id
         }).length;
         var minRadius = 10;
         var maxRadius = 20;
         var popPercent = d.popularity / (0.01 * nodes.length);
         if(popPercent > 1) popPercent = 1
         var radius = popPercent * maxRadius;
         if(radius < minRadius) radius = minRadius;
         return radius;
      })
      .style("fill", (d)=>{return getNodeColor(d)} );

    node.select("text")
      .style("fill", (d)=>{return getNodeColor(d)})
      .text(function(d) { console.log(d.name); return d.name })
      .style("font-size", "14px");      

    svg.selectAll(".element").sort(function (a, b) { // sort active everything down
      if (a.active == b.active && a.type == b.type) return 0;
      if (a.active == b.active && !a.type && b.type) return -1;
      if (!a.active && b.active) return -1;       
      else return 1;                              
    });
}

/* text */
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
