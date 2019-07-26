import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

import SimpleGraph from './SimpleGraph.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        entries: []
    }
  }

  render() {
    return (
      <div>
        <h1>home page</h1>
        <SimpleGraph/>
      </div>
    );
  }
}

export default HomePage;
