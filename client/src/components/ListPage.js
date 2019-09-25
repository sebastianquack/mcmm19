import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import { t } from '../helpers'

import styled from 'styled-components'

import MapComponent from './MapComponent.js';

class ListPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        entries: []
    }
  }

  async componentDidMount() {
    window.location.hash = this.props.mcmmId;

    axios.get(apiUrl + "/entry_by_user/" + this.props.mcmmId + "/")
    .then((response)=> {
      this.setState({ entries: response.data.docs})    
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  render() {

                
    const entries = this.state.entries.map((e, i)=>
      <ListItem key={i}>
        <EditLink onClick={()=>{this.props.editEntry(e)}}>
          {e.musician} {e.city} {e.year}
        </EditLink>
      </ListItem>);
    return (
      <Container>
        <List>{entries}</List>

        <p>This is your secret edit link: <a href={"#"+this.props.mcmmId}>{"#"+this.props.mcmmId}</a></p>
        <p>Bookmark it to manage your entries later or from other devices. If you lose it, you might lose access to your entries.</p>
      
        <ShowMyEntriesButton onClick={()=>{this.props.setUserFilter([this.props.mcmmId])}}>
          {t(this.props.translations, "show_my_entries", this.props.locale)}
        </ShowMyEntriesButton>
      </Container>
    );
  }
}

export default ListPage;

const ShowMyEntriesButton = styled.div`
  font-family: NeutraTextDemi;
  margin-top: 1rem;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Container = styled.div`
  padding: 1.25rem;
`

const EditLink = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  };
`

const List = styled.ul`
  padding-left: 0px;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
`
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.3125rem;
  border-bottom: 1px dashed black;
  padding-bottom: 0.3125rem;

`

const Dot = styled.span`
  display: inline-block;
  background-image: url(/images/dot.png);
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
`