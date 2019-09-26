import React, { Component } from 'react';
import styled from 'styled-components';

class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    let circles = [];
    let step = 7;
    for(let i = 0; i < 200; i ++) {
      circles.push(
        <circle cx="66%" cy="-100" r={i * step} stroke="#ddd" strokeWidth="1" fill="none" />
      )
    }

    return (
       <svg style={{position: "absolute"}} height="100%" width="100%">
        {circles}
      </svg> 
    )
  }
}

export default Circles;
