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
    if(this.props.userFilter && this.props.userFilter.length > 0) {
      params.userIds = JSON.stringify(this.props.userFilter);
    }
    if(this.props.yearFilter) {
      params.year = this.props.yearFilter;
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
      zoomControl: false,
      styles: mapStyles // change default map styles
    });

  }

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter || 
      this.props.userFilter !== prevProps.userFilter ||
      this.props.yearFilter !== prevProps.yearFilter) {
      this.markers.forEach(m=>{
        m.setMap(null);
      });
      this.markers = [];
      this.entries = [];
      this.fetchData();
    }
  }

  drawMap() {

      let filterMode = (this.props.musicianFilter || (this.props.userFilter && this.props.userFilter.length > 0));
    
      const icon = {
        url: "/images/marker.svg", // url
        scaledSize: {height: 30, width: 30}, // scaled size
        origin: {x:0, y:0}, // origin
        anchor: {x:12.5, y:12.5}, // anchor
        labelOrigin: new google.maps.Point(12.5, 40)
      };
      var latlngbounds = new window.google.maps.LatLngBounds();

      Object.keys(this.state.entries).forEach(k=>{      

        let firstEntry = this.state.entries[k][0];

        // assemble content
        let content = firstEntry.city + "<br>";
        let musicians = "";
        this.state.entries[k].forEach((e) => {
          content += e.musician + " " + e.year + "<br>";
          musicians += e.musician + " ";
        });
        
        // add markers for user
        let marker = new google.maps.Marker({
            position: firstEntry.cityLocation,
            icon: icon,
            label: filterMode ? {
              color: "#000",
              fontSize: "14px",
              text: musicians,
            } : undefined,
            map: this.map,
        })

        let infoWindow = new google.maps.InfoWindow({
          content: content
        });

        marker.addListener('click', ()=> {
          this.infoWindows.forEach(i=>{i.close()});
          infoWindow.open(this.map, marker);
        });

        this.markers.push(marker)
        this.infoWindows.push(infoWindow);
        latlngbounds.extend(firstEntry.cityLocation);
      })

      google.maps.event.addListener(this.map, "click", (e)=> {
        this.infoWindows.forEach(i=>{i.close()});
      });
        
      this.lines.forEach(l=>l.setMap(null));
      this.lines = [];
      
      if(filterMode) {
        
        let paths = {};
        
        // gather path data
        Object.keys(this.state.entries).forEach(k=>{      
          this.state.entries[k].forEach(e=>{

            if(!paths[e.user_id]) {
              paths[e.user_id] = [];
            }
            paths[e.user_id].push({
              location: e.cityLocation,
              year: e.year
            });
          })
        });

        console.log(paths);

        // sort entries by year and assemble polylines
        Object.keys(paths).forEach(k=>{
          let p = paths[k];
          p.sort((a, b)=>{return b.year-a.year});
          let locationPath = p.map(l=>{return {lat: l.location.lat, lng: l.location.lng}});
          this.lines.push(
            new google.maps.Polyline({
              path: locationPath,
              //geodesic: true,
              strokeColor: '#aaa',
              strokeOpacity: 1.0,
              strokeWeight: 1
            })
          )
        });

        this.lines.forEach(l=>l.setMap(this.map));
      }
      
      this.map.fitBounds(latlngbounds);
      var zoom = this.map.getZoom();
      this.map.setZoom(zoom < 2 ? 2 : zoom); // minimum initial zoom is 2, so there are no visible borders
  
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
  visibility: ${props => props.visible != false ? "visible" : "hidden"};

  .gm-style .gm-style-iw-t::after {
    /* popup triangle */
    /* background: linear-gradient(45deg,rgba(0,0,0,1) 50%,rgba(0,0,0,,0) 51%,rgba(0,0,0,0,0) 100%); */
    display: none;
  }

  .gm-style button {
    background-image: url("/images/closeWhite.png") !important;
    background-size: cover !important;
    top: 0.25rem !important;
    right: 0.25rem !important;
    padding: 0.25rem !important;
    width: 1rem !important;
    height: 1rem !important;
    opacity: 1;

    img {
      visibility: hidden;
    }
  }

  .gm-style-iw-d {
    overflow: hidden !important;
  }

  .gm-style .gm-style-iw-c {
    border-radius: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: black;
    color: white;
    transform: translate(0%,-100%);
    top: 1rem;
    z-index: 10;

    padding: 1rem 0.25rem 0.25rem 0.25rem !important;

    &, *::after, *::before {
      border: none;
    }
  }
`
