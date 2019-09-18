import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled from 'styled-components'

const mapStyles = require('./GoogleMapStyles.json')
const google = window.google;

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.markers = [];
    this.lines = [];
    this.infoWindows = [];

    this.state = {
      entries: []
    }

    this.fetchData = this.fetchData.bind(this);
    this.drawMap = this.drawMap.bind(this);
  } 

  fetchData() {
    let params = {}

    if(this.props.musicianFilter) {
      params.musician = this.props.musicianFilter;
    }
    if(this.props.userFilter) {
      params.userIds = JSON.stringify(this.props.userFilter);
    }

    axios.get(apiUrl + "/map_entries/", {params})
      .then((response)=> {
        console.log(response);
        this.setState({ entries: response.data}, this.drawMap);
    })
      .catch((e)=> {
        console.log(e);
    });
  }

  componentDidMount() {
    this.fetchData();

    this.map = new google.maps.Map(this.mapContainerRef.current, {
      zoom: 1,
      center: {lat: 0, lng: 0},
      streetViewControl: false, 
      fullscreenControl: false, 
      mapTypeControl: false,
      styles: mapStyles // change default map styles
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter) {
      this.markers.forEach(m=>{
        m.setMap(null);
      });
      this.markers = [];
      this.entries = [];
      this.fetchData();
    }
  }

  drawMap() {
    
      const icon = {
        url: "/images/dot.png", // url
        scaledSize: {height: 30, width: 30}, // scaled size
        origin: {x:0, y:0}, // origin
        anchor: {x:12.5, y:12.5}, // anchor
        labelOrigin: new google.maps.Point(12.5, 12.5)
      };
      var latlngbounds = new window.google.maps.LatLngBounds();

      Object.keys(this.state.entries).forEach(k=>{      

        let firstEntry = this.state.entries[k][0];

        // add markers for user
        let marker = new google.maps.Marker({
            position: firstEntry.cityLocation,
            icon: icon,
            /*label: {
              color: "#fff",
              fontSize: "14px",
              text: "entry text on map if needed",
            },*/
            map: this.map,
        })

        let content = firstEntry.city + "<br>";
        this.state.entries[k].forEach((e) => {
          content += e.musician + " " + e.year + "<br>";
        });
          
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });

        marker.addListener('click', function() {
          infoWindow.open(this.map, marker);
        });

        this.markers.push(marker)
        this.infoWindows.push(infoWindow);
        latlngbounds.extend(firstEntry.cityLocation);
      })
        
        /*
        // add lines for user
        user.entries.slice(0, -1).forEach((e, index)=>
          this.lines.push(
            new google.maps.Polyline({
              path: [user.entries[index].cityLocation, user.entries[index+1].cityLocation],
              //geodesic: true,
              strokeColor: '#aaa',
              strokeOpacity: 1.0,
              strokeWeight: 1
            })
          )
        );
        */

      this.lines.forEach(l=>l.setMap(this.map));
      this.map.fitBounds(latlngbounds);
  
  }

  render() {
    return (
      <MapContainer ref={this.mapContainerRef} />
    )
  }
}

export default MapComponent;

const MapContainer = styled.div`
  width: 100%; 
  height: 100%;
  visibility: ${props => props.visible != false ? "visible" : "hidden"}
`
