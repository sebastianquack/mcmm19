(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(t,e,n){t.exports=n(358)},163:function(t,e,n){},358:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),i=n(147),r=n.n(i),s=(n(163),n(1)),c=n(10),l=n.n(c),u=n(17),p=n(5),d=n(6),h=n(8),f=n(7),b=n(9),m=n(148),v=n.n(m),k=n(151),g=n.n(k),y=n(152),S=n.n(y),P=n(153),C=n.n(P),x=n(2),O=n(22),j=n.n(O);function E(t,e){for(var n=0;n<t.docs.length;n++)if(t.docs[n].key==e)return"text"==t.docs[n].type?t.docs[n].value:Number.parseFloat(t.docs[n].value);return null}function w(t,e,n){for(var a=0;a<t.length;a++)if(t[a].key==e){var o=t[a]["content_"+n];return o||"["+e+"]"}return"["+e+"]"}function L(){var t=Object(s.a)(["\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  right: 10px;\n  bottom: 120px;\n  padding: 5px;\n  box-shadow: 2px 2px #ddd;\n  border-radius: 2px;\n  background-color: white;\n  font-weight: bold;\n  :hover {cursor: pointer};\n"]);return L=function(){return t},t}function T(){var t=Object(s.a)(["\n  :hover {cursor: pointer};\n"]);return T=function(){return t},t}function _(){var t=Object(s.a)(["\n  display: flex;\n  width: 100%; \n  box-sizing: border-box;\n  flex-direction: column;\n  position: fixed;\n  visibility: ","\n"]);return _=function(){return t},t}var q={fillColor:"gray",fillOpacity:.25,strokeColor:"gray",strokeOpacity:1,strokeWeight:1.5},A=v()(function(t){var e=t.position,n=t.userPosition,a=t.defaultZoom,i={center:e,options:{streetViewControl:!1,fullscreenControl:!1,mapTypeControl:!1}},r=t.places.map(function(e,n){return e.locale==t.locale?o.a.createElement(S.a,{key:n,position:{lat:e.lat,lng:e.lon},onClick:function(){t.openPlace(e)}}):null}),s=o.a.createElement(C.a,{center:n,radius:250,options:q});return o.a.createElement(g.a,Object.assign({defaultZoom:a,defaultCenter:e},i),r,t.userPosition&&s)}),N=function(t){return o.a.createElement(M,{onClick:t.onClick},t.place.name_en)},D=function(t){function e(t){var n;return Object(p.a)(this,e),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).state={userPosition:null},n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){var t=Object(u.a)(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("/api/config");case 2:e=t.sent,this.setState({defaultPosition:{lat:E(e.data,"base_lat"),lng:E(e.data,"base_lon")},defaultZoom:E(e.data,"base_zoom")});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;this.props.places&&this.props.places.map(function(e,n){return o.a.createElement(N,{key:n,place:e,onClick:function(){return t.props.openPlace(e)}})});return console.log(this.props.places),o.a.createElement(B,{visible:this.props.visible},this.state.defaultPosition&&o.a.createElement(A,{containerElement:o.a.createElement("div",{style:{height:"100%"}}),mapElement:o.a.createElement("div",{style:{height:"100vh"}}),position:this.state.userPosition?this.state.userPosition:this.state.defaultPosition,userPosition:this.state.userPosition,defaultZoom:this.state.defaultZoom,places:this.props.places,openPlace:this.props.openPlace,locale:this.props.locale}),o.a.createElement(I,{src:"/images/locate.png",onClick:function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){var n={lat:e.coords.latitude,lng:e.coords.longitude};console.log("setting userPosition"),t.setState({userPosition:n})},function(){alert("couldn't get location")},{enableHighAccuracy:!0,timeout:5e3,maximumAge:0}):alert("browser doesn't support location")}}))}}]),e}(a.Component),B=x.a.div(_(),function(t){return t.visible?"visible":"hidden"}),M=x.a.li(T()),I=x.a.img(L()),R=n(13),z=(n(357),window.AudioContext||window.webkitAudioContext),W=Date.now(),Z=function(t){function e(t){var n;return Object(p.a)(this,e),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).req=new XMLHttpRequest,n.req.open("GET",n.props.path,!0),n.req.responseType="arraybuffer",n.req.onload=function(){200===n.req.status&&(console.log("complete"),n.props.onComplete(n.req.response))},n.req.onprogress=function(t){if(t.lengthComputable){var e=t.loaded/t.total*100;n.props.onProgress(e)}},n.req.send(),n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentWillUnmount",value:function(){this.req.onload=null,this.req.onprogress=null}},{key:"render",value:function(){return null}}]),e}(o.a.Component),K=function(t){function e(t){var n;return Object(p.a)(this,e),console.log("tracks",t.tracks),W=Date.now(),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).doSkip=function(t){var e=!1;"playing"==n.state.controlStatus&&(n.updatePlaybackControlStatus("paused"),e=!0);var a=n.state.playbackPosition+t;a<0&&(a=0),n.setState({playbackPosition:a},function(){e&&(console.log("resuming play"),n.updatePlaybackControlStatus("playing"))})},n.state={channelsOn:t.activeTracks?t.activeTracks:t.tracks.map(function(){return!0}),controlStatus:t.playbackControlStatus?t.playbackControlStatus:"loading",loadingStatus:"",avgLoaded:0,playbackPosition:0,playbackStartedAt:0},n.handlePlay=n.handlePlay.bind(Object(R.a)(n)),n.handlePause=n.handlePause.bind(Object(R.a)(n)),n.handleRewind=n.handleRewind.bind(Object(R.a)(n)),n.updatePlaybackPosition=n.updatePlaybackPosition.bind(Object(R.a)(n)),n.audioContext=new z,n.audioBuffers=t.tracks.map(function(){return null}),n.samples=t.tracks.map(function(){return null}),n.gainNodes=t.tracks.map(function(){return n.audioContext.createGain()}),n.panners=t.tracks.map(function(t,e){return"undefined"!==typeof StereoPannerNode?new StereoPannerNode(n.audioContext,{pan:0}):null}),n.loaded=t.tracks.map(function(){return 0}),n.decoded=t.tracks.map(function(){return!1}),n.calculateLoadingStatus=n.calculateLoadingStatus.bind(Object(R.a)(n)),n.loaders=n.props.tracks.map(function(t,e){return o.a.createElement(Z,{key:e,path:t.file,onProgress:function(t){n._unmounted||(n.loaded[e]=t,n.calculateLoadingStatus())},onComplete:function(){var t=Object(u.a)(l.a.mark(function t(a){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?n.audioContext.decodeAudioData(a,function(t){n._unmounted||(console.log("decoded safari"),n.audioBuffers[e]=t,n.loaded[e]=100,n.decoded[e]=!0,n.calculateLoadingStatus())}):n.audioContext.decodeAudioData(a).then(function(t){n._unmounted||(console.log("decoded"),n.audioBuffers[e]=t,n.loaded[e]=100,n.decoded[e]=!0,n.calculateLoadingStatus())});case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()})}),console.log("loaders",n.loaders),n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){this._unmounted=!1}},{key:"componentWillUnmount",value:function(){this.handlePause(),this._unmounted=!0}},{key:"calculateLoadingStatus",value:function(){var t=0;this.loaded.forEach(function(e){return t+=Number(e)});var e=(t/this.loaded.length).toFixed(1);this.setState({avgLoaded:e});var n=!0;this.decoded.forEach(function(t){t||(n=!1)}),e<100?this.updateLoadingStatus("loading... "+e+"%"):this.updateLoadingStatus("preparing..."),100==e&&n&&(this.updatePlaybackControlStatus("ready"),this.updateLoadingStatus(""))}},{key:"updateLoadingStatus",value:function(t){this.setState({loadingStatus:t}),this.props.updateLoadingStatus&&this.props.updateLoadingStatus(t)}},{key:"updatePlaybackControlStatus",value:function(t){this.props.updatePlaybackControlStatus&&this.props.updatePlaybackControlStatus(t),this.state.controlStatus!==t&&(this.setState({controlStatus:t}),"playing"===t&&this.handlePlay(),"ready"===t&&this.handleRewind(),"paused"===t&&this.handlePause())}},{key:"componentDidUpdate",value:function(){if(this.props.controls||this.state.controlStatus!==this.props.playbackControlStatus&&(this.setState({controlStatus:this.props.playbackControlStatus}),"playing"===this.props.playbackControlStatus&&this.handlePlay(),"ready"===this.props.playbackControlStatus&&this.handleRewind(),"paused"===this.props.playbackControlStatus&&this.handlePause()),this.props.activeTracks)for(var t=0;t<this.props.activeTracks.length;t++)this.gainNodes[t]&&(this.gainNodes[t].gain.value=this.props.activeTracks[t]?1:0)}},{key:"playSample",value:function(t,e){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=this.audioContext.createBufferSource();o.buffer=this.audioBuffers[t],this.panners[t]?o.connect(this.gainNodes[t]).connect(this.panners[t]).connect(this.audioContext.destination):o.connect(this.gainNodes[t]).connect(this.audioContext.destination),o.start(e,a),0==t&&(o.onended=function(){console.log("ended"),"playing"===n.props.playbackControlStatus&&n.props.updatePlaybackControlStatus("ready")}),this.samples[t]=o}},{key:"handlePlay",value:function(){var t=this;"suspended"===this.audioContext.state&&this.audioContext.resume();var e=this.audioContext.currentTime;this.setState({playbackPosition:this.state.playbackPosition,playbackStartedAt:e-this.state.playbackPosition}),console.log("starting to play at "+e),this.props.updateSequenceStartedAt&&this.props.updateSequenceStartedAt(W+1e3*(e-this.state.playbackPosition)),this.audioBuffers.forEach(function(n,a){t.playSample(a,e,t.state.playbackPosition)}),this.playbackPositionInterval=setInterval(this.updatePlaybackPosition,1e3)}},{key:"handlePause",value:function(){this.samples.forEach(function(t){t&&t.stop()}),this.updatePlaybackPosition(),clearInterval(this.playbackPositionInterval)}},{key:"updatePlaybackPosition",value:function(){this.audioContext&&this.setState({playbackPosition:this.audioContext.currentTime-this.state.playbackStartedAt})}},{key:"handleRewind",value:function(){this.samples.forEach(function(t){t&&t.stop()}),this.setState({playbackPosition:0}),clearInterval(this.playbackPositionInterval)}},{key:"formatTime",value:function(t){var e=t.toFixed(0),n=Math.floor(e/60),a=e-60*n;return a<10&&(a="0"+a),n+":"+a}},{key:"render",value:function(){var t=this,e="loading"!=this.state.controlStatus;return o.a.createElement("div",null,this.loaders,this.props.controls&&e&&"playing"!=this.state.controlStatus&&o.a.createElement("button",{onClick:function(){return t.updatePlaybackControlStatus("playing")}},"Play"),this.props.controls&&e&&"paused"!=this.state.controlStatus&&"ready"!=this.state.controlStatus&&o.a.createElement("button",{onClick:function(){return t.updatePlaybackControlStatus("paused")}},"Pause"),this.props.controls&&e&&"ready"!=this.state.controlStatus&&o.a.createElement("button",{onClick:function(){return t.updatePlaybackControlStatus("ready")}},"Rewind"),this.props.controls&&e&&o.a.createElement("div",null,o.a.createElement("span",null,this.formatTime(this.state.playbackPosition)),o.a.createElement("button",{onClick:function(){return t.doSkip(5)}},"+5"),o.a.createElement("button",{onClick:function(){return t.doSkip(-5)}},"-5")),this.props.controls&&o.a.createElement("p",null,this.state.loadingStatus))}}]),e}(o.a.Component);function F(){var t=Object(s.a)(["\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  padding: 20px;\n"]);return F=function(){return t},t}function J(){var t=Object(s.a)(["\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  :hover {cursor: pointer};\n"]);return J=function(){return t},t}var U=function(t){function e(t){var n;return Object(p.a)(this,e),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).state={playbackControlStatus:"loading",activeTracks:[!0,!1,!1],tracks:null},n.updatePlaybackControlStatus=n.updatePlaybackControlStatus.bind(Object(R.a)(n)),n.toggleTrack=n.toggleTrack.bind(Object(R.a)(n)),n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){var t=Object(u.a)(l.a.mark(function t(){var e,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("/api/place/"+this.props.place._id,{params:{$embed:JSON.stringify(["audio1","audio2","audio3"])}});case 2:e=t.sent,console.log(e),n=[{file:e.data.audio1.url},{file:e.data.audio2.url},{file:e.data.audio3.url}],console.log(n),this.setState({place:e.data,tracks:n});case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"updatePlaybackControlStatus",value:function(t){this.setState({playbackControlStatus:t})}},{key:"toggleTrack",value:function(t){var e=[!1,!1,!1];e[t]=!0,this.setState({activeTracks:e})}},{key:"render",value:function(){var t=this,e=this.state.activeTracks.map(function(e,n){return o.a.createElement("button",{onClick:function(){t.toggleTrack(n)}},"Channel ",n+1,": ",e?"on":"off")});return o.a.createElement("div",null,o.a.createElement(H,null,o.a.createElement("h2",null,this.state.place?this.state.place.name:"loading..."),o.a.createElement("p",null,this.state.place?this.state.place.description:"loading..."),this.state.tracks&&o.a.createElement(K,{playbackControlStatus:this.state.playbackControlStatus,updatePlaybackControlStatus:this.updatePlaybackControlStatus,tracks:this.state.tracks,activeTracks:this.state.activeTracks,controls:!0}),"loading"!=this.state.playbackControlStatus&&e),o.a.createElement(G,{onClick:this.props.exitPlace},"\u274e"))}}]),e}(a.Component),G=x.a.div(J()),H=x.a.div(F());function $(){var t=Object(s.a)(["\n  position: absolute;\n  z-index: 50;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 100vh;\n  padding: 20px;\n  background-color: white;\n"]);return $=function(){return t},t}function V(){var t=Object(s.a)(["\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  :hover {cursor: pointer};\n"]);return V=function(){return t},t}function X(){var t=Object(s.a)(["\n  padding-left: 20px;\n  margin-bottom: 40px;\n"]);return X=function(){return t},t}function Q(){var t=Object(s.a)(["\n  width: 20px;\n  height: 20px;\n  padding-right: 5px;\n"]);return Q=function(){return t},t}function Y(){var t=Object(s.a)(["\n  \n"]);return Y=function(){return t},t}function tt(){var t=Object(s.a)(["\n :hover {cursor: pointer}; \n user-select: none;\n"]);return tt=function(){return t},t}function et(){var t=Object(s.a)(["\n  text-decoration: ",";\n  :hover {cursor: ","};\n"]);return et=function(){return t},t}var nt=function(t){function e(){return Object(p.a)(this,e),Object(h.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(b.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){var t=this,e=["en","no"].map(function(e){return o.a.createElement(ot,{active:e==t.props.locale,onClick:function(){return t.props.setLocale(e)}},e)});return o.a.createElement("div",null,o.a.createElement("p",null,w(this.props.translations,"language_prompt",this.props.locale)),o.a.createElement("ul",null,e))}}]),e}(a.Component),at=function(t){function e(t){var n;Object(p.a)(this,e),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).toggleSection=function(t){var e=n.state.menuSections;e[t].open=!e[t].open,n.setState({menuSections:e})};var a=[];return n.props.translations.forEach(function(t){var e=/(menu_)(\d+)(_title)/g.exec(t.key);e&&4==e.length&&a.push({open:!1,titleKey:t.key,contentKey:"menu_"+e[2]+"_content"})}),n.state={menuSections:a},n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){var t=this,e=this.state.menuSections.map(function(e,n){return o.a.createElement(rt,null,o.a.createElement(it,{onClick:function(){t.toggleSection(n)}},o.a.createElement(st,{src:e.open?"/images/Menu_close.png":"/images/Menu_open.png"}),w(t.props.translations,e.titleKey,t.props.locale)),e.open&&o.a.createElement(ct,null,w(t.props.translations,e.contentKey,t.props.locale)))});return o.a.createElement(ut,null,o.a.createElement(lt,{onClick:this.props.close},"\u274e"),o.a.createElement(nt,{locale:this.props.locale,setLocale:this.props.setLocale,translations:this.props.translations}),o.a.createElement("h1",null,w(this.props.translations,"main_title",this.props.locale)),e)}}]),e}(a.Component),ot=x.a.li(et(),function(t){return t.active?"none":"underline"},function(t){return t.active?"default":"pointer"}),it=x.a.h3(tt()),rt=x.a.div(Y()),st=x.a.img(Q()),ct=x.a.p(X()),lt=x.a.div(V()),ut=x.a.div($());function pt(){var t=Object(s.a)(["\n  position: absolute;\n  z-index: 100;\n  width: 30px;\n  height: 30px;\n  left: 10px;\n  top: 10px;\n  :hover {cursor: pointer}; \n"]);return pt=function(){return t},t}var dt=function(t){function e(t){var n;return Object(p.a)(this,e),(n=Object(h.a)(this,Object(f.a)(e).call(this,t))).setLocale=function(t){n.setState({locale:t})},n.state={places:[],currentPlace:null,menuOpen:!1,translations:[],locale:"en"},n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){var t=Object(u.a)(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("/api/place");case 2:return e=t.sent,this.setState({places:e.data.docs}),t.next=6,j.a.get("/api/translation");case 6:e=t.sent,this.setState({translations:e.data.docs});case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return o.a.createElement("div",null,!this.state.menuOpen&&!this.state.currentPlace&&o.a.createElement(ht,{src:"/images/menu.png",onClick:function(){t.setState({menuOpen:!0})}}),this.state.menuOpen&&o.a.createElement(at,{close:function(){t.setState({menuOpen:!1})},translations:this.state.translations,locale:this.state.locale,setLocale:this.setLocale}),o.a.createElement(D,{visible:!this.state.currentPlace,places:this.state.places,openPlace:function(e){t.setState({currentPlace:e})},locale:this.state.locale}),this.state.currentPlace&&o.a.createElement(U,{place:this.state.currentPlace,exitPlace:function(){t.setState({currentPlace:null})},locale:this.state.locale}))}}]),e}(a.Component),ht=x.a.img(pt()),ft=function(){return o.a.createElement(dt,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(ft,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[158,1,2]]]);
//# sourceMappingURL=main.ee3415d1.chunk.js.map