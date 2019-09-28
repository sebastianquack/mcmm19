import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl } from '../helpers'

import styled, { keyframes } from 'styled-components'

import { capitalize, makeMarkerSize, t } from '../helpers'

class InfoWindow extends Component {
  constructor(props) {
    super(props);
      this.state = {
        entryIndex: 0
    }

    this.nextEntry = this.nextEntry.bind(this);
  }

  nextEntry = ()=> {
    if(this.state.entryIndex < this.props.entries.length - 1) {
      this.setState({entryIndex: this.state.entryIndex + 1})  
    } else {
      this.setState({entryIndex: 0})  
    }
  }

  render() {

    let entries = this.props.entries.map((e, index)=>
      <Entry>
        
        <CloseButton onClick={this.props.close} src="/images/closeWhite.png"/>
        <PageNum><Bold>{capitalize(e.city)}</Bold> {this.state.entryIndex + 1}/{this.props.entries.length}</PageNum>
        <p>
        <Bold>{e.year}</Bold> {t(this.props.translations, "listening_to", this.props.locale)} <MusicianLink
          onClick={()=>{this.props.setMusicianFilter(e.musician)}}
        >>&nbsp;{capitalize(e.musician)}</MusicianLink>
        </p> 
        <Note>
        {e.note ? '"'+e.note+'"' : t(this.props.translations, "ohne_worte", this.props.locale)}
        </Note>
        <Link onClick={()=>{this.props.setUserFilter([e.user_id])}}>{t(this.props.translations, "zur_bio", this.props.locale)}</Link>
        {this.props.entries.length > 1 &&
          <NextLink largeScreen={this.props.largeScreen} onClick={(e)=>{e.stopPropagation(); this.nextEntry();}}>{t(this.props.translations, "next_entry", this.props.locale)}</NextLink>}
        
      </Entry>
    );  
    
    return (
      <InfoWindowContainer largeScreen={this.props.largeScreen}>{entries[this.state.entryIndex]}</InfoWindowContainer>
    )
  }
}

const Bold = styled.span`
  font-family: NeutraText;
`

const InfoWindowContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  width: ${props => props.largeScreen ? "50%" : "100%"};
  
  background-color: #000;
  color: #fff;
  padding: 25px;
  font-family: NeutraTextDemi;
  font-size: 1.2rem;
  max-height: 100%;
  overflow-y: scroll;
  z-index: 200;
`

const CloseButton = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  :hover {
    cursor: pointer;
  };
` 

const Entry = styled.div`
`

const PageNum = styled.p`
  margin-bottom: 0.5rem;
`

const Note = styled.div`
  font-family: NeutraTextLightItalic;
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`

const Link = styled.span`
  display: block;
  font-size: 1rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const NextLink = styled.span`
  margin-top: 1rem;
  margin-bottom: ${props => props.largeScreen ? "0rem" : "1rem"};
  float: right;
  font-size: 1rem;
  display: block;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const MusicianLink = styled.span`
  font-family: NeutraText;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`


