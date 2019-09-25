import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'
import { t } from '../helpers'

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
    const value = name !== "year" || (name === "year" && !isNaN(target.value)) ? target.value : this.state.year;

    this.setState({
      [name]: value,
      changed: true
    });
  }

  fixYear = year => {
    const yearMax = new Date().getFullYear()
    const yearMin = 1950
    if ( year < yearMin && year !== "") year = yearMin
    if ( year > yearMax) year = yearMax
    return year
  }

  render() {
    return (
      <Container>
        <Form>
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
            wrapperStyle={{display: "block", opacity: 1}}
            inputProps={{style: autocompleteInputStyle}}
          />

          <br/>
          <Label>year</Label>
          <input 
            autoComplete="off" 
            size="4" 
            maxLength="4" 
            type="text" 
            name="year" 
            value={this.state.year} 
            onChange={this.handleInputChange} 
            onBlur={() => this.setState({year:this.fixYear(this.state.year)})} 
          />
          <br/>
          <Label>note</Label>
          <textarea name="note" maxlength="200" value={this.state.note} onChange={this.handleInputChange}/>
          <br/>
          {this.state.changed && <Button onClick={this.handleSubmit}>save</Button>}
          {this.state._id && <Button onClick={this.handleDelete}>delete entry</Button>}
        </Form>
      </Container>
    );
  }
}

export default EditPage;

const Container = styled.div`
  padding: 1.25rem;
`

const Label = styled.label`
  display: inline-block;
  width: 200px;
  margin-top: 10px;
  margin-bottom: 5px;
`

const autocompleteInputStyle = {};

const Form = styled.form`
  input, textarea {
    display: block;
    border:none;
    width: 100%;
    background-color: black;
    color: white;
    outline: none;
    box-sizing: border-box;
    padding: 0.5rem;
  }

  input {
    font-size: 200%;
    text-align: left;
    height: 2em;
    &[name="year"] {
      width: auto;
    }
  }

  textarea {
    height: 100px;
    font-size: 150%;
    font-family: NeutraTextLightItalic;
  }

  margin-bottom: 2rem;
`
const Button = styled.div`
  width: 100%;
  margin-top: 20px;
  :hover {cursor: pointer};
  text-align: center;
`