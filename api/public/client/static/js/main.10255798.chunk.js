(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(e,t,n){e.exports=n(93)},54:function(e,t,n){},78:function(e){e.exports=[{elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f5f5"}]},{featureType:"administrative.land_parcel",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#dadada"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#c9c9c9"}]},{featureType:"water",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]}]},93:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(16),o=n.n(i),s=(n(54),n(2)),l=n(13),c=n.n(l),u=n(14),p=n(3),h=n(4),m=n(6),f=n(5),d=n(10),y=n(7),g=(n(56),n(1)),b=n(38),v=n(45),k="/api",F=function(e,t){return e>600&&t>400};function O(e,t,n){for(var r=0;r<e.length;r++)if(e[r].key==t){var a=e[r]["content_"+n];return a||"["+t+"]"}return"["+t+"]"}function j(){var e=Object(s.a)(["\n  padding: 4rem 1rem 1rem 2rem;\n"]);return j=function(){return e},e}function E(){var e=Object(s.a)(["\n  position: fixed;\n  top: 1rem;\n  right: 1rem;\n  width: 30px;\n  height: 30px;\n  &:hover {cursor: pointer};\n"]);return E=function(){return e},e}function w(){var e=Object(s.a)(["\n  margin-bottom: 10px;\n  &:hover {cursor: pointer};\n"]);return w=function(){return e},e}function x(){var e=Object(s.a)(["\n  text-decoration: none;\n  list-style: none;\n  font-size: 16px;\n  span { \n    font-weight: ","; \n    padding: 5px;\n  }\n  :hover {cursor: ",'};\n  :first-child {:after { content: "/" }};\n  display: inline-block;\n']);return x=function(){return e},e}function S(){var e=Object(s.a)(["\n  margin-left: 0px;\n  padding-left: 0px;\n  margin-top: 40px;\n"]);return S=function(){return e},e}n(24);var I=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=["en","de"].map(function(t){return a.a.createElement(_,{active:t==e.props.locale,onClick:function(){return e.props.setLocale(t)}},a.a.createElement("span",null,t))});return a.a.createElement("div",null,a.a.createElement(C,null,t))}}]),t}(r.Component),C=g.b.ul(S()),_=g.b.li(x(),function(e){return e.active?"bold":"default"},function(e){return e.active?"default":"pointer"}),T=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement(z,null,a.a.createElement(M,{onClick:this.props.reset},O(this.props.translations,"home",this.props.locale)),a.a.createElement(M,{onClick:function(){return e.props.navigate("page","programm")}},O(this.props.translations,"programm",this.props.locale)),!this.props.projectionMode&&a.a.createElement(M,{onClick:function(){return e.props.navigate("list")}},O(this.props.translations,"my_entries",this.props.locale)),!this.props.projectionMode&&a.a.createElement(M,{onClick:function(){return e.props.navigate("scan")}},O(this.props.translations,"scanner",this.props.locale)),a.a.createElement(M,{onClick:function(){return e.props.navigate("page","credits")}},O(this.props.translations,"credits",this.props.locale)),a.a.createElement(I,{locale:this.props.locale,setLocale:this.props.setLocale,translations:this.props.translations}),a.a.createElement(D,{src:"/images/close.png",onClick:this.props.close}))}}]),t}(r.Component),M=g.b.li(w()),D=g.b.img(E()),z=g.b.ul(j()),L=n(8),U=n.n(L);function P(){var e=Object(s.a)(["\n  width: 100%; \n  height: 100%;\n  visibility: ",';\n\n  .gm-style .gm-style-iw-t::after {\n    /* popup triangle */\n    /* background: linear-gradient(45deg,rgba(0,0,0,1) 50%,rgba(0,0,0,,0) 51%,rgba(0,0,0,0,0) 100%); */\n    display: none;\n  }\n\n  .gm-style button {\n    display: none;\n\n    background-image: url("/images/closeWhite.png") !important;\n    background-size: cover !important;\n    top: 0.25rem !important;\n    right: 0.25rem !important;\n    padding: 0.25rem !important;\n    width: 1rem !important;\n    height: 1rem !important;\n    opacity: 1;\n\n    img {\n      visibility: hidden;\n    }\n  }\n\n  .gm-style-iw-d {\n    overflow: hidden !important;\n  }\n\n  .gm-style .gm-style-iw-c {\n    border-radius: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    background-color: black;\n    color: white;\n    transform: translate(0%,-100%);\n    top: 1rem;\n    z-index: 10;\n\n    padding: 1rem 0.25rem 0.25rem 0.25rem !important;\n\n    &, *::after, *::before {\n      border: none;\n    }\n  }\n']);return P=function(){return e},e}var Y=n(78),W=window.google,R=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).mapContainerRef=a.a.createRef(),n.markers=[],n.lines=[],n.infoWindows=[],n.state={entries:[]},n.fetchData=n.fetchData.bind(Object(d.a)(n)),n.drawMap=n.drawMap.bind(Object(d.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"fetchData",value:function(){var e=this,t={};this.props.musicianFilter&&(t.musician=this.props.musicianFilter),this.props.userFilter&&this.props.userFilter.length>0&&(t.userIds=JSON.stringify(this.props.userFilter)),this.props.yearFilter&&(t.year=this.props.yearFilter),U.a.get(k+"/map_entries/",{params:t}).then(function(t){console.log(t),e.setState({entries:t.data},e.drawMap)}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.fetchData(),this.map=new W.maps.Map(this.mapContainerRef.current,{zoom:1,center:{lat:0,lng:0},streetViewControl:!1,fullscreenControl:!1,mapTypeControl:!1,zoomControl:!1,styles:Y})}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter===e.musicianFilter&&this.props.userFilter===e.userFilter&&this.props.yearFilter===e.yearFilter||(this.markers.forEach(function(e){e.setMap(null)}),this.markers=[],this.entries=[],this.fetchData())}},{key:"drawMap",value:function(){var e=this,t=this.props.musicianFilter||this.props.userFilter&&this.props.userFilter.length>0||this.props.yearFilter,n={url:"/images/marker.svg",scaledSize:{height:30,width:30},origin:{x:0,y:0},anchor:{x:12.5,y:12.5},labelOrigin:new W.maps.Point(12.5,40)},r=new window.google.maps.LatLngBounds;if(Object.keys(this.state.entries).forEach(function(a){var i=e.state.entries[a][0],o=i.city+"<br>",s="";e.state.entries[a].forEach(function(e){o+=e.musician+" "+e.year+"<br>"+(e.note?'<em>"'+e.note+'"</em><br>':""),s+=e.musician+" "});var l=new W.maps.Marker({position:i.cityLocation,icon:n,label:t?{color:"#000",fontSize:"14px",text:s}:void 0,map:e.map}),c=new W.maps.InfoWindow({content:o});l.addListener("click",function(){e.infoWindows.forEach(function(e){e.close()}),c.open(e.map,l)}),e.markers.push(l),e.infoWindows.push(c),r.extend(i.cityLocation)}),W.maps.event.addListener(this.map,"click",function(t){e.infoWindows.forEach(function(e){e.close()})}),this.lines.forEach(function(e){return e.setMap(null)}),this.lines=[],t){var a={};Object.keys(this.state.entries).forEach(function(t){e.state.entries[t].forEach(function(e){a[e.user_id]||(a[e.user_id]=[]),a[e.user_id].push({location:e.cityLocation,year:e.year})})}),console.log(a),Object.keys(a).forEach(function(t){var n=a[t];n.sort(function(e,t){return t.year-e.year});var r=n.map(function(e){return{lat:e.location.lat,lng:e.location.lng}});e.lines.push(new W.maps.Polyline({path:r,strokeColor:"#aaa",strokeOpacity:1,strokeWeight:1}))}),this.lines.forEach(function(t){return t.setMap(e.map)})}this.map.fitBounds(r);var i=this.map.getZoom();this.map.setZoom(i<2?2:i)}},{key:"render",value:function(){return a.a.createElement(B,{ref:this.mapContainerRef})}}]),t}(r.Component),B=g.b.div(P(),function(e){return 0!=e.visible?"visible":"hidden"});function N(){var e=Object(s.a)(["\n  display: inline-block;\n  background-image: url(/images/dot.png);\n  width: 20px;\n  height: 20px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n  line-height: 20px;\n"]);return N=function(){return e},e}function K(){var e=Object(s.a)(["\n  list-style: none;\n  margin-left: 0px;\n"]);return K=function(){return e},e}function A(){var e=Object(s.a)(["\n  padding-left: 0px;\n"]);return A=function(){return e},e}function q(){var e=Object(s.a)(["\n  color: orange;\n  margin-left: 5px;\n  :hover {cursor: pointer};\n"]);return q=function(){return e},e}function J(){var e=Object(s.a)(["\n  padding: 4rem 1rem 2rem 1rem;\n"]);return J=function(){return e},e}function V(){var e=Object(s.a)(["\n  :hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]);return V=function(){return e},e}var H=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={entries:[]},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:window.location.hash=this.props.mcmmId,U.a.get(k+"/entry_by_user/"+this.props.mcmmId+"/").then(function(e){t.setState({entries:e.data.docs})}).catch(function(e){console.log(e)});case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.entries.map(function(t,n){return a.a.createElement(Q,{key:n},t.musician," ",t.city," ",t.year," ",a.a.createElement($,{onClick:function(){e.props.editEntry(t)}},"[edit]"))});return a.a.createElement(Z,null,a.a.createElement("h1",null,O(this.props.translations,"my_entries",this.props.locale)),a.a.createElement(G,null,t),a.a.createElement("p",null,"This is your secret edit link: ",a.a.createElement("a",{href:"#"+this.props.mcmmId},"#"+this.props.mcmmId)),a.a.createElement("p",null,"Bookmark it to manage your entries later or from other devices. If you lose it, you might lose access to your entries."),a.a.createElement("p",null,a.a.createElement(X,{onClick:function(){e.props.setUserFilter([e.props.mcmmId])}},O(this.props.translations,"show_my_entries",this.props.locale))))}}]),t}(r.Component),X=g.b.span(V()),Z=g.b.div(J()),$=g.b.span(q()),G=g.b.ul(A()),Q=g.b.li(K()),ee=(g.b.span(N()),n(22));function te(){var e=Object(s.a)(['\n  position: fixed;\n  bottom:0;\n  left:0;\n  right: 0;\n  padding: 1rem;\n  box-sizing: border-box;\n\n  display: flex;\n  width: 100%;\n\n  li {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    height: 6em;\n  }\n\n  li .year_top {\n    height: 3vh;\n    /* background: red; */\n  }\n\n  li .year_top img {\n    left: 50%;\n    width: auto;\n    height: 1vh;\n    transform-origin: center 67%;\n    \n    /* background: yellow; */\n  }\n\n  li .year_middle {\n    height: 3vh;\n  }\n\n  li .year_middle:before {\n    content: "";\n    border: solid 1px black;\n    border-width: 0 0 0 1px;\n    position: relative;\n    left: calc(50% - 1px);\n  }\n\n  li .year_bottom {\n    height: 3vh;\n    /* background: green; */\n  }\n\n  li .year_bottom span {\n    width: calc(1em + 20%);\n    transform: rotate(-90deg) translateX(-100%);\n    overflow: visible;\n    /* background: red; */\n  }\n\n  li > * {\n    position: relative;\n  }\n\n  li > * > * {\n    position: absolute;\n  }\n']);return te=function(){return e},e}function ne(){var e=Object(s.a)(["\n  :hover { \n    cursor: pointer \n    text-decoration: underline;\n  };\n"]);return ne=function(){return e},e}var re=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={data:[]},n.fetchData=n.fetchData.bind(Object(d.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"fetchData",value:function(){var e=this;U.a.get(k+"/year_data/"+(this.props.musicianFilter?"?musician="+this.props.musicianFilter:"")).then(function(t){console.log("yearly data loaded"),e.setState({data:t.data})}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter!==e.musicianFilter&&this.fetchData()}},{key:"renderYear",value:function(e,t){var n=this;return a.a.createElement("li",{key:e},a.a.createElement("span",{className:"year_top"},t>0?a.a.createElement("img",{style:{transform:"translateX(-50%) scale("+t+")"},alt:e,src:"/images/marker.svg"}):null),a.a.createElement("span",{className:"year_middle"}),a.a.createElement("span",{className:"year_bottom"},a.a.createElement(ae,{onClick:function(){n.props.setYearFilter(e)}},t>0?e:null)))}},{key:"render",value:function(){var e=this,t=this.state.data;if(!t||0===t.length)return null;t.unshift.apply(t,Object(ee.a)(Array.from(Array(4),function(e,n){return{year:n+(t[0].year-4),amount:0}})));t.push.apply(t,Object(ee.a)(Array.from(Array(1),function(e,n){return{year:n+(t[t.length-1].year+1),amount:0}})));var n=t[0].year,r=t.map(function(t){return e.renderYear(t.year,t.amount)});return a.a.createElement(ie,{start:n},r)}}]),t}(r.PureComponent),ae=g.b.span(ne()),ie=g.b.ol(te());function oe(){var e=Object(s.a)(["\n  &:hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]);return oe=function(){return e},e}function se(){var e=Object(s.a)(["\n  position: fixed;\n  right: 0;\n  top: ",";\n  width: auto;\n  padding: 1rem 1rem 0 0;\n  box-sizing: border-box;\n\n  ul {\n    list-style-type: none;\n  } ;\n  li {\n    display: flex;\n    span:first-child {\n      width: 2em;\n    }\n    span:last-child {\n      flex: 1;\n      &:hover {\n        cursor: pointer;\n        text-decoration: underline;\n      }\n    }\n  }\n"]);return se=function(){return e},e}var le=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={musicians:[]},n.fetchData=n.fetchData.bind(Object(d.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var e=this;console.log("request with yearFilter",this.props.yearFilter),U.a.get(k+"/top_musicians/10/"+(this.props.musicianFilter?"?musician="+this.props.musicianFilter:"")+(this.props.yearFilter?"?year="+this.props.yearFilter:"")).then(function(t){console.log(t.data),e.setState({musicians:t.data})}).catch(function(e){console.log(e)})}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter===e.musicianFilter&&this.props.userFilter===e.userFilter&&this.props.yearFilter===e.yearFilter||this.fetchData()}},{key:"render",value:function(){var e=this,t=this.state.musicians.sort(function(e,t){return e.percent<t.percent?1:-1}).map(function(t,n){return a.a.createElement("li",{key:n,onClick:function(){return e.props.setMusicianFilter(t.name)}},a.a.createElement("span",null,t.percent,"%"),"\xa0",a.a.createElement("span",null,t.name,"\xa0(",t.count,")"))});return a.a.createElement(ce,{filterOn:this.props.filterOn},a.a.createElement("ul",null,t))}}]),t}(r.Component),ce=g.b.div(se(),function(e){return e.filterOn?"60px":"0"});g.b.span(oe());function ue(){var e=Object(s.a)(["\n  width: 100%;\n  height: 100%;\n"]);return ue=function(){return e},e}var pe=function(e){function t(e){return Object(p.a)(this,t),Object(m.a)(this,Object(f.a)(t).call(this,e))}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.userFilter.length>0||this.props.musicianFilter||this.props.yearFilter;return a.a.createElement(he,null,a.a.createElement(R,{userFilter:this.props.userFilter,musicianFilter:this.props.musicianFilter,yearFilter:this.props.yearFilter}),this.props.largeScreen&&a.a.createElement(le,{musicianFilter:this.props.musicianFilter,setMusicianFilter:this.props.setMusicianFilter,yearFilter:this.props.yearFilter,filterOn:e}),this.props.largeScreen&&!this.props.yearFilter&&a.a.createElement(re,{musicianFilter:this.props.musicianFilter,yearFilter:this.props.yearFilter,setYearFilter:this.props.setYearFilter}))}}]),t}(r.Component),he=g.b.div(ue()),me=n(12),fe=n(21),de=n.n(fe);function ye(){var e=Object(s.a)(["\n  width: 100%;\n  margin-top: 20px;\n  :hover {cursor: pointer};\n  text-align: center;\n"]);return ye=function(){return e},e}function ge(){var e=Object(s.a)(['\n  input, textarea {\n    display: block;\n    border:none;\n    width: 100%;\n    background-color: black;\n    color: white;\n    outline: none;\n    box-sizing: border-box;\n    padding: 0.5rem;\n  }\n\n  input {\n    font-size: 200%;\n    text-align: left;\n    height: 2em;\n    &[name="year"] {\n      width: auto;\n    }\n  }\n\n  textarea {\n    height: 100px;\n    font-size: 150%;\n  }\n\n  margin-bottom: 2rem;\n']);return ge=function(){return e},e}function be(){var e=Object(s.a)(["\n  display: inline-block;\n  width: 200px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n"]);return be=function(){return e},e}function ve(){var e=Object(s.a)(["\n  padding: 4rem 1rem 2rem 1rem;\n  overflow-y: scroll;\n  height: 100%;\n"]);return ve=function(){return e},e}var ke=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).handleSubmit=function(e){console.log(n.state),n.state._id?U.a.put(k+"/entry/"+n.state._id,{musician:n.state.musician,city:n.state.city,year:parseInt(n.state.year),note:n.state.note,user_id:n.props.mcmmId}).then(function(e){console.log(e),n.setState({_id:e.data._id,changed:!1})}).catch(function(e){console.log(e)}):U.a.post(k+"/entry",{musician:n.state.musician,city:n.state.city,year:parseInt(n.state.year),note:n.state.note,user_id:n.props.mcmmId}).then(function(e){console.log(e),n.setState({_id:e.data._id,changed:!1})}).catch(function(e){console.log(e)})},n.handleDelete=function(){window.confirm("really?")&&U.a.delete(k+"/entry/"+n.state._id,{}).then(function(e){console.log(e),n.props.back()}).catch(function(e){console.log(e)})},n.handleInputChange=function(e){var t,r=e.target,a=r.name,i="year"!==a||"year"===a&&!isNaN(r.value)?r.value:n.state.year;n.setState((t={},Object(me.a)(t,a,i),Object(me.a)(t,"changed",!0),t))},n.fixYear=function(e){var t=(new Date).getFullYear();return e<1950&&""!==e&&(e=1950),e>t&&(e=t),e},n.state={musician:n.props.entry?n.props.entry.musician:"",city:n.props.entry?n.props.entry.city:"",year:n.props.entry?n.props.entry.year:"",note:n.props.entry?n.props.entry.note:"",_id:n.props.entry?n.props.entry._id:null,musicians:[],cities:[],changed:!1},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:U.a.get(k+"/entry_uniques/").then(function(e){console.log(e),t.setState({musicians:e.data.musicians}),t.setState({cities:e.data.cities})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return a.a.createElement(Fe,null,a.a.createElement("h1",null,this.state._id?"update entry":"new entry"),a.a.createElement(Ee,null,a.a.createElement(Oe,null,"musician/composer/band"),a.a.createElement(de.a,{items:this.state.musicians.map(function(e){return{value:e}}),getItemValue:function(e){return e.value},shouldItemRender:function(e,t){return e.value.toLowerCase().indexOf(t.toLowerCase())>-1},renderItem:function(e,t){return a.a.createElement("div",{key:e.value,style:{backgroundColor:t?"#eee":"transparent"}},e.value)},value:this.state.musician,onChange:function(t){return e.setState({musician:t.target.value,changed:!0})},onSelect:function(t){return e.setState({musician:t,changed:!0})},wrapperStyle:{display:"block"},inputProps:{style:je}}),a.a.createElement("br",null),a.a.createElement(Oe,null,"city"),a.a.createElement(de.a,{items:this.state.cities.map(function(e){return{value:e}}),getItemValue:function(e){return e.value},shouldItemRender:function(e,t){return e.value.toLowerCase().indexOf(t.toLowerCase())>-1},renderItem:function(e,t){return a.a.createElement("div",{key:e.value,style:{backgroundColor:t?"#eee":"transparent"}},e.value)},value:this.state.city,onChange:function(t){return e.setState({city:t.target.value,changed:!0})},onSelect:function(t){return e.setState({city:t,changed:!0})},wrapperStyle:{display:"block"},inputProps:{style:je}}),a.a.createElement("br",null),a.a.createElement(Oe,null,"year"),a.a.createElement("input",{autoComplete:"off",size:"4",maxLength:"4",type:"text",name:"year",value:this.state.year,onChange:this.handleInputChange,onBlur:function(){return e.setState({year:e.fixYear(e.state.year)})}}),a.a.createElement("br",null),a.a.createElement(Oe,null,"note"),a.a.createElement("textarea",{name:"note",maxlength:"200",value:this.state.note,onChange:this.handleInputChange}),a.a.createElement("br",null),this.state.changed&&a.a.createElement(we,{onClick:this.handleSubmit},"save"),this.state._id&&a.a.createElement(we,{onClick:this.handleDelete},"delete entry")))}}]),t}(r.Component),Fe=g.b.div(ve()),Oe=g.b.label(be()),je={},Ee=g.b.form(ge()),we=g.b.div(ye()),xe=n(41),Se=n.n(xe),Ie=n(86),Ce=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).handleScan=function(e){e&&(n.setState({result:e}),"pro_"==e.substring(0,4)?n.props.setUserFilter([n.props.mcmmId]):n.props.setUserFilter([n.props.mcmmId,e]),U.a.get(k+"/set_filter/"+e+"/"+n.props.mcmmId).then(function(e){console.log(e)}).catch(function(e){console.log(e)}))},n.handleError=function(e){console.error(e)},n.state={result:"No result"},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.pollInterval=setInterval(function(){e.props.pollFilter(e.props.mcmmId)},5e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.pollInterval)}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h1",null,"scanner"),a.a.createElement("div",{style:{padding:50}},a.a.createElement(Ie,{value:this.props.mcmmId})),a.a.createElement(Se.a,{delay:300,onError:this.handleError,onScan:this.handleScan,style:{width:"100%"}}),a.a.createElement("p",null,this.state.result))}}]),t}(r.Component);function _e(){var e=Object(s.a)(["\n  padding: 50px;\n"]);return _e=function(){return e},e}var Te=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return a.a.createElement(Me,null,a.a.createElement("h1",null,O(this.props.translations,this.props.pageKey+"_heading",this.props.locale)),a.a.createElement("div",{dangerouslySetInnerHTML:{__html:O(this.props.translations,this.props.pageKey+"_content",this.props.locale)}}))}}]),t}(r.Component),Me=g.b.div(_e());function De(){var e=Object(s.a)(["\n"]);return De=function(){return e},e}function ze(){var e=Object(s.a)(["\n  position: fixed;\n  top: 1rem;\n  right: 1rem;\n  width: 30px;\n  height: 30px;\n  &:hover {cursor: pointer};\n"]);return ze=function(){return e},e}function Le(){var e=Object(s.a)(["\n  min-height: 60px;\n  padding: 20px;\n"]);return Le=function(){return e},e}function Ue(){var e=Object(s.a)(["\n  position: fixed;\n  z-index: 100;\n  right: 1rem;\n  bottom: ",";\n  width: 2.5rem;\n  height: 2.5rem;\n  font-size: 2rem;\n  line-height: 1.1rem;\n  text-align: center;\n  border: 2px solid black;\n  border-radius: 50%;\n  background-color: white;\n  padding: 10px;\n  &:hover {cursor: pointer}; \n"]);return Ue=function(){return e},e}function Pe(){var e=Object(s.a)(["\n  height: 100%;\n  width: 100%;\n  background: #fff;\n"]);return Pe=function(){return e},e}function Ye(){var e=Object(s.a)(["\n  position: fixed;\n  z-index: 100;\n  width: 30px;\n  height: 30px;\n  left: 10px;\n  top: 10px;\n  &:hover {cursor: pointer}; \n"]);return Ye=function(){return e},e}var We=n(24),Re=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).onResize=function(e,t){console.log(n.state.largeScreen),n.setState({largeScreen:F(e,t)})},n.setLocale=function(e){n.setState({locale:e})},n.toggleMenu=function(){n.setState({menuOpen:!n.state.menuOpen})},n.navigate=function(e,t){if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])){var r=n.state.navStack;r.push(n.state.currentPage),console.log(r),n.setState({navStack:r})}if(n.setState({menuOpen:!1,currentPage:e,currentEntry:t,pageKey:t}),"list"!=e){var a=window.location.pathname+(n.state.projectionId?"?projection_id="+n.state.projectionId:"");window.history.pushState("",document.title,a)}},n.reset=function(){n.setUserFilter([]),n.navigate("home")},n.back=function(){if("scan"!=n.state.currentPage){var e=n.state.navStack,t=e.pop();n.setState({navStack:e}),n.navigate(t,n.state.entry,!0)}else n.navigate("home")},n.state={examples:[],menuOpen:!1,currentPage:"home",mcmmId:null,navStack:[],userFilter:[],musicianFilter:null,yearFilter:null,translations:[],locale:"de",projectionId:null},n.setUserFilter=n.setUserFilter.bind(Object(d.a)(n)),n.setMusicianFilter=n.setMusicianFilter.bind(Object(d.a)(n)),n.setYearFilter=n.setYearFilter.bind(Object(d.a)(n)),n.setLocale=n.setLocale.bind(Object(d.a)(n)),n.pollFilter=n.pollFilter.bind(Object(d.a)(n)),n.handleFilterClose=n.handleFilterClose.bind(Object(d.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"setUserFilter",value:function(e){var t=this;this.setState({userFilter:e},function(){"home"!=t.state.currentPage&&t.navigate("home")})}},{key:"setMusicianFilter",value:function(e){this.setState({musicianFilter:e,userFilter:[],yearFilter:null})}},{key:"setYearFilter",value:function(e){this.setState({musicianFilter:null,userFilter:[],yearFilter:e})}},{key:"pollFilter",value:function(e){var t=this;U.a.get(k+"/filter?username="+e).then(function(n){if(console.log(n),n.data&&n.data.docs&&n.data.docs.length){var r=t.state.projectionId?[]:[e];n.data.docs[0].filter.forEach(function(e){r.push(e)}),t.setUserFilter(r)}}).catch(function(e){console.log(e)})}},{key:"handleFilterClose",value:function(){console.log("handleFilterClose"),U.a.get(k+"/remove_filter/"+(this.state.projectionId?this.state.projectionId:this.state.mcmmId)).then(function(e){console.log(e)}).catch(function(e){console.log(e)}),this.setUserFilter([]),this.setMusicianFilter(null),this.setYearFilter(null)}},{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t,n,r,a,i,o=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return Object(b.disableBodyScroll)(document.querySelector("body")),t=new URLSearchParams(window.location.search),(n=t.get("projection_id"))?(this.setState({projectionId:n}),this.pollInterval=setInterval(function(){o.pollFilter(n)},5e3)):(r=window.location.hash,a=localStorage.getItem("mcmmId"),r&&(a=r.substr(1),this.setState({currentPage:"list",mcmmId:a,navStack:["home"]})),a||(a=We()),this.setState({mcmmId:a}),localStorage.setItem("mcmmId",a)),e.next=6,U.a.get(k+"/translation");case 6:i=e.sent,console.log(i),this.setState({translations:i.data.docs});case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearInterval(this.pollInterval)}},{key:"render",value:function(){var e=this,t=this.state.userFilter.length>0||this.state.musicianFilter||this.state.yearFilter,n={home:a.a.createElement(pe,{mcmmId:this.state.mcmmId,userFilter:this.state.userFilter,setUserFilter:this.setUserFilter,musicianFilter:this.state.musicianFilter,setMusicianFilter:this.setMusicianFilter,yearFilter:this.state.yearFilter,setYearFilter:this.setYearFilter,largeScreen:this.state.largeScreen,translations:this.state.translations,locale:this.state.locale}),list:a.a.createElement(H,{mcmmId:this.state.mcmmId,editEntry:function(t){e.navigate("edit",t)},translations:this.state.translations,locale:this.state.locale,setUserFilter:this.setUserFilter}),edit:a.a.createElement(ke,{mcmmId:this.state.mcmmId,back:this.back,entry:this.state.currentEntry,translations:this.state.translations,locale:this.state.locale}),scan:a.a.createElement(Ce,{mcmmId:this.state.mcmmId,setUserFilter:this.setUserFilter,translations:this.state.translations,locale:this.state.locale,pollFilter:this.pollFilter}),page:a.a.createElement(Te,{translations:this.state.translations,locale:this.state.locale,pageKey:this.state.pageKey})}[this.state.currentPage];return[a.a.createElement(Je,{key:"globalstyles"}),a.a.createElement(v.a,{key:"resize",handleWidth:!0,handleHeight:!0,onResize:this.onResize}),this.state.menuOpen?a.a.createElement(T,{key:"main",close:this.toggleMenu,navigate:this.navigate,translations:this.state.translations,locale:this.state.locale,setLocale:this.setLocale,reset:this.reset,projectionMode:!!this.state.projectionId}):a.a.createElement(Ne,{key:"main"},!t&&a.a.createElement(Be,{onClick:this.toggleMenu,src:"images/menu.png"}),t&&a.a.createElement(Ae,null,this.state.userFilter.length>0&&a.a.createElement("span",null,"filter for ",this.state.userFilter.length," users"),this.state.musicianFilter&&a.a.createElement("span",null,"filter for users that named ",this.state.musicianFilter),this.state.yearFilter&&a.a.createElement("span",null,"filter for entries from ",this.state.yearFilter),a.a.createElement(qe,{src:"/images/close.png",onClick:this.handleFilterClose})),n,("home"===this.state.currentPage&&!t||"list"==this.state.currentPage)&&a.a.createElement(Ke,{onClick:function(){return e.navigate("edit")},largeScreen:this.state.largeScreen},"+"),"home"!==this.state.currentPage&&a.a.createElement(qe,{src:"/images/close.png",onClick:this.back}))]}}]),t}(r.Component),Be=g.b.img(Ye()),Ne=g.b.div(Pe()),Ke=g.b.div(Ue(),function(e){return e.largeScreen?"9rem":"2rem"}),Ae=g.b.div(Le()),qe=g.b.img(ze()),Je=Object(g.a)(De()),Ve=function(){return a.a.createElement(Re,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(Ve,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[49,1,2]]]);
//# sourceMappingURL=main.10255798.chunk.js.map