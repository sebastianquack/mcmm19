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

    this.pollFilter = this.pollFilter.bind(this);

  }

  componentDidMount() {
    this.pollInterval = setInterval(this.pollFilter, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  pollFilter() {
    axios.get(apiUrl + "/filter?username=" + this.props.mcmmId)
    .then((response)=> {
      console.log(response);
      if(response.data && response.data.docs && response.data.docs.length) {
        this.props.setUserFilter([this.props.mcmmId, response.data.docs]);  
      }
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })

      this.props.setUserFilter([this.props.mcmmId, data]);

      axios.post(apiUrl + "/set_filter/" + data + "/" + this.props.mcmmId)
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
