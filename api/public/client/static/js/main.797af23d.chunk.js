(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{51:function(e,t,n){e.exports=n(94)},56:function(e,t,n){},80:function(e){e.exports=[{elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#aaaaaa"},{visibility:"on"},{weight:.5}]},{featureType:"landscape.natural.landcover",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#fefefe"}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"road",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#cccccc"},{visibility:"on"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#cccccc"},{visibility:"on"},{weight:1}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{visibility:"on"},{weight:.5}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"off"}]}]},94:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(16),o=n.n(i),s=(n(56),n(2)),l=n(13),c=n.n(l),u=n(14),p=n(3),h=n(4),m=n(6),d=n(5),f=n(10),y=n(7),g=(n(58),n(1)),b=n(39),v=n(47),w="/api",k={start:1950,end:(new Date).getFullYear()},O=function(e,t){return e>600&&t>400};function F(e,t,n){for(var r=0;r<e.length;r++)if(e[r].key==t){var a=e[r]["content_"+n];return a||"["+t+"]"}return"["+t+"]"}function j(e){return e.replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()})}function x(e){var t=.8*e;return t>5&&(t=5),t<1&&(t=1),t}function E(){var e=Object(s.a)(["\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  width: 30px;\n  height: 30px;\n  &:hover {cursor: pointer};\n"]);return E=function(){return e},e}function S(){var e=Object(s.a)(["\n  min-height: 60px;\n  padding: 1.25rem;\n  padding-right: calc(30px + 1rem);\n  display: flex;\n  font-size: 1.25rem;\n  width: 100%;\n"]);return S=function(){return e},e}var _=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return a.a.createElement(C,null,this.props.children,a.a.createElement(I,{src:"/images/close.png",onClick:this.props.onClose}))}}]),t}(r.Component),C=g.b.div(S()),I=g.b.img(E());function T(){var e=Object(s.a)(["\n  padding: 1.25rem;\n  font-size: 1.25rem;\n"]);return T=function(){return e},e}function z(){var e=Object(s.a)(["\n  flex:1;\n  padding-top: 0rem; // height of the top bar, ~4rem\n  overflow-y: auto;\n"]);return z=function(){return e},e}function M(){var e=Object(s.a)(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  opacity: 0.5;\n  z-index: 300;\n  display: ",";\n"]);return M=function(){return e},e}function D(){var e=Object(s.a)(["\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  visibility: ",";\n  z-index: 300;\n\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n\n  @media only screen and (max-width: 768px) {\n    width: 100%;\n  }\n"]);return D=function(){return e},e}function L(){var e=Object(s.a)(["\n  margin-bottom: 0.625rem;\n  &:hover {cursor: pointer};\n"]);return L=function(){return e},e}function U(){var e=Object(s.a)(["\n  text-decoration: none;\n  list-style: none;\n  font-size: 16px;\n  span { \n    font-weight: ","; \n    padding: 5px;\n  }\n  :hover {cursor: ",'};\n  :first-child {:after { content: "/" }};\n  display: inline-block;\n']);return U=function(){return e},e}function P(){var e=Object(s.a)(["\n  margin-left: 0px;\n  padding-left: 0px;\n  margin-top: 40px;\n"]);return P=function(){return e},e}n(26);var N=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=["en","de"].map(function(t){return a.a.createElement(W,{key:t,active:t==e.props.locale,onClick:function(){return e.props.setLocale(t)}},a.a.createElement("span",null,t))});return a.a.createElement("div",null,a.a.createElement(Y,null,t))}}]),t}(r.Component),Y=g.b.ul(P()),W=g.b.li(U(),function(e){return e.active?"bold":"default"},function(e){return e.active?"default":"pointer"}),R=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;console.log(this.props.render);var t=this.props.render&&this.props.render.props.titleKey?F(this.props.translations,this.props.render.props.titleKey,this.props.locale):F(this.props.translations,"menu",this.props.locale);return[a.a.createElement(A,{onClick:this.props.close,menuOpen:this.props.menuOpen}),a.a.createElement(B,{menuOpen:this.props.menuOpen},a.a.createElement(_,{onClose:this.props.close},t),this.props.render?a.a.createElement(J,null,this.props.render):a.a.createElement(J,null,a.a.createElement(H,null,a.a.createElement(K,{onClick:this.props.reset},F(this.props.translations,"home",this.props.locale)),a.a.createElement(K,{onClick:function(){return e.props.navigate("page","programm")}},F(this.props.translations,"programm",this.props.locale)),!this.props.projectionMode&&a.a.createElement(K,{onClick:function(){return e.props.navigate("list")}},F(this.props.translations,"my_entries",this.props.locale)),!this.props.projectionMode&&a.a.createElement(K,{onClick:function(){return e.props.navigate("scan")}},F(this.props.translations,"scanner",this.props.locale)),a.a.createElement(K,{onClick:function(){return e.props.navigate("page","credits")}},F(this.props.translations,"credits",this.props.locale)),a.a.createElement(N,{locale:this.props.locale,setLocale:this.props.setLocale,translations:this.props.translations}))))]}}]),t}(r.Component),K=g.b.li(L()),B=g.b.div(D(),function(e){return e.menuOpen?"visibile":"hidden"}),A=g.b.div(M(),function(e){return e.menuOpen?"block":"none"}),J=g.b.div(z()),H=g.b.ul(T()),V=n(8),q=n.n(V),X=n(42),Z=n(18),$=n.n(Z);function G(){var e=Object(s.a)(['\n  width: 100%; \n  height: 100%;\n  background-image: url("/images/background5.png");\n  background-size: cover;\n  visibility: ',";\n  * {\n   font-family: NeutraText;\n   line-height: 1.15;\n   font-size: 1rem;\n  }\n\n  .info-window {\n    /* content wrapper */\n\n    .info-window-entry {\n      /* entry wrapper */\n      &:not(:last-child) {\n        border-bottom: 1px dashed white;\n      }\n      padding-top: 0.25rem;\n    }\n\n    .info-window-musician {\n      padding-right: 0.25rem;\n    }    \n\n    .info-window-note {\n      /* user note */\n      display: block;\n      font-family: NeutraTextLightItalic;\n      font-size: 2rem;\n      line-height: 2rem;\n      word-break: break-all;\n      animation: ",' 1s ease-in-out infinite alternate;    \n    }\n\n    span.info-window-span {\n      /* biography link */\n      font-family: NeutraTextDemi;\n      display: block;\n      text-align: right;\n      pointer-events: all;\n      :hover { \n        cursor: pointer; \n        text-decoration: underline;\n      }\n    }\n  }\n\n  .gm-style .gm-style-iw-c {\n    /* popup window */\n    pointer-events: none;\n    max-width: 250px !important;\n    border-radius: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    background-color: black;\n    color: white;\n    transform: translate(0%,-100%);\n    top: 1rem;\n    z-index: 10;\n\n    padding: 0.25rem 0.25rem 0.25rem 0.25rem !important;\n\n    &, *::after, *::before {\n      border: none;\n    }\n  }\n\n  .gm-style .gm-style-iw-t::after {\n    /* popup triangle */\n    /* background: linear-gradient(45deg,rgba(0,0,0,1) 50%,rgba(0,0,0,0,0) 51%,rgba(0,0,0,0,0) 100%); */\n    display: none;\n  }\n\n  .gm-style button {\n    /* popup close button */\n\n    display: none;\n\n    /*background-image: url("/images/closeWhite.png") !important;\n    background-size: cover !important;\n    top: 0.25rem !important;\n    right: 0.25rem !important;\n    padding: 0.25rem !important;\n    width: 1rem !important;\n    height: 1rem !important;\n    opacity: 1;\n\n    img {\n      visibility: hidden;\n    }*/\n  }\n\n  .gm-style-iw-d {\n    overflow: hidden !important;\n  }\n\n']);return G=function(){return e},e}function Q(){var e=Object(s.a)([" \nfrom {\n  text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px ",", 0 0 40px ",", 0 0 50px ",", 0 0 60px ",", 0 0 70px ",";\n}\nto {\n  text-shadow: 0 0 20px #fff, 0 0 30px ",", 0 0 40px ",", 0 0 50px ",", 0 0 60px ",", 0 0 70px ",", 0 0 80px ",";\n}\n"]);return Q=function(){return e},e}var ee=n(80),te=window.google,ne=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).mapContainerRef=a.a.createRef(),n.infoWindowRef=a.a.createRef(),n.markers=[],n.lines=[],n.infoWindows=[],n.state={entries:[]},n.fetchData=n.fetchData.bind(Object(f.a)(n)),n.drawMap=n.drawMap.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"fetchData",value:function(){var e=this,t={};this.props.musicianFilter&&(t.musician=this.props.musicianFilter),this.props.userFilter&&this.props.userFilter.length>0&&(t.userIds=JSON.stringify(this.props.userFilter)),this.props.yearFilter&&(t.year=this.props.yearFilter),q.a.get(w+"/map_entries/",{params:t}).then(function(t){console.log(t),e.setState({entries:t.data},e.drawMap)}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.fetchData(),this.map=new te.maps.Map(this.mapContainerRef.current,{zoom:1,center:{lat:0,lng:0},streetViewControl:!1,fullscreenControl:!1,mapTypeControl:!1,zoomControl:!1,styles:ee,backgroundColor:"hsla(0, 0%, 0%, 0)"})}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter===e.musicianFilter&&this.props.userFilter===e.userFilter&&this.props.yearFilter===e.yearFilter||(this.markers.forEach(function(e){e.setMap(null)}),this.markers=[],this.entries=[],this.fetchData())}},{key:"drawMap",value:function(){var e=this,t=this.props.musicianFilter||this.props.userFilter&&this.props.userFilter.length>0||this.props.yearFilter,n={url:"/images/marker.svg",scaledSize:{height:30,width:30},origin:{x:0,y:0},anchor:{x:12.5,y:12.5},labelOrigin:new te.maps.Point(12.5,30)},r=function(e){var t=11*e;return Object(X.a)({},n,{scaledSize:{height:t,width:t},anchor:{x:t/2,y:t/2}})},a=new window.google.maps.LatLngBounds;if(Object.keys(this.state.entries).forEach(function(n){var i=e.state.entries[n][0],o='\n          <div class="info-window">\n          ';o+='\n            <span class="info-window-city">\n              '.concat(j(i.city),"\n            </span>\n          "),e.state.entries[n].forEach(function(t){o+='\n            <div class="info-window-entry">\n              <span class="info-window-musician">\n                '.concat(j(t.musician),'\n              </span>\n              <span class="info-window-year">\n                ').concat(t.year,"\n              </span>\n              ").concat(t.note?'\n                <em class="info-window-note">\n                  '.concat(t.note,"\n                </em>"):"","\n              <span class='info-window-span' rel='").concat(t.user_id,"'>\n                ").concat(F(e.props.translations,"zur_bio",e.props.locale),"\n              </span>\n            </div>\n          ")}),o+="\n          </div>\n          ";var s=e.state.entries[n].map(function(e){return j(e.musician)}).join(", "),l=e.state.entries[n].length,c=new te.maps.Marker({position:i.cityLocation,icon:r(x(l)),label:t?{color:"#000",fontSize:"1rem",fontFamily:"NeutraText",text:s}:void 0,map:e.map}),u=new te.maps.InfoWindow({content:o});te.maps.event.addListener(u,"domready",function(){$()(".info-window-span").off(),$()(".info-window-span").click(function(t){var n=$()(t.target).attr("rel");e.props.setUserFilter([n])})}),c.addListener("click",function(){e.infoWindows.forEach(function(e){e.close()}),u.open(e.map,c)}),e.markers.push(c),e.infoWindows.push(u),a.extend(i.cityLocation)}),te.maps.event.addListener(this.map,"click",function(t){e.infoWindows.forEach(function(e){e.close()})}),this.lines.forEach(function(e){return e.setMap(null)}),this.lines=[],t){var i={};Object.keys(this.state.entries).forEach(function(t){e.state.entries[t].forEach(function(e){i[e.user_id]||(i[e.user_id]=[]),i[e.user_id].push({location:e.cityLocation,year:e.year})})}),console.log(i),Object.keys(i).forEach(function(t){var n=i[t];n.sort(function(e,t){return t.year-e.year});var r=n.map(function(e){return{lat:e.location.lat,lng:e.location.lng}});e.lines.push(new te.maps.Polyline({path:r,strokeColor:"#000",strokeOpacity:.5,strokeWeight:1}))}),this.lines.forEach(function(t){return t.setMap(e.map)})}this.map.fitBounds(a);var o=this.map.getZoom();this.map.setZoom(o<2?2:o)}},{key:"render",value:function(){return a.a.createElement(ae,{ref:this.mapContainerRef})}}]),t}(r.Component),re=Object(g.c)(Q(),"#444444","#444444","#444444","#444444","#444444","#404040","#404040","#404040","#404040","#404040","#404040"),ae=g.b.div(G(),function(e){return 0!=e.visible?"visible":"hidden"},re);function ie(){var e=Object(s.a)(["\n  display: inline-block;\n  background-image: url(/images/dot.png);\n  width: 20px;\n  height: 20px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n  line-height: 20px;\n"]);return ie=function(){return e},e}function oe(){var e=Object(s.a)(["\n  list-style: none;\n  margin-bottom: 0.3125rem;\n  border-bottom: 1px dashed black;\n  padding-bottom: 0.3125rem;\n\n"]);return oe=function(){return e},e}function se(){var e=Object(s.a)(["\n  padding-left: 0px;\n  font-size: 1.25rem;\n  margin-bottom: 1.25rem;\n"]);return se=function(){return e},e}function le(){var e=Object(s.a)(["\n  :hover {\n    cursor: pointer;\n    text-decoration: underline;\n  };\n"]);return le=function(){return e},e}function ce(){var e=Object(s.a)(["\n  padding: 1.25rem;\n"]);return ce=function(){return e},e}function ue(){var e=Object(s.a)(["\n  font-family: NeutraTextDemi;\n  margin-top: 1rem;\n  :hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]);return ue=function(){return e},e}function pe(){var e=Object(s.a)(["\n  font-family: NeutraTextDemi;\n  margin-top: 1rem;\n  :hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]);return pe=function(){return e},e}var he=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={entries:[]},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:window.location.hash=this.props.mcmmId,q.a.get(w+"/entry_by_user/"+this.props.mcmmId+"/").then(function(e){t.setState({entries:e.data.docs})}).catch(function(e){console.log(e)});case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.entries.map(function(t,n){return a.a.createElement(be,{key:n},a.a.createElement(ye,{onClick:function(){e.props.editEntry(t)}},j(t.musician)," ",j(t.city)," ",t.year))});return a.a.createElement(fe,null,a.a.createElement(ge,null,t),a.a.createElement("p",null,a.a.createElement(de,{onClick:function(){return e.props.navigate("edit")}},F(this.props.translations,"new_entry",this.props.locale))),a.a.createElement("p",null,F(this.props.translations,"edit_link_info_1",this.props.locale)," ",a.a.createElement("a",{href:"#"+this.props.mcmmId},"#"+this.props.mcmmId)),a.a.createElement("p",null,F(this.props.translations,"edit_link_info_2",this.props.locale)),a.a.createElement(me,{onClick:function(){e.props.setUserFilter([e.props.mcmmId])}},F(this.props.translations,"show_my_entries",this.props.locale)))}}]),t}(r.Component),me=g.b.div(pe()),de=g.b.div(ue()),fe=g.b.div(ce()),ye=g.b.span(le()),ge=g.b.ul(se()),be=g.b.li(oe()),ve=(g.b.span(ie()),n(23));function we(){var e=Object(s.a)(['\n  position: fixed;\n  bottom:0;\n  left:0;\n  right: 0;\n  padding: 1rem;\n  box-sizing: border-box;\n  line-height: 1;\n\n  display: flex;\n  width: 100%;\n\n  li {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    height: 6em;\n  }\n\n  li .year_top {\n    height: 3vh;\n    /* background: red; */\n  }\n\n  li .year_top img {\n    left: 50%;\n    width: auto;\n    height: 1vh;\n    transform-origin: center 67%;\n    \n    /* background: yellow; */\n  }\n\n  li .year_middle {\n    height: 3vh;\n  }\n\n  li .year_middle:before {\n    content: "";\n    border: solid 1px black;\n    border-width: 0 0 0 1px;\n    position: relative;\n    left: calc(50% - 1px);\n  }\n\n  li .year_bottom {\n    height: 3vh;\n    /* background: green; */\n  }\n\n  li .year_bottom span {\n    width: calc(1em + 20%);\n    transform: rotate(-90deg) translateX(-100%);\n    overflow: visible;\n    /* background: red; */\n  }\n\n  li > * {\n    position: relative;\n  }\n\n  li > * > * {\n    position: absolute;\n  }\n']);return we=function(){return e},e}function ke(){var e=Object(s.a)(["\n  :hover { \n    cursor: pointer \n    text-decoration: underline;\n  };\n"]);return ke=function(){return e},e}var Oe=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={data:[]},n.fetchData=n.fetchData.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"fetchData",value:function(){var e=this,t={};this.props.musicianFilter&&(t.musician=this.props.musicianFilter),this.props.yearFilter&&(t.year=this.props.yearFilter),this.props.userFilter&&this.props.userFilter.length>0&&(t.userIds=JSON.stringify(this.props.userFilter)),q.a.get(w+"/year_data/",{params:t}).then(function(t){console.log("yearly data loaded"),e.setState({data:t.data})}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter===e.musicianFilter&&this.props.userFilter===e.userFilter&&this.props.yearFilter===e.yearFilter||this.fetchData()}},{key:"renderYear",value:function(e,t){var n=this;return a.a.createElement("li",{key:e},a.a.createElement("span",{className:"year_top"},t>0?a.a.createElement("img",{style:{transform:"translateX(-50%) scale("+x(t)+")"},alt:e,src:"/images/marker.svg"}):null),a.a.createElement("span",{className:"year_middle"}),a.a.createElement("span",{className:"year_bottom"},a.a.createElement(Fe,{onClick:function(){n.props.setYearFilter(e)}},t>0?e:null)))}},{key:"render",value:function(){var e=this,t=this.state.data;if(!t||0===t.length)return null;var n=t[0].year-k.start;n>0&&t.unshift.apply(t,Object(ve.a)(Array.from(Array(n),function(e,r){return{year:r+(t[0].year-n),amount:0}})));var r=k.end-t[t.length-1].year;r>0&&(console.log(r,t),t.push.apply(t,Object(ve.a)(Array.from(Array(r),function(e,n){return{year:n+(t[t.length-1].year+r),amount:0}}))));var i=t[0].year,o=t.map(function(t){return e.renderYear(t.year,t.amount)});return a.a.createElement(je,{start:i},o)}}]),t}(r.PureComponent),Fe=g.b.span(ke()),je=g.b.ol(we());function xe(){var e=Object(s.a)(["\n  &:hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]);return xe=function(){return e},e}function Ee(){var e=Object(s.a)(["\n  position: fixed;\n  right: 0;\n  top: ",";\n  width: auto;\n  padding: 1rem 1rem 0 0;\n  box-sizing: border-box;\n\n  ul {\n    list-style-type: none;\n  } ;\n  li {\n    display: flex;\n    span:first-child {\n      width: 2em;\n      margin-right: 0.75em;\n    }\n    span:last-child {\n      flex: 1;\n      &:hover {\n        cursor: pointer;\n        text-decoration: underline;\n      }\n    }\n  }\n"]);return Ee=function(){return e},e}var Se=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={musicians:[]},n.fetchData=n.fetchData.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var e=this;console.log(this.props);var t={};this.props.musicianFilter&&(t.musician=this.props.musicianFilter),this.props.userFilter&&this.props.userFilter.length>0&&(t.userIds=JSON.stringify(this.props.userFilter)),this.props.yearFilter&&(t.year=this.props.yearFilter),q.a.get(w+"/top_musicians/10/",{params:t}).then(function(t){console.log(t.data),e.setState({musicians:t.data})}).catch(function(e){console.log(e)})}},{key:"componentDidUpdate",value:function(e){this.props.musicianFilter===e.musicianFilter&&this.props.userFilter===e.userFilter&&this.props.yearFilter===e.yearFilter||this.fetchData()}},{key:"render",value:function(){var e=this,t=this.state.musicians.sort(function(e,t){return e.percent<t.percent?1:-1}).map(function(t,n){return a.a.createElement("li",{key:n,onClick:function(){return e.props.setMusicianFilter(t.name)}},a.a.createElement("span",null,t.percent,"%"),a.a.createElement("span",null,j(t.name),"\xa0(",t.count,")"))});return a.a.createElement(_e,{filterOn:this.props.filterOn},a.a.createElement("ul",null,t))}}]),t}(r.Component),_e=g.b.div(Ee(),function(e){return e.filterOn?"60px":"0"});g.b.span(xe());function Ce(){var e=Object(s.a)(["\n  width: 100%;\n  height: 100%;\n"]);return Ce=function(){return e},e}var Ie=function(e){function t(e){return Object(p.a)(this,t),Object(m.a)(this,Object(d.a)(t).call(this,e))}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.userFilter.length>0||this.props.musicianFilter||this.props.yearFilter;return a.a.createElement(Te,null,a.a.createElement(ne,{userFilter:this.props.userFilter,setUserFilter:this.props.setUserFilter,musicianFilter:this.props.musicianFilter,yearFilter:this.props.yearFilter,translations:this.props.translations,locale:this.props.locale}),this.props.largeScreen&&a.a.createElement(Se,{musicianFilter:this.props.musicianFilter,userFilter:this.props.userFilter,setMusicianFilter:this.props.setMusicianFilter,yearFilter:this.props.yearFilter,filterOn:e}),this.props.largeScreen&&a.a.createElement(Oe,{musicianFilter:this.props.musicianFilter,yearFilter:this.props.yearFilter,setYearFilter:this.props.setYearFilter,userFilter:this.props.userFilter}))}}]),t}(r.Component),Te=g.b.div(Ce()),ze=n(12),Me=n(22),De=n.n(Me);function Le(){var e=Object(s.a)(["\n  width: 100%;\n  margin-top: 20px;\n  :hover {cursor: pointer};\n  text-align: center;\n"]);return Le=function(){return e},e}function Ue(){var e=Object(s.a)(['\n  input, textarea {\n    display: block;\n    border:none;\n    width: 100%;\n    background-color: black;\n    color: white;\n    outline: none;\n    box-sizing: border-box;\n    padding: 0.5rem;\n  }\n\n  input {\n    font-size: 200%;\n    text-align: left;\n    height: 2em;\n    &[name="year"] {\n      width: auto;\n    }\n  }\n\n  textarea {\n    height: 100px;\n    font-size: 150%;\n    font-family: NeutraTextLightItalic;\n  }\n\n  margin-bottom: 2rem;\n']);return Ue=function(){return e},e}function Pe(){var e=Object(s.a)(["\n  display: inline-block;\n  width: 200px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n"]);return Pe=function(){return e},e}function Ne(){var e=Object(s.a)(["\n  padding: 1.25rem;\n"]);return Ne=function(){return e},e}var Ye=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).handleSubmit=function(e){console.log(n.state),n.setState({processing:!0}),n.state._id?q.a.put(w+"/entry/"+n.state._id,{musician:n.state.musician,city:n.state.city,year:parseInt(n.state.year),note:n.state.note,user_id:n.props.mcmmId}).then(function(e){console.log(e),n.setState({_id:e.data._id,changed:!1,processing:!1})}).catch(function(e){console.log(e)}):q.a.post(w+"/entry",{musician:n.state.musician,city:n.state.city,year:parseInt(n.state.year),note:n.state.note,user_id:n.props.mcmmId}).then(function(e){console.log(e),n.setState({_id:e.data._id,changed:!1,processing:!1})}).catch(function(e){console.log(e)})},n.handleDelete=function(){window.confirm("really?")&&(n.setState({processing:!0}),q.a.delete(w+"/entry/"+n.state._id,{}).then(function(e){console.log(e),n.props.back()}).catch(function(e){console.log(e)}))},n.handleInputChange=function(e){var t,r=e.target,a=r.name,i="year"!==a||"year"===a&&!isNaN(r.value)?r.value:n.state.year;n.setState((t={},Object(ze.a)(t,a,i),Object(ze.a)(t,"changed",!0),t))},n.fixYear=function(e){var t=k.end,n=k.start;return e<n&&""!==e&&(e=n),e>t&&(e=t),e},n.state={musician:n.props.entry?n.props.entry.musician:"",city:n.props.entry?n.props.entry.city:"",year:n.props.entry?n.props.entry.year:"",note:n.props.entry?n.props.entry.note:"",_id:n.props.entry?n.props.entry._id:null,musicians:[],cities:[],changed:!1,processing:!1},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:q.a.get(w+"/entry_uniques/").then(function(e){console.log(e),t.setState({musicians:e.data.musicians}),t.setState({cities:e.data.cities})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return a.a.createElement(We,null,a.a.createElement(Be,null,a.a.createElement(Re,null,F(this.props.translations,"musician_prompt",this.props.locale)),a.a.createElement(De.a,{items:this.state.musicians.map(function(e){return{value:e}}),getItemValue:function(e){return e.value},shouldItemRender:function(e,t){return e.value.toLowerCase().indexOf(t.toLowerCase())>-1},renderItem:function(e,t){return a.a.createElement("div",{key:e.value,style:{backgroundColor:t?"#eee":"transparent"}},e.value)},value:j(this.state.musician),onChange:function(t){return e.setState({musician:t.target.value,changed:!0})},onSelect:function(t){return e.setState({musician:t,changed:!0})},wrapperStyle:{display:"block"},inputProps:{style:Ke}}),a.a.createElement("br",null),a.a.createElement(Re,null,F(this.props.translations,"city_prompt",this.props.locale)),a.a.createElement(De.a,{items:this.state.cities.map(function(e){return{value:e}}),getItemValue:function(e){return e.value},shouldItemRender:function(e,t){return e.value.toLowerCase().indexOf(t.toLowerCase())>-1},renderItem:function(e,t){return a.a.createElement("div",{key:e.value,style:{backgroundColor:t?"#eee":"transparent"}},e.value)},value:j(this.state.city),onChange:function(t){return e.setState({city:t.target.value,changed:!0})},onSelect:function(t){return e.setState({city:t,changed:!0})},wrapperStyle:{display:"block",opacity:1},inputProps:{style:Ke}}),a.a.createElement("br",null),a.a.createElement(Re,null,F(this.props.translations,"year_prompt",this.props.locale)),a.a.createElement("input",{autoComplete:"off",size:"4",maxLength:"4",type:"text",name:"year",value:this.state.year,onChange:this.handleInputChange,onBlur:function(){return e.setState({year:e.fixYear(e.state.year)})}}),a.a.createElement("br",null),a.a.createElement(Re,null,F(this.props.translations,"note_prompt",this.props.locale)),a.a.createElement("textarea",{name:"note",maxlength:"200",value:this.state.note,onChange:this.handleInputChange}),a.a.createElement("br",null),this.state.processing?a.a.createElement("span",null,F(this.props.translations,"...",this.props.locale)):a.a.createElement("div",null,this.state.changed&&a.a.createElement(Ae,{onClick:this.handleSubmit},F(this.props.translations,"save_entry",this.props.locale)),this.state._id&&a.a.createElement(Ae,{onClick:this.handleDelete},F(this.props.translations,"delete_entry",this.props.locale)))))}}]),t}(r.Component),We=g.b.div(Ne()),Re=g.b.label(Pe()),Ke={},Be=g.b.form(Ue()),Ae=g.b.div(Le()),Je=n(43),He=n.n(Je);function Ve(){var e=Object(s.a)(["\n  height: calc(((100vh - ",") / 100vh) * 100vw);\n  max-width:calc(50vh - 0.5 * ",");\n  max-height:calc(50vh - 0.5 * ",");\n  width: 100vw;\n  position: relative;\n  background-color: black;\n  border: 1px solid white;\n\n  > p {\n    position: absolute;\n    width: 100%;\n    color: white;\n    bottom: 0.5rem;\n    opacity: 0.5;\n    z-index: 10;\n    text-align: center;\n  }\n"]);return Ve=function(){return e},e}function qe(){var e=Object(s.a)(["\n  flex: 1;\n  max-width:calc(50vh - 0.5 * ",");\n  width: 100vw;  \n  padding: 2.5rem;\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  background-color: white;\n  border: 1px solid black;\n\n  canvas {\n    width:100% !important;\n    height: auto !important;\n  }\n\n"]);return qe=function(){return e},e}function Xe(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - ",");\n  align-items: center;\n  background-color: black;\n"]);return Xe=function(){return e},e}var Ze=n(88),$e=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).handleScan=function(e){e&&(n.setState({result:e}),"pro_"==e.substring(0,4)?n.props.setUserFilter([n.props.mcmmId]):n.props.setUserFilter([n.props.mcmmId,e]),q.a.get(w+"/set_filter/"+e+"/"+n.props.mcmmId).then(function(e){console.log(e)}).catch(function(e){console.log(e)}))},n.handleError=function(e){console.error(e)},n.state={result:"Scanning..."},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.pollInterval=setInterval(function(){e.props.pollFilter(e.props.mcmmId)},5e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.pollInterval)}},{key:"render",value:function(){return a.a.createElement(Ge,null,a.a.createElement(Qe,null,a.a.createElement(Ze,{value:this.props.mcmmId,size:500})),a.a.createElement(et,null,a.a.createElement(He.a,{delay:300,onError:this.handleError,onScan:this.handleScan}),a.a.createElement("p",null,this.state.result)))}}]),t}(r.Component),Ge=g.b.div(Xe(),"4rem"),Qe=g.b.div(qe(),"4rem"),et=g.b.div(Ve(),"4rem","4rem","4rem");function tt(){var e=Object(s.a)(["\n  padding: 1.25rem;\n"]);return tt=function(){return e},e}var nt=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return a.a.createElement(rt,null,a.a.createElement("div",{dangerouslySetInnerHTML:{__html:F(this.props.translations,this.props.pageKey+"_content",this.props.locale)}}))}}]),t}(r.Component),rt=g.b.div(tt());function at(){var e=Object(s.a)(["\n"]);return at=function(){return e},e}function it(){var e=Object(s.a)(["\n  position: fixed;\n  z-index: 100;\n  right: 1rem;\n  bottom: ",";\n  width: 3rem;\n  height: 3rem;\n  font-size: 4rem;\n  line-height: 1.2rem;\n  font-family: NeutraTextLight;\n  text-align: center;\n  border: 2px solid black;\n  border-radius: 50%;\n  background-color: white;\n  padding: 10px;\n  &:hover {cursor: pointer}; \n"]);return it=function(){return e},e}function ot(){var e=Object(s.a)(["\n  height: 100%;\n  width: 100%;\n  background: #fff;\n"]);return ot=function(){return e},e}function st(){var e=Object(s.a)(["\n  width: auto;\n  height: calc(2 * 1.25rem); // scaling factor for the png image * font-size\n  &:hover {cursor: pointer}; \n"]);return st=function(){return e},e}function lt(){var e=Object(s.a)(["\n  font-size: 2.5rem;\n  padding-left: 1rem;\n  letter-spacing: 0.2ex;\n"]);return lt=function(){return e},e}function ct(){var e=Object(s.a)(["\n  position: fixed;\n  top:0;\n  z-index: 100;\n  display: flex;\n  padding: 1rem;\n"]);return ct=function(){return e},e}var ut=n(26),pt=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).onResize=function(e,t){n.setState({largeScreen:O(e,t)})},n.setLocale=function(e){n.setState({locale:e})},n.toggleMenu=function(){if(n.state.menuOpen){if("edit"==n.state.currentPage)return void n.back();n.navigate("home")}n.setState({menuOpen:!n.state.menuOpen})},n.navigate=function(e,t){if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])){var r=n.state.navStack;r.push(n.state.currentPage),console.log(r),n.setState({navStack:r})}if(n.setState({menuOpen:"home"!==e,currentPage:e,currentEntry:t,pageKey:t}),"list"!=e){var a=window.location.pathname+(n.state.projectionId?"?projection_id="+n.state.projectionId:"");window.history.pushState("",document.title,a)}},n.reset=function(){n.setUserFilter([]),n.navigate("home")},n.back=function(){if("scan"!=n.state.currentPage){var e=n.state.navStack,t=e.pop();n.setState({navStack:e}),n.navigate(t,n.state.entry,!0)}else n.navigate("home")},n.state={examples:[],menuOpen:!1,currentPage:"home",mcmmId:null,navStack:[],userFilter:[],musicianFilter:null,yearFilter:null,translations:[],locale:"de",projectionId:null},n.setUserFilter=n.setUserFilter.bind(Object(f.a)(n)),n.setMusicianFilter=n.setMusicianFilter.bind(Object(f.a)(n)),n.setYearFilter=n.setYearFilter.bind(Object(f.a)(n)),n.setLocale=n.setLocale.bind(Object(f.a)(n)),n.pollFilter=n.pollFilter.bind(Object(f.a)(n)),n.handleFilterClose=n.handleFilterClose.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"setUserFilter",value:function(e){var t=this;this.setState({userFilter:e,musicianFilter:null,yearFilter:null},function(){"home"!=t.state.currentPage&&t.navigate("home")})}},{key:"setMusicianFilter",value:function(e){this.setState({musicianFilter:e,userFilter:[],yearFilter:null})}},{key:"setYearFilter",value:function(e){this.setState({musicianFilter:null,userFilter:[],yearFilter:e})}},{key:"pollFilter",value:function(e){var t=this;q.a.get(w+"/filter?username="+e).then(function(n){if(console.log(n),n.data&&n.data.docs&&n.data.docs.length){var r=t.state.projectionId?[]:[e];n.data.docs[0].filter.forEach(function(e){r.push(e)}),t.setUserFilter(r)}}).catch(function(e){console.log(e)})}},{key:"handleFilterClose",value:function(){console.log("handleFilterClose"),q.a.get(w+"/remove_filter/"+(this.state.projectionId?this.state.projectionId:this.state.mcmmId)).then(function(e){console.log(e)}).catch(function(e){console.log(e)}),this.setUserFilter([]),this.setMusicianFilter(null),this.setYearFilter(null)}},{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t,n,r,a,i,o=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return Object(b.disableBodyScroll)(document.querySelector("body")),t=new URLSearchParams(window.location.search),(n=t.get("projection_id"))?(this.setState({projectionId:n}),this.pollInterval=setInterval(function(){o.pollFilter(n)},5e3)):(r=window.location.hash,a=localStorage.getItem("mcmmId"),r&&(a=r.substr(1),this.setState({currentPage:"list",mcmmId:a,menuOpen:!0,navStack:["home"]})),a||(a=ut()),this.setState({mcmmId:a}),localStorage.setItem("mcmmId",a)),e.next=6,q.a.get(w+"/translation");case 6:i=e.sent,console.log(i),this.setState({translations:i.data.docs});case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearInterval(this.pollInterval)}},{key:"render",value:function(){var e=this,t=this.state.userFilter.length>0||this.state.musicianFilter||this.state.yearFilter,n={home:a.a.createElement(Ie,{mcmmId:this.state.mcmmId,userFilter:this.state.userFilter,setUserFilter:this.setUserFilter,musicianFilter:this.state.musicianFilter,setMusicianFilter:this.setMusicianFilter,yearFilter:this.state.yearFilter,setYearFilter:this.setYearFilter,largeScreen:this.state.largeScreen,translations:this.state.translations,locale:this.state.locale}),list:a.a.createElement(he,{mcmmId:this.state.mcmmId,editEntry:function(t){e.navigate("edit",t)},translations:this.state.translations,locale:this.state.locale,setUserFilter:this.setUserFilter,titleKey:"my_entries",navigate:this.navigate}),edit:a.a.createElement(Ye,{mcmmId:this.state.mcmmId,back:this.back,entry:this.state.currentEntry,translations:this.state.translations,locale:this.state.locale,titleKey:this.state.currentEntry?"update entry":"new entry"}),scan:a.a.createElement($e,{mcmmId:this.state.mcmmId,setUserFilter:this.setUserFilter,translations:this.state.translations,locale:this.state.locale,pollFilter:this.pollFilter,titleKey:"scanner"}),page:a.a.createElement(nt,{translations:this.state.translations,locale:this.state.locale,pageKey:this.state.pageKey,titleKey:this.state.pageKey+"_heading"})},r=n.home,i="home"!==this.state.currentPage?n[this.state.currentPage]:null;return[a.a.createElement(gt,{key:"globalstyles"}),a.a.createElement(v.a,{key:"resize",handleWidth:!0,handleHeight:!0,onResize:this.onResize}),a.a.createElement(R,{menuOpen:this.state.menuOpen,key:"menu",close:this.toggleMenu,navigate:this.navigate,translations:this.state.translations,locale:this.state.locale,setLocale:this.setLocale,reset:this.reset,projectionMode:!!this.state.projectionId,render:i}),a.a.createElement(ft,{key:"main"},!t&&a.a.createElement(ht,null,a.a.createElement(dt,{onClick:this.toggleMenu,src:"images/menu.png"}),a.a.createElement(mt,null,"MATCH CUT")),t&&a.a.createElement(_,{onClose:this.handleFilterClose},this.state.userFilter.length>0&&a.a.createElement("span",null,F(this.state.translations,"filter_for",this.state.locale)," ",this.state.userFilter.length," ",F(this.state.translations,"users",this.state.locale)),this.state.musicianFilter&&a.a.createElement("span",null,F(this.state.translations,"filter_for",this.state.locale)," ",F(this.state.translations,"users_that_named",this.state.locale)," ",j(this.state.musicianFilter)),this.state.yearFilter&&a.a.createElement("span",null,F(this.state.translations,"filter_for",this.state.locale)," ",F(this.state.translations,"entries_from_year",this.state.locale)," ",this.state.yearFilter)),r,("home"===this.state.currentPage&&!t||"list"==this.state.currentPage)&&a.a.createElement(yt,{onClick:function(){return e.navigate("edit")},largeScreen:this.state.largeScreen},"+"))]}}]),t}(r.Component),ht=g.b.div(ct()),mt=g.b.span(lt()),dt=g.b.img(st()),ft=g.b.div(ot()),yt=g.b.div(it(),function(e){return e.largeScreen?"9rem":"2rem"}),gt=Object(g.a)(at()),bt=function(){return a.a.createElement(pt,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(bt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[51,1,2]]]);
//# sourceMappingURL=main.797af23d.chunk.js.map