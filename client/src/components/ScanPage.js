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

  componentDidMount() {
    this.pollInterval = setInterval(()=>{this.props.pollFilter(this.props.mcmmId)}, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })

      if (data.substring(0, 4) == "pro_") {
        this.props.setUserFilter([this.props.mcmmId]);
      } else {
        this.props.setUserFilter([this.props.mcmmId, data]);
      }

      axios.get(apiUrl + "/set_filter/" + data + "/" + this.props.mcmmId)
      .then((response)=> {
        console.log(response);
      })
      .catch((e)=> {
        console.log(e);
      });
    }
  }
  
  handleError = err => {
    console.error(err)
  }

  render() {
                
    return (
      <div>
        <h1>scanner</h1>

        <div style={{padding: 50}}>
          <QRCode value={this.props.mcmmId}/>
        </div>


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
