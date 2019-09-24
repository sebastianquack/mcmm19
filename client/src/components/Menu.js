import React, { Component } from 'react';
import styled from 'styled-components'
import { t } from '../helpers'

const uuidv1 = require('uuid/v1');

class LocaleToggle extends Component {
  render () {
    const localeOptions = ["en", "de"].map((l)=>
      <LocaleOption active={l == this.props.locale} onClick={()=>this.props.setLocale(l)}><span>{l}</span></LocaleOption>
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
    return (
      <MenuContainer>
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
