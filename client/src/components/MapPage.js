import React, { Component } from 'react';

import styled from 'styled-components'

const mapStyles = require('./GoogleMapStyles.json')
const google = window.google;

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
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
    if(!this.markers && this.props.entries.length) {
      const icon = {
        url: "/images/dot.png", // url
        scaledSize: {height: 25, width: 25}, // scaled size
        origin: {x:0, y:0}, // origin
        anchor: {x:12.5, y:12.5} // anchor
      };

      this.markers = this.props.entries.map((e, index)=>
        new google.maps.Marker({
          position: e.cityLocation,
          icon: icon,
          label: {
            color: "#fff",
            fontSize: "12px",
            text: (index + 1).toString(),
          },
          map: this.map,
        })
      );
      
      var latlngbounds = new window.google.maps.LatLngBounds();
      this.props.entries.forEach(e=>{latlngbounds.extend(e.cityLocation)});
      this.map.fitBounds(latlngbounds);
      
      const lines = this.props.entries.slice(0, -1).map((e, index)=>
        new google.maps.Polyline({
          path: [this.props.entries[index].cityLocation, this.props.entries[index+1].cityLocation],
          geodesic: true,
          strokeColor: '#444',
          strokeOpacity: 1.0,
          strokeWeight: 1
        })
      );

      lines.forEach(l=>l.setMap(this.map));
    }
  }

  render() {
    return (
      <MapContainer ref={this.mapContainerRef} />
    )
  }
}

export default MapPage;

const MapContainer = styled.div`
  display: flex;
  width: 100%; 
  height: 300px;
  box-sizing: border-box;
  flex-direction: column;
  visibility: ${props => props.visible != false ? "visible" : "hidden"}
`
