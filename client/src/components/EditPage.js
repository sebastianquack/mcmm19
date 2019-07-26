import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import ReactAutocomplete from 'react-autocomplete';

import styled from 'styled-components'

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musician: this.props.entry ? this.props.entry.musician : "",
      city: this.props.entry ? this.props.entry.city : "",
      year: this.props.entry ? this.props.entry.year : "",
      note: this.props.entry ? this.props.entry.note : "",
      _id: this.props.entry ? this.props.entry._id : null,
      musicians: [],
      cities: [],
      changed: false
    }
  }

  async componentDidMount() {
    axios.get(apiUrl + "/entry_uniques/")
    .then((response)=> {
      console.log(response);
      this.setState({musicians: response.data.musicians})    
      this.setState({cities: response.data.cities})    
    })
    .catch((e)=> {
      console.log(e);
    });
  }

  handleSubmit = (event)=> {
    console.log(this.state);

    if(!this.state._id) {
      axios.post(apiUrl + '/entry', {
        musician: this.state.musician, 
        city: this.state.city,
        year: parseInt(this.state.year),
        note: this.state.note,
        user_id: this.props.mcmmId
      })
      .then((response)=> {
        console.log(response);
        this.setState({_id: response.data._id, changed: false})
      })
      .catch((error)=> {
        console.log(error);
      });
    
    } else {

      axios.put(apiUrl + '/entry/' + this.state._id, {
        musician: this.state.musician, 
        city: this.state.city,
        year: parseInt(this.state.year),
        note: this.state.note,
        user_id: this.props.mcmmId
      })
      .then((response)=> {
        console.log(response);
        this.setState({_id: response.data._id, changed: false})
      })
      .catch((error)=> {
        console.log(error);
      });

    }
  }

  handleDelete = () => {

    if(window.confirm("really?")) {
        axios.delete(apiUrl + '/entry/' + this.state._id, {        
      })
      .then((response)=> {
        console.log(response);
        this.props.back();
      })
      .catch((error)=> {
        console.log(error);
      });

    }

  }

  handleInputChange = (event)=> {
    const target = event.target;
    const name = target.name;
    const value = name != "year" || (name == "year" && !isNaN(target.value)) ? target.value : this.state.year;

    this.setState({
      [name]: value,
      changed: true
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state._id ? "update entry" : "new entry"}</h1>
        <form>
          <Label>musician/composer/band</Label> 
          
          <ReactAutocomplete
            items={this.state.musicians.map((m)=>{return {value: m}})}
            getItemValue={item => item.value}
            shouldItemRender={(item, value) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1}
            renderItem={(item, highlighted) =>
              <div
                key={item.value}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.value}
              </div>
            }
            value={this.state.musician}
            onChange={(e) => this.setState({musician: e.target.value, changed: true})}
            onSelect={(val) => this.setState({musician: val, changed: true})}
            wrapperStyle={{display: "block"}}
            inputProps={{style: autocompleteInputStyle}}
          />

          <br/>
          <Label>city</Label> 
          
          <ReactAutocomplete
            items={this.state.cities.map((c)=>{return {value: c}})}
            getItemValue={item => item.value}
            shouldItemRender={(item, value) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1}
            renderItem={(item, highlighted) =>
              <div
                key={item.value}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.value}
              </div>
            }
            value={this.state.city}
            onChange={(e) => this.setState({city: e.target.value, changed: true})}
            onSelect={(val) => this.setState({city: val, changed: true})}
            wrapperStyle={{display: "block"}}
            inputProps={{style: autocompleteInputStyle}}
          />

          <br/>
          <Label>year</Label>
          <Input autoComplete="off" type="text" name="year" value={this.state.year} onChange={this.handleInputChange}/>
          <br/>
          <Label>note</Label>
          <Textarea name="note" value={this.state.note} onChange={this.handleInputChange}/>
          <br/>
          {this.state.changed && <Button onClick={this.handleSubmit}>save</Button>}
          {this.state._id && <Button onClick={this.handleDelete}>delete entry</Button>}
        </form>
      </div>
    );
  }
}

export default EditPage;

const Label = styled.label`
  display: inline-block;
  width: 200px;
  margin-top: 10px;
  margin-bottom: 5px;
`

const autocompleteInputStyle = {width: "100%", height: "2em", fontSize: "200%", boxSizing: "border-box"};

const Input = styled.input`
  font-size: 200%;
  text-align: left;
  width: 100%;
  height: 2em;
  box-sizing: border-box;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 150%;
  box-sizing: border-box;
`

const Button = styled.div`
  width: 100%;
  margin-top: 20px;
  :hover {cursor: pointer};
  text-align: center;
`