const mapStyles = require('./GoogleMapStyles.json')
const google = window.google;
const MarkerClusterer = window.MarkerClusterer;

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.infoWindowRef = React.createRef();
    this.markers = [];
    this.lines = [];
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
      zoom:4,
      center: {lat: 0, lng: 0},
      streetViewControl: false, 
      fullscreenControl: false, 
      mapTypeControl: false,
      maxZoom: 10,
      zoomControl: false,
      styles: mapStyles, // change default map styles
      backgroundColor: 'hsla(0, 0%, 0%, 0)',
    });

  }

  componentDidUpdate(prevProps) {
    if(this.props.musicianFilter !== prevProps.musicianFilter || 
      this.props.userFilter !== prevProps.userFilter ||
      this.props.yearFilter !== prevProps.yearFilter) {
      console.log("componentDidUpdate");
      if(this.markerCluster)
          this.markerCluster.clearMarkers();
      this.markers.forEach(m=>{
        m.setMap(null);
      });
      this.markers = [];
      this.entries = [];
      this.fetchData();
    }
  }

  drawMap() {

      let filterMode = (this.props.musicianFilter || (this.props.userFilter && this.props.userFilter.length > 0) || this.props.yearFilter);
    
      const icon = {
        url: "/images/marker.svg", // url
        scaledSize: {height: 30, width: 30}, // scaled size
        origin: {x:0, y:0}, // origin
        anchor: {x:12.5, y:12.5} // anchor
      };

      const iconResized = (size) => {
        const base = 15
        const scaled = base * size
        return {
        ...icon,
        labelOrigin: new google.maps.Point(12.5, scaled + 10),
        scaledSize: { 
          height: scaled,
          width: scaled
        },
        anchor: {
          x: scaled/2, 
          y:scaled/2
        },
        
      }}

      var latlngbounds = new window.google.maps.LatLngBounds();

      Object.keys(this.state.entries).forEach((k)=>{      

        let firstEntry = this.state.entries[k][0];

        // check if there is already a marker at this location for example multiple spellings of same place!
        let duplicateLocation = false;
        let duplicateMarker = null;
        this.markers.forEach((m, index2)=>{
          if(firstEntry.cityLocation.lat == m.position.lat() && 
            firstEntry.cityLocation.lng == m.position.lng()) {
            m.entries = m.entries.concat(this.state.entries[k])
            duplicateLocation = true;
            m.setIcon(iconResized(makeMarkerSize(m.entries.length)));
            console.log("duplicateLocation");
          }
        })

        // add markers for user
        const musicians = this.state.entries[k]
          .map( e => capitalize(e.musician) )
          .join(", ")
        const amount = this.state.entries[k].length

        if(!duplicateLocation) {
          let marker = new google.maps.Marker({
              position: firstEntry.cityLocation,
              icon: iconResized(makeMarkerSize(amount)),
              label: filterMode ? {
                color: "#000",
                fontSize: "1rem",
                fontFamily: "NeutraTextDemi",
                text: musicians,
              } : undefined,
              //map: this.map,
          }) 

          marker.entries = this.state.entries[k];
          marker.addListener('click', ()=> {
            this.props.setInfoWindow(marker.entries);
          });

          this.markers.push(marker)
          latlngbounds.extend(firstEntry.cityLocation);
        }        
      })

      this.map.fitBounds(latlngbounds);

      let listener = google.maps.event.addListener(this.map, "idle", (e)=> {
        google.maps.event.removeListener(listener);

        console.log("filterOn", this.props.filterOn);
        if(!this.props.filterOn) {
          this.markerCluster = new MarkerClusterer(this.map, this.markers,
          {
            gridSize: 60,
            minimumClusterSize: 2,
            styles: 
                  [{
                    fontFamily: 'NeutraTextDemi',
                    textColor: 'white',
                    textSize: 16,
                    url: '/images/star_group.svg',
                    height: 50,
                    width: 50
                  }]
          });
        } else {
          this.markers.forEach(m=>{
            m.setMap(this.map);
          })
        }

        google.maps.event.addListener(this.map, "click", (e)=> {
          this.props.setInfoWindow(null);
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
                strokeColor: '#000',
                strokeOpacity: 0.5,
                strokeWeight: 1
              })
            )
          });

          this.lines.forEach(l=>l.setMap(this.map));
        }

      });  
  }

  render() {
    return (
      [<MapContainer ref={this.mapContainerRef} />,
        <InfoWindowPlacer>{this.props.showInfoWindow && <InfoWindow 
          entries={this.props.showInfoWindow} 
          setUserFilter={this.props.setUserFilter}
          translations={this.props.translations}
          locale={this.props.locale}
          close={()=>this.props.setInfoWindow(null)}
          largeScreen={this.props.largeScreen}
          setMusicianFilter={this.props.setMusicianFilter}
          />
        }
        </InfoWindowPlacer>
      ]
    )
  }
}

export default MapComponent;

const MapContainer = styled.div`
  width: 100%; 
  height: 100%;
  /*background-image: url("/images/background5.png");
  background-size: cover;*/
  visibility: ${props => props.visible != false ? "visible" : "hidden"};
`

const InfoWindowPlacer = styled.div`
  

`

