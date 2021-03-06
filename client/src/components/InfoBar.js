import React, { Component } from 'react';
import styled from 'styled-components';

import { isLargeScreen } from '../helpers/'


class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <UserFilterInfo menuOpen={this.props.menuOpen}>
        { this.props.children }

        <ExitButton src="/images/close.png" onClick={this.props.onClose}/>
      </UserFilterInfo>
    )
  }
}

export default InfoBar;

const UserFilterInfo = styled.div`
  background-color: ${props => (!props.menuOpen ? "white" : "none") };
  position: ${props => (!props.menuOpen ? "absolute" : "relative") };;
  z-index: 10;
  min-height: 60px;
  padding: 1.25rem;
  padding-right: calc(30px + 1rem);
  border-bottom: ${props => (!props.menuOpen ? "1px solid #ddd" : "border: none") };
  display: flex;
  font-size: 1.25rem;
  width: 100%;
`

const ExitButton = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  &:hover {cursor: pointer};
`
