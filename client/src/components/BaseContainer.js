import React, { Component } from 'react';
import "css-reset-and-normalize";
import { createGlobalStyle } from "styled-components";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ReactResizeDetector from 'react-resize-detector';

import Menu from './Menu.js';
import ListPage from './ListPage.js';
import HomePage from './HomePage.js';
import EditPage from './EditPage.js';
import ScanPage from './ScanPage.js';
import StaticPage from './StaticPage.js';

import axios from 'axios';
import { apiUrl } from '../helpers'

import { isLargeScreen } from '../helpers/'
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
      navStack: [],
      userFilter: [],
      musicianFilter: null,
      translations: [],
      locale: "de"
    }

    this.setUserFilter = this.setUserFilter.bind(this);
    this.setMusicianFilter = this.setMusicianFilter.bind(this);
    this.setLocale = this.setLocale.bind(this);
  }

  onResize = (width, height) => {
    console.log(this.state.largeScreen)
    this.setState({
      largeScreen: isLargeScreen(width, height),
    })
  }  

  setLocale = (l)=> {
    this.setState({locale: l})
  }

  setUserFilter(filter) {
    this.setState({
      userFilter: filter
    }, ()=>{
      this.navigate("home");
    });
  }

  setMusicianFilter(musician) {
    this.setState({
      musicianFilter: musician,
      userFilter: []
    })
  }

  async componentDidMount() {
    disableBodyScroll(document.querySelector('body'))
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
  
    let response = await axios.get(apiUrl + "/translation");
    console.log(response);
    this.setState({translations: response.data.docs});

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
      currentEntry: entry,
      pageKey: entry
    });
    if(page != "list") {
      window.history.pushState("", document.title, window.location.pathname);
    }
  }

  reset = () => {
    this.setUserFilter([]);
    this.navigate("home");
  }

  back = () => {
    if(this.state.currentPage == "scan") {
      this.navigate("home");
      return;
    }

    let navStack = this.state.navStack;
    let previousPage = navStack.pop();
    this.setState({navStack});
    this.navigate(previousPage, this.state.entry, true);
  }

  render() {
    const showFilterBar = (this.state.userFilter.length > 0 || this.state.musicianFilter)

    const pages = {
      "home": <HomePage mcmmId={this.state.mcmmId} 
        userFilter={this.state.userFilter} 
        setUserFilter={this.setUserFilter}
        musicianFilter={this.state.musicianFilter}
        setMusicianFilter={this.setMusicianFilter}
        largeScreen={this.state.largeScreen}
        translations={this.state.translations}
        locale={this.state.locale}
        />,
      "list": <ListPage 
        mcmmId={this.state.mcmmId} editEntry={(entry)=>{this.navigate("edit", entry)}}
        translations={this.state.translations}
        locale={this.state.locale}
        />,
      "edit": <EditPage 
        mcmmId={this.state.mcmmId} back={this.back} 
        entry={this.state.currentEntry}
        translations={this.state.translations}
        locale={this.state.locale}
        />,
      "scan": <ScanPage 
        mcmmId={this.state.mcmmId} setUserFilter={this.setUserFilter}
        translations={this.state.translations}
        locale={this.state.locale}
      />,
      "page": <StaticPage
        translations={this.state.translations}
        locale={this.state.locale}
        pageKey={this.state.pageKey}
      />  
    }
    let mainContent = pages[this.state.currentPage];
    
    return (
      [
        <GlobalStyles key="globalstyles" />,
        <ReactResizeDetector key="resize" handleWidth handleHeight onResize={this.onResize} />,
        this.state.menuOpen ?
        <Menu 
          key="main" 
          close={this.toggleMenu} 
          navigate={this.navigate}
          translations={this.state.translations}
          locale={this.state.locale}
          setLocale={this.setLocale}
        /> 
        : 
          <MainContent key="main">
            {!(this.state.userFilter.length > 0 || this.state.musicianFilter) && <MenuButton onClick={this.toggleMenu} src="images/menu.png"/>}
            {mainContent}
            {(this.state.currentPage === "home" && !showFilterBar || this.state.currentPage == "list") && 
              <AddButton onClick={()=>this.navigate("edit")} largeScreen={this.state.largeScreen}>
                +
              </AddButton>
            }
            {this.state.currentPage !== "home" && 
              <ExitButton src="/images/close.png" onClick={this.back}/>
            }
          </MainContent>
      ]
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
  &:hover {cursor: pointer}; 
`

const MainContent = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
`

const AddButton = styled.div`
  position: fixed;
  z-index: 100;
  right: 1rem;
  bottom: ${ props => (props.largeScreen ? "9rem" : "2rem") };
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  line-height: 1.1rem;
  text-align: center;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
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
const GlobalStyles = createGlobalStyle`
`