import React, { Component } from 'react';

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
  } 

  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainerRef.current, {
      zoom: 1,
      center: {lat: 0, lng: 0},
      streetViewControl: false, 
      fullscreenControl: false, 
      mapTypeControl: false,
      styles: mapStyles // change default map styles
    });
  } 

  componentDidUpdate(prevPros) {
    if(!this.markers.length && this.props.entries) {
      const icon = {
        url: "/images/dot.png", // url
        scaledSize: {height: 30, width: 30}, // scaled size
        origin: {x:0, y:0}, // origin
        anchor: {x:12.5, y:12.5}, // anchor
        labelOrigin: new google.maps.Point(12.5, 12.5)
      };
      var latlngbounds = new window.google.maps.LatLngBounds();

      this.props.entries.forEach(user=>{      

        // add markers for user
        user.entries.forEach((e)=>{
          let marker = new google.maps.Marker({
              position: e.cityLocation,
              icon: icon,
              /*label: {
                color: "#fff",
                fontSize: "14px",
                text: "entry text on map if needed",
              },*/
              map: this.map,
          })
          
          let infoWindow = new google.maps.InfoWindow({
            content: e.city + " " + e.musician + " " + e.year
          });

          marker.addListener('click', function() {
            infoWindow.open(this.map, marker);
          });

          this.markers.push(marker)
          this.infoWindows.push(infoWindow);
          latlngbounds.extend(e.cityLocation);
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

      });
      this.lines.forEach(l=>l.setMap(this.map));
      this.map.fitBounds(latlngbounds);
    }
  }

  render() {
    return (
      <MapContainer ref={this.mapContainerRef} />
    )
  }
}

export default MapComponent;

const MapContainer = styled.div`
  display: flex;
  width: 100%; 
  height: 400px;
  box-sizing: border-box;
  flex-direction: column;
  visibility: ${props => props.visible != false ? "visible" : "hidden"}
`
