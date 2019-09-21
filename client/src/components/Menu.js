import React, { Component } from 'react';
import styled from 'styled-components'

const uuidv1 = require('uuid/v1');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <MenuContainer>
        <MenuButton onClick={this.props.reset}>home</MenuButton>
        <MenuButton onClick={()=>this.props.navigate("list")}>my entries</MenuButton>
        <MenuButton onClick={()=>this.props.navigate("scan")}>scanner</MenuButton>
        <ExitButton src="/images/close.png"  onClick={this.props.close}/>
      </MenuContainer>
    );
  }
}

export default Menu;

const MenuButton = styled.li`
  margin-bottom: 10px;
  &:hover {cursor: pointer};
`

const ExitButton = styled.img`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  &:hover {cursor: pointer};
`

const MenuContainer = styled.ul`
  padding: 4rem 1rem 1rem 2rem;
`
