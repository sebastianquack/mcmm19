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
import InfoBar from './InfoBar.js';
import Circles from './Circles.js';

import axios from 'axios';
import { apiUrl, capitalize, t } from '../helpers'

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
      yearFilter: null,
      translations: [],
      locale: "de",
      projectionId: null
    }

    this.setUserFilter = this.setUserFilter.bind(this);
    this.setMusicianFilter = this.setMusicianFilter.bind(this);
    this.setYearFilter = this.setYearFilter.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.pollFilter = this.pollFilter.bind(this);
    this.handleFilterClose = this.handleFilterClose.bind(this);

  }

  onResize = (width, height) => {
    this.setState({
      largeScreen: isLargeScreen(width, height),
    })
  }  

  setLocale = (l)=> {
    this.setState({locale: l})
  }

  setUserFilter(filter) {
    this.setState({
      userFilter: filter,
      musicianFilter: null,
      yearFilter: null
    }, ()=>{
      if(this.state.currentPage != "home") {
        this.navigate("home");  
      }
    });
  }

  setMusicianFilter(musician) {
    this.setState({
      musicianFilter: musician,
      userFilter: [],
      yearFilter: null
    })
  }

  setYearFilter(year) {
    this.setState({
      musicianFilter: null,
      userFilter: [],
      yearFilter: year
    })
  }

  pollFilter(id) {
    axios.get(apiUrl + "/filter?username=" + id)
    .then((response)=> {
      console.log(response);
      if(response.data && response.data.docs && response.data.docs.length) {
        let ids = this.state.projectionId ? [] : [id];
        response.data.docs[0].filter.forEach(filterId=>{ids.push(filterId)});
        this.setUserFilter(ids);  
      }
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  handleFilterClose() {

    console.log("handleFilterClose");

    axios.get(apiUrl + "/remove_filter/" + (this.state.projectionId ? this.state.projectionId : this.state.mcmmId))
    .then((response)=> {
      console.log(response);
    })
    .catch((e)=> {
      console.log(e);
    });

    this.setUserFilter([]);
    this.setMusicianFilter(null);
    this.setYearFilter(null);
  }


  async componentDidMount() {

    // setTimeout(()=>this.navigate("scan"), 100  )

    disableBodyScroll(document.querySelector('body'))

    let queryParams = new URLSearchParams(window.location.search); 
    let projection_id = queryParams.get("projection_id");
    
    if(projection_id) {

      this.setState({
        projectionId: projection_id
      });

      // start polling for filter
      this.pollInterval = setInterval(()=>{this.pollFilter(projection_id)}, 5000);
      
    } else {

      let hash = window.location.hash;
      let mcmmId = localStorage.getItem('mcmmId');  
      if(hash) {
        mcmmId = hash.substr(1);
        this.setState({
          currentPage: "list",
          mcmmId: mcmmId,
          menuOpen: true,
          navStack: ["home"]
        })
      }
      if(!mcmmId) {
        mcmmId = uuidv1();
      }
      this.setState({mcmmId: mcmmId});  
      localStorage.setItem('mcmmId', mcmmId);    
  
    }
  
    let response = await axios.get(apiUrl + "/translation");
    console.log(response);
    this.setState({translations: response.data.docs});
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  toggleMenu = ()=>{
    if (this.state.menuOpen) {
      if(this.state.currentPage == "edit") {
        this.back();
        return;
      }

      this.navigate("home")
    }
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
      menuOpen: page !== "home",
      currentPage: page,
      currentEntry: entry,
      pageKey: entry
    });
    if(page != "list") {
      let pathName = window.location.pathname + (this.state.projectionId ? "?projection_id=" + this.state.projectionId : "")
      window.history.pushState("", document.title, pathName);
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
    const showFilterBar = (this.state.userFilter.length > 0 || this.state.musicianFilter || this.state.yearFilter)

    const pages = {
      "home": <HomePage mcmmId={this.state.mcmmId} 
        userFilter={this.state.userFilter} 
        setUserFilter={this.setUserFilter}
        musicianFilter={this.state.musicianFilter}
        setMusicianFilter={this.setMusicianFilter}
        yearFilter={this.state.yearFilter}
        setYearFilter={this.setYearFilter}
        largeScreen={this.state.largeScreen}
        translations={this.state.translations}
        locale={this.state.locale}
        />,
      "list": <ListPage 
        mcmmId={this.state.mcmmId} editEntry={(entry)=>{this.navigate("edit", entry)}}
        translations={this.state.translations}
        locale={this.state.locale}
        setUserFilter={this.setUserFilter}
        titleKey="my_entries"
        navigate={this.navigate}
        />,
      "edit": <EditPage 
        mcmmId={this.state.mcmmId} back={this.back} 
        entry={this.state.currentEntry}
        translations={this.state.translations}
        locale={this.state.locale}
        titleKey={this.state.currentEntry ? "update entry" : "new entry"}
        />,
      "scan": <ScanPage 
        mcmmId={this.state.mcmmId} setUserFilter={this.setUserFilter}
        translations={this.state.translations}
        locale={this.state.locale}
        pollFilter={this.pollFilter}
        titleKey="scanner"
      />,
      "page": <StaticPage
        translations={this.state.translations}
        locale={this.state.locale}
        pageKey={this.state.pageKey}
        titleKey={this.state.pageKey + "_heading"}
      />  
    }
    let mainContent = pages["home"];

    const page = this.state.currentPage !== "home" ? pages[this.state.currentPage] : null
    
    return (
      [
        <GlobalStyles key="globalstyles" />,
        <ReactResizeDetector key="resize" handleWidth handleHeight onResize={this.onResize} />,
        <Menu 
          menuOpen={this.state.menuOpen}
          key="menu" 
          close={this.toggleMenu} 
          navigate={this.navigate}
          translations={this.state.translations}
          locale={this.state.locale}
          setLocale={this.setLocale}
          reset={this.reset}
          projectionMode={this.state.projectionId ? true : false}
          render={page}
        />, 
        <MainContent key="main">
          <Circles/>
          
          {!showFilterBar && 
            <MenuBar>
              <MenuButton onClick={this.toggleMenu} src="images/menu.png"/>
              <MenuText>MATCH CUT</MenuText>
            </MenuBar>
          }
          
          {showFilterBar && 
            <InfoBar onClose={this.handleFilterClose} menuOpen={this.state.menuOpen}>
              {(this.state.userFilter.length > 0) && <span>{t(this.state.translations, "filter_for", this.state.locale)} {this.state.userFilter.length} {t(this.state.translations, "users", this.state.locale)}</span>}
              {(this.state.musicianFilter) && <span>{t(this.state.translations, "filter_for", this.state.locale)} {t(this.state.translations, "users_that_named", this.state.locale)} {capitalize(this.state.musicianFilter)}</span>}
              {(this.state.yearFilter) && <span>{t(this.state.translations, "filter_for", this.state.locale)} {t(this.state.translations, "entries_from_year", this.state.locale)} {this.state.yearFilter}</span>}
            </InfoBar>
          }

          {mainContent}
          {(this.state.currentPage === "home" && !showFilterBar || this.state.currentPage == "list") && 
            <AddButton onClick={()=>this.navigate("edit")} largeScreen={this.state.largeScreen}>
              +
            </AddButton>
          }
        </MainContent>
      ]
    );
  }
}

export default BaseContainer;

const MenuBar = styled.div`
  position: fixed;
  top:0;
  z-index: 100;
  display: flex;
  padding: 1rem;
`

const MenuText = styled.span`
  font-size: 2.5rem;
  padding-left: 1rem;
  letter-spacing: 0.2ex;
`

const MenuButton = styled.img`
  width: auto;
  height: calc(2 * 1.25rem); // scaling factor for the png image * font-size
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
  width: 3rem;
  height: 3rem;
  font-size: 4rem;
  line-height: 1.2rem;
  font-family: NeutraTextLight;
  text-align: center;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  &:hover {cursor: pointer}; 
`

const GlobalStyles = createGlobalStyle`
`