import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

import QrReader from 'react-qr-reader'
var QRCode = require('qrcode.react');

class ScanPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        result: 'No result'
    }
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })

      this.props.setUserFilter([this.props.mcmmId, data]);
    }
  }
  
  handleError = err => {
    console.error(err)
  }

  render() {
                
    return (
      <div>
        <h1>scanner</h1>

        <QRCode value={this.props.mcmmId}/>

        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>

      </div>
    );
  }
}

export default ScanPage;
