import React, { Component } from 'react';

import Menu from './Menu.js';
import ListPage from './ListPage.js';
import HomePage from './HomePage.js';
import EditPage from './EditPage.js';

import styled from 'styled-components'
const uuidv1 = require('uuid/v1');

class BaseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: [],
      menuOpen: false,
      currentPage: "home",
      mcmmId: null,
      navStack: []
    }
  }

  componentDidMount() {
    let hash = window.location.hash;
    let mcmmId = localStorage.getItem('mcmmId');  
    if(hash) {
      mcmmId = hash.substr(1);
      this.setState({
        currentPage: "list",
        mcmmId: mcmmId,
        navStack: ["home"]
      })
    }
    if(!mcmmId) {
      mcmmId = uuidv1();
    }
    this.setState({mcmmId: mcmmId});  
    localStorage.setItem('mcmmId', mcmmId);    
  }

  toggleMenu = ()=>{
    this.setState({menuOpen: !this.state.menuOpen})
  }

  navigate = (page, entry, noSave=false)=>{
    if(!noSave) {
      let navStack = this.state.navStack;
      navStack.push(this.state.currentPage);
      console.log(navStack);
      this.setState({navStack});
    }
    this.setState({
      menuOpen: false,
      currentPage: page,
      currentEntry: entry
    });
    if(page != "list") {
      window.history.pushState("", document.title, window.location.pathname);
    }
  }

  back = () => {
    let navStack = this.state.navStack;
    let previousPage = navStack.pop();
    this.setState({navStack});
    this.navigate(previousPage, this.state.entry, true);
  }

  render() {
    const pages = {
      "home": <HomePage/>,
      "list": <ListPage mcmmId={this.state.mcmmId} editEntry={(entry)=>{this.navigate("edit", entry)}}/>,
      "edit": <EditPage mcmmId={this.state.mcmmId} back={this.back} entry={this.state.currentEntry}/>
    }
    let mainContent = pages[this.state.currentPage];
    
    return (
      this.state.menuOpen ? <Menu close={this.toggleMenu} navigate={this.navigate}/> : 
      <MainContent>
        <MenuButton onClick={this.toggleMenu} src="images/menu.png"/>
        {mainContent}
        {(this.state.currentPage == "home" || this.state.currentPage == "list") && <AddButton onClick={()=>this.navigate("edit")}>add</AddButton>}
        {this.state.currentPage != "home" && <ExitButton src="/images/close.png" onClick={this.back}/>}
      </MainContent>
    );
  }
}

export default BaseContainer;

const MenuButton = styled.img`
  position: fixed;
  z-index: 100;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 10px;
  :hover {cursor: pointer}; 
`

const MainContent = styled.div`
  margin-top: 20px;
  padding: 20px;
`

const AddButton = styled.div`
  position: fixed;
  z-index: 100;
  right: 20px;
  bottom: 20px;
  border: 1px solid black;
  background-color: white;
  padding: 10px;
  :hover {cursor: pointer}; 
`

const ExitButton = styled.img`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  :hover {cursor: pointer};
`
