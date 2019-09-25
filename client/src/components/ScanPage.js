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
        result: 'Scanning...'
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
      <Container>

          <Qode>
            <QRCode 
              value={this.props.mcmmId}
              size={500}
            />
          </Qode>

          <Scanner>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
            />
            <p>{this.state.result}</p>
          </Scanner>


      </Container>
    );
  }
}

export default ScanPage;

const menuHeight = "4rem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${menuHeight});
  align-items: center;
  background-color: black;
`

const Qode = styled.div`
  flex: 1;
  max-width:calc(50vh - 0.5 * ${menuHeight});
  width: 100vw;  
  padding: 2.5rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;

  canvas {
    width:100% !important;
    height: auto !important;
  }

`

const Scanner = styled.div`
  height: calc(((100vh - ${menuHeight}) / 100vh) * 100vw);
  max-width:calc(50vh - 0.5 * ${menuHeight});
  max-height:calc(50vh - 0.5 * ${menuHeight});
  width: 100vw;
  position: relative;
  background-color: black;
  border: 1px solid white;

  > p {
    position: absolute;
    width: 100%;
    color: white;
    bottom: 0.5rem;
    opacity: 0.5;
    z-index: 10;
    text-align: center;
  }
`