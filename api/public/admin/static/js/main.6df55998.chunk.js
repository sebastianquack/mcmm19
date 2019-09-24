(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{405:function(e,t,a){e.exports=a(721)},410:function(e,t,a){},721:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),c=a(38),i=a.n(c),s=(a(410),a(742)),u=a(732),l=a(733),d=a(744),m=a(746),f=a(741),h=a(743),p=a(745),E=a(740),w=a(739),g=a(253),v=a.n(g),b=a(331),k=a(731),y=a(55),j=a(13),P=(n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k.a.fetchJson,a=function(e){var t=e.pagination,a=t.page,n=t.perPage,r=e.sort,o=r.field,c=r.order;return o&&(e.filter.$sort=("DESC"===c?"-":"")+o),null!=e.filter.q&&(e.filter.$term=e.filter.q,delete e.filter.q),Object.assign(k.a.flattenObject(e.filter),{$limit:n,$page:a},o?{$sort:("DESC"===c?"-":"")+("id"===o?"_id":o)}:{})},n=function(e){var t=Object.assign({},e.data);return delete t.id,delete t.createdAt,delete t.updatedAt,delete t.deletedAt,delete t.isDeleted,JSON.stringify(t)};return function(r,o,c){if(r===j.i)return Promise.all(c.ids.map(function(a){return t("".concat(e,"/").concat(o,"/").concat(a),{method:"PATCH",body:JSON.stringify(c.data)})})).then(function(e){return{data:e.map(function(e){return e.json})}});if(r===j.c)return Promise.all(c.ids.map(function(a){return t("".concat(e,"/").concat(o,"/").concat(a),{method:"DELETE"})})).then(function(e){return{data:e.map(function(e){return e.json})}});var i=function(t,r,o){var c="",i={};switch(t){case j.d:var s=a(o);c="".concat(e,"/").concat(r,"?").concat(Object(y.stringify)(s));break;case j.g:c="".concat(e,"/").concat(r,"/").concat(o.id);break;case j.f:var u=a(o);u[o.target]=o.id,c="".concat(e,"/").concat(r,"?").concat(Object(y.stringify)(u));break;case j.h:c="".concat(e,"/").concat(r,"/").concat(o.id),i.method="PUT",i.body=n(o);break;case j.a:c="".concat(e,"/").concat(r),i.method="POST",i.body=n(o);break;case j.b:c="".concat(e,"/").concat(r,"/").concat(o.id),i.method="DELETE";break;case j.e:c="".concat(e,"/").concat(r,"?").concat(o.ids.map(function(e){return Object(y.stringify)({_id:e})}).join("&"));break;default:throw new Error("Unsupported fetch action type ".concat(t))}return{url:c,options:i}}(r,o,c),s=i.url,u=i.options;return t(s,u).then(function(e){return function(e,t,a,n){console.log(t,a,n);var r=e.json;switch(t){case j.d:case j.e:case j.f:return{data:r.docs.map(function(e){return(e.id=e._id)&&delete e._id&&e}),total:r.items.total};case j.a:return n.data.id=n.data._id,delete n.data._id,{data:n.data};case j.b:return{data:n};default:return r?(r.id=r._id,delete r._id,{data:r}):{data:{}}}}(e,r,o,c)})}}("/api",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.headers||(t.headers=new Headers({Accept:"application/json"}));var a=localStorage.getItem("token");return t.headers.set("authorization","".concat(a)),k.a.fetchJson(e,t)}),function(){var e=Object(b.a)(v.a.mark(function e(t,a,r){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t,a,r),e.abrupt("return",n(t,a,r));case 2:case"end":return e.stop()}},e)}));return function(t,a,n){return e.apply(this,arguments)}}()),S=a(182),O=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+"/api",_=function(e,t){if(e===S.d){var a=t.username,n=t.password,r=new Request(O+"/login",{method:"POST",body:JSON.stringify({username:a,password:n}),headers:new Headers({"Content-Type":"application/json"})});return fetch(r).then(function(e){if(e.status<200||e.status>=300)throw new Error(e.statusText);return e.json()}).then(function(e){var t=e.token;localStorage.setItem("token",t)})}if(e===S.e)return localStorage.removeItem("token"),Promise.resolve();if(e===S.b){var o=t.status;return 401===o||403===o?(localStorage.removeItem("token"),Promise.reject()):Promise.resolve()}return e===S.a?(console.log("auth check",localStorage.getItem("token")),localStorage.getItem("token")?Promise.resolve():Promise.reject()):Promise.reject("Unknown method")},T=o.a.createElement(s.a,null,o.a.createElement(u.a,{source:"musician"}),o.a.createElement(u.a,{source:"city"}),o.a.createElement(u.a,{source:"year"}),o.a.createElement(l.a,{source:"note"})),I=function(e){return o.a.createElement(d.a,e,T)},J=function(e){return o.a.createElement(m.a,e,T)},C=function(e){return o.a.createElement(f.a,e,o.a.createElement(h.a,{rowClick:"edit"},o.a.createElement(p.a,{source:"musician"}),o.a.createElement(p.a,{source:"city"}),o.a.createElement(p.a,{source:"year"}),o.a.createElement(p.a,{source:"user_id"}),o.a.createElement(p.a,{source:"isDeleted"})))},D=o.a.createElement(s.a,null,o.a.createElement(u.a,{source:"username"}),o.a.createElement(u.a,{source:"filter"})),$=function(e){return o.a.createElement(d.a,e,D)},A=function(e){return o.a.createElement(m.a,e,D)},q=function(e){return o.a.createElement(f.a,e,o.a.createElement(h.a,{rowClick:"edit"},o.a.createElement(p.a,{source:"username"}),o.a.createElement(p.a,{source:"filter"})))},x=function(){return o.a.createElement(E.a,{dataProvider:P,authProvider:_},o.a.createElement(w.a,{name:"entry",list:C,edit:I,create:J}),o.a.createElement(w.a,{name:"filter",list:q,edit:$,create:A}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[405,1,2]]]);
//# sourceMappingURL=main.6df55998.chunk.js.map