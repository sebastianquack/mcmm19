import React, { Component } from 'react';
import styled from 'styled-components'

import { t } from '../helpers'
import InfoBar from './InfoBar.js'

const uuidv1 = require('uuid/v1');

class LocaleToggle extends Component {
  render () {
    const localeOptions = ["en", "de"].map((l)=>
      <LocaleOption key={l} active={l == this.props.locale} onClick={()=>this.props.setLocale(l)}><span>{l}</span></LocaleOption>
    )
    return (
      <div>
        <LocaleContainer>
          {localeOptions}        
        </LocaleContainer>
      </div>
    )
  }
}

const LocaleContainer = styled.ul`
  margin-left: 0px;
  padding-left: 0px;
  margin-top: 40px;
`

const LocaleOption = styled.li`
  text-decoration: none;
  list-style: none;
  font-size: 16px;
  span { 
    font-weight: ${props=>props.active ? "bold" : "default"}; 
    padding: 5px;
  }
  :hover {cursor: ${props=>props.active ? "default" : "pointer"}};
  :first-child {:after { content: "/" }};
  display: inline-block;
`


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    console.log(this.props.render)

    const title = this.props.render && this.props.render.props.titleKey
      ? t(this.props.translations, this.props.render.props.titleKey, this.props.locale) 
      : t(this.props.translations, "menu", this.props.locale)

    return (
      [<MenuShadow onClick={this.props.close} menuOpen={this.props.menuOpen}/>,
      <MenuContainer menuOpen={this.props.menuOpen}>

        <InfoBar onClose={this.props.close}>
          { title }
        </InfoBar>

        { this.props.render 
          ? 
            <ContentContainer>
              {this.props.render}
            </ContentContainer>
          :
            <ContentContainer>
              <MenuContent>
                <MenuButton onClick={this.props.reset}>{t(this.props.translations, "home", this.props.locale)}</MenuButton>
                <MenuButton onClick={()=>this.props.navigate("page", "programm")}>{t(this.props.translations, "programm", this.props.locale)}</MenuButton>
                {!this.props.projectionMode && <MenuButton onClick={()=>this.props.navigate("list")}>{t(this.props.translations, "my_entries", this.props.locale)}</MenuButton>}
                {!this.props.projectionMode && <MenuButton onClick={()=>this.props.navigate("scan")}>{t(this.props.translations, "scanner", this.props.locale)}</MenuButton>}
                <MenuButton onClick={()=>this.props.navigate("page", "credits")}>{t(this.props.translations, "credits", this.props.locale)}</MenuButton>
                
                <LocaleToggle 
                  locale={this.props.locale} 
                  setLocale={this.props.setLocale}
                  translations={this.props.translations}
                />
              </MenuContent>
            </ContentContainer>
        }

      </MenuContainer>]
    );
  }
}

export default Menu;

const MenuButton = styled.li`
  margin-bottom: 0.625rem;
  &:hover {cursor: pointer};
`

const MenuContainer = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: ${ props => (props.menuOpen ? "visibile" : "hidden") };
  z-index: 300;

  display: flex;
  flex-direction: column;
  background-color: white;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const MenuShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 300;
  display: ${ props => (props.menuOpen ? "block" : "none") };
`

const ContentContainer = styled.div`
  flex:1;
  padding-top: 0rem; // height of the top bar, ~4rem
  overflow-y: auto;
`

const MenuContent = styled.ul`
  padding: 1.25rem;
  font-size: 1.25rem;
`