!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=16)}([function(e,t,n){var i=n(3),o=n(9);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});e.exports=r},function(e,t,n){var i=n(3),o=n(11);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});e.exports=r},function(e,t,n){var i,o,s=n(12),r=n(13),l=0,c=0;e.exports=function(e,t,n){var d=t&&n||0,a=t||[],u=(e=e||{}).node||i,h=void 0!==e.clockseq?e.clockseq:o;if(null==u||null==h){var p=s();null==u&&(u=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==h&&(h=o=16383&(p[6]<<8|p[7]))}var f=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:c+1,v=f-l+(m-c)/1e4;if(v<0&&void 0===e.clockseq&&(h=h+1&16383),(v<0||f>l)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");l=f,c=m,o=h;var b=(1e4*(268435455&(f+=122192928e5))+m)%4294967296;a[d++]=b>>>24&255,a[d++]=b>>>16&255,a[d++]=b>>>8&255,a[d++]=255&b;var g=f/4294967296*1e4&268435455;a[d++]=g>>>8&255,a[d++]=255&g,a[d++]=g>>>24&15|16,a[d++]=g>>>16&255,a[d++]=h>>>8|128,a[d++]=255&h;for(var y=0;y<6;++y)a[d+y]=u[y];return t||r(a)}},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},s=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),r=[];function l(e){for(var t=-1,n=0;n<r.length;n++)if(r[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],o=0;o<e.length;o++){var s=e[o],c=t.base?s[0]+t.base:s[0],d=n[c]||0,a="".concat(c," ").concat(d);n[c]=d+1;var u=l(a),h={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(r[u].references++,r[u].updater(h)):r.push({identifier:a,updater:v(h,t),references:1}),i.push(a)}return i}function d(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var r=s(e.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}return t}var a,u=(a=[],function(e,t){return a[e]=t,a.filter(Boolean).join("\n")});function h(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var s=document.createTextNode(o),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(s,r[t]):e.appendChild(s)}}function p(e,t,n){var i=n.css,o=n.media,s=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),s&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var f=null,m=0;function v(e,t){var n,i,o;if(t.singleton){var s=m++;n=f||(f=d(t)),i=h.bind(null,n,s,!1),o=h.bind(null,n,s,!0)}else n=d(t),i=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=l(n[i]);r[o].references--}for(var s=c(e,t),d=0;d<n.length;d++){var a=l(n[d]);0===r[a].references&&(r[a].updater(),r.splice(a,1))}n=s}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(r=i,l=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(c," */")),s=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(s).concat([o]).join("\n")}var r,l,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var s=0;s<this.length;s++){var r=this[s][0];null!=r&&(o[r]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);i&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t){e.exports='<div>\n    <button type="button" name="button">Save</button>\n  </div>\n  \n'},function(e,t){e.exports='<div>\n    <button type="button" name="button">Load</button>\n  </div>\n  \n'},function(e,t){e.exports='<div id="modal" class="modal">\n    <div class="modal-header"></div>\n    <div class="modal-content"></div>\n    <div class="modal-footer"></div>\n</div>'},function(e,t,n){e.exports='<div id="workspace-root" tabindex="0">\n\n        <h1> Flowchart goes here </h1>\n        <div id="element-picker"> </div>\n\n        <div id="newObject">\n          <img src="'+n(15).default+'" />\n          \x3c!-- <img src="../assets/addbutton.png"/> --\x3e\n        </div>\n\n</div>'},function(e,t,n){(t=n(4)(!1)).push([e.i,"body{\n    margin:0;\n    padding:0;\n    border:0;\n}\n\n#container-root {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    padding: 0px;\n}\n\n.menu {\n    text-align: center;\n    flex-grow: 1;\n    /*background-color: blue;*/\n    max-width: 20%;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    border-right: solid;\n    border-color: black;\n}\n\n.filemenu {\n    margin-top: 20vh;\n    /*background-color: mediumturquoise;*/\n}\n\n#workspace-root {\n    flex-grow: 8;\n    position: relative;   \n    background-color: mediumseagreen;\n    height: 1500px;\n    padding: 0;\n    margin: 0;\n}\n\n#newObject {\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    position: fixed;\n    right: 3%;\n    bottom: 3%;\n    background-color: orangered;\n}\n\n#newObject img {\n    width: 100%;\n}\n\n#element-picker {\n    background-color: orange;\n    visibility: hidden;\n    position: fixed;\n    right: 6%;\n    bottom: 6%;\n    height: 15vh;\n    width: 15vw;\n}\n\n/*Input circle*/\n._1ot9Raw2QDKYRqMuW2src0 {\n    border-radius: 27.5px 27.5px 0px 0px;\n    height: 25px;\n    width: 50px;\n    margin-top: -25px;\n    margin-left: 25px;\n    background-color: green;\n    cursor: pointer;\n}\n   \n   \n.connector-line {\n    stroke-width: 10;\n    stroke: black;\n    fill: yellowgreen;\n    /*stroke:rgb(255,255,0);*/\n}\n\n.connector {\n    z-index: 1;\n    /* background: transparent; */\n    background-color: blue;\n    pointer-events: none;\n    position:fixed;\n    padding:0px; \n    margin:0px;\n    height:10px;\n    line-height:1px; \n}\n\n/*Output circle*/\n._1Oj6BKLbzii0AcmH0pIYe- {\n    border-radius: 0px 0px 27.5px 27.5px;\n    height: 25px;\n    width: 50px;\n    margin-top: 100px;\n    margin-left: 25px;\n    background-color: red;\n    cursor: pointer;\n}\n\n.IlIxhmMyTdSCZV1cxWXFv {\n    width: 100px;\n    height: 100px;\n    cursor: move;\n    position: absolute;\n    background-color: cornflowerblue;\n}\n\n/* The Modal (background) */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Header */\n.modal-header {\n  margin: 15% auto 0;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Footer */\n.modal-footer {\n  margin: 0 auto;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Content/Box */\n.modal-content {\n  margin: 0 auto;\n  background-color: #fefefe;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 77%; \n}\n",""]),t.locals={boxInput:"_1ot9Raw2QDKYRqMuW2src0",boxOutput:"_1Oj6BKLbzii0AcmH0pIYe-",flowchart_square:"IlIxhmMyTdSCZV1cxWXFv"},e.exports=t},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,s=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function l(){l.init.call(this)}e.exports=l,l.EventEmitter=l,l.prototype._events=void 0,l.prototype._eventsCount=0,l.prototype._maxListeners=void 0;var c=10;function d(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?l.defaultMaxListeners:e._maxListeners}function u(e,t,n,i){var o,s,r,l;if(d(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),r=s[t]),void 0===r)r=s[t]=n,++e._eventsCount;else if("function"==typeof r?r=s[t]=i?[n,r]:[r,n]:i?r.unshift(n):r.push(n),(o=a(e))>0&&r.length>o&&!r.warned){r.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=r.length,l=c,console&&console.warn&&console.warn(l)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(i);return o.listener=n,i.wrapFn=o,o}function f(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):v(o,o.length)}function m(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(l,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),l.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},l.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},l.prototype.getMaxListeners=function(){return a(this)},l.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var r;if(t.length>0&&(r=t[0]),r instanceof Error)throw r;var l=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw l.context=r,l}var c=o[e];if(void 0===c)return!1;if("function"==typeof c)s(c,this,t);else{var d=c.length,a=v(c,d);for(n=0;n<d;++n)s(a[n],this,t)}return!0},l.prototype.addListener=function(e,t){return u(this,e,t,!1)},l.prototype.on=l.prototype.addListener,l.prototype.prependListener=function(e,t){return u(this,e,t,!0)},l.prototype.once=function(e,t){return d(t),this.on(e,p(this,e,t)),this},l.prototype.prependOnceListener=function(e,t){return d(t),this.prependListener(e,p(this,e,t)),this},l.prototype.removeListener=function(e,t){var n,i,o,s,r;if(d(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){r=n[s].listener,o=s;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,r||t)}return this},l.prototype.off=l.prototype.removeListener,l.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(o=s[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},l.prototype.listeners=function(e){return f(this,e,!0)},l.prototype.rawListeners=function(e){return f(this,e,!1)},l.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},l.prototype.listenerCount=m,l.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){(t=n(4)(!1)).push([e.i,"._1MLRU1Xc_z92TUWOWE0MK6 {\n  position: fixed;\n  width: 100px;\n  bottom: 0px;\n  padding: 5px;\n  left: 0px;\n}\n",""]),t.locals={size_button:"_1MLRU1Xc_z92TUWOWE0MK6"},e.exports=t},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,o=n;return[o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]]].join("")}},function(e){e.exports=JSON.parse('[{"element":{},"child_views":[],"posX":295,"posY":158,"height":100,"oldPosY":100,"oldPosX":100,"oldX":100,"oldY":100,"offsetX":84,"offsetY":46,"id":"83bc3fa0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":732,"posY":108,"height":100,"oldPosY":100,"oldPosX":100,"oldX":732,"oldY":108,"offsetX":38,"offsetY":65,"id":"8542dfa0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"fafafaf","input":"efefa","output":"dsf","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":732,"posY":108,"height":100,"oldPosY":100,"oldPosX":100,"oldX":732,"oldY":108,"offsetX":38,"offsetY":65,"id":"8542dfa0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"fafafaf","input":"efefa","output":"dsf","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":894,"posY":281,"height":100,"oldPosY":100,"oldPosX":100,"oldX":894,"oldY":281,"offsetX":64,"offsetY":87,"id":"858259a0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yetagfd","input":"adfg","output":"agfd","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":894,"posY":281,"height":100,"oldPosY":100,"oldPosX":100,"oldX":894,"oldY":281,"offsetX":64,"offsetY":87,"id":"858259a0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yetagfd","input":"adfg","output":"agfd","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":453,"posY":649,"height":100,"oldPosY":100,"oldPosX":100,"oldX":453,"oldY":649,"offsetX":84,"offsetY":46,"id":"85d1b220-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]},{"element":{},"child_views":[],"posX":453,"posY":649,"height":100,"oldPosY":100,"oldPosX":100,"oldX":453,"oldY":649,"offsetX":84,"offsetY":46,"id":"85d1b220-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]},{"element":{},"child_views":[],"posX":968,"posY":726,"height":100,"oldPosY":100,"oldPosX":100,"oldX":968,"oldY":726,"offsetX":84,"offsetY":46,"id":"861af020-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]},{"element":{},"child_views":[],"posX":968,"posY":726,"height":100,"oldPosY":100,"oldPosX":100,"oldX":968,"oldY":726,"offsetX":84,"offsetY":46,"id":"861af020-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]},{"element":{},"child_views":[],"posX":1058,"posY":526,"height":100,"oldPosY":100,"oldPosX":100,"oldX":1058,"oldY":526,"offsetX":40,"offsetY":64,"id":"866cb9a0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"afdg","input":"jkhk","output":"jdhhg","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":1058,"posY":526,"height":100,"oldPosY":100,"oldPosX":100,"oldX":1058,"oldY":526,"offsetX":40,"offsetY":64,"id":"866cb9a0-5238-11ea-90c7-cde812ffc0f2","functionDescription":"afdg","input":"jkhk","output":"jdhhg","onScrolledCallbacks":[null],"lastScrollPosition":0},{"element":{},"child_views":[],"posX":290,"posY":660,"height":100,"oldPosY":100,"oldPosX":100,"oldX":290,"oldY":660,"offsetX":84,"offsetY":46,"id":"86f43920-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]},{"element":{},"child_views":[],"posX":290,"posY":660,"height":100,"oldPosY":100,"oldPosX":100,"oldX":290,"oldY":660,"offsetX":84,"offsetY":46,"id":"86f43920-5238-11ea-90c7-cde812ffc0f2","functionDescription":"No function yet","input":"","output":"","onScrolledCallbacks":[null]}]')},function(e,t,n){"use strict";n.r(t),t.default=n.p+"6347a2a34a2ab5fe252dcd21ded9ef42.png"},function(e,t,n){"use strict";n.r(t);var i={apa:"ok"};var o=class{constructor(e){var t=document.createRange();console.log(e),t.selectNode(document.getElementById("context"));var n=t.createContextualFragment(e);this.element=n.childNodes[0],this.child_views=[]}didAttach(e){}render(){return this.element}attach(e){this.child_views.push(e),this.element.appendChild(e.render()),e.didAttach(this)}addChildView(e){this.child_views.push(e),this.element.appendChild(e.render())}addStyle(e){this.element.classList.append(e)}getPosY(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("top"))}getPosYFromBottom(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("bottom"))}getHeight(){return console.log("LALALAL",this.element.offsetHeight),this.element.offsetHeight}},s=n(0),r=n.n(s);var l=new(n(10));var c=class extends o{constructor(e,t){switch(super("<div></div>"),this.type=t,this.parent=e,this.onClick=this.onClick.bind(this),this.id=e.id,t){case"box-input":this.element.classList.add(r.a.boxInput);break;case"box-output":this.element.classList.add(r.a.boxOutput)}this.element.setAttribute("id",e.id+t),this.connections=[],this.element.onclick=this.onClick}onClick(e){"box-output"==this.type?l.emit("outputClicked",this.id):"box-input"==this.type&&l.emit("inputClicked",this.id)}};var d=class extends o{constructor(e){super("<div></div>"),this.onClick=this.onClick.bind(this),this.elementDrag=this.elementDrag.bind(this),this.mouseDown=this.mouseDown.bind(this),this.setPosY=this.setPosY.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.posX=100,this.posY=100,this.height=100,this.oldPosY=this.posY,this.oldPosX=this.posX,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,this.id=e,this.functionDescription="No function yet",this.input=new c(this,"box-input"),this.output=new c(this,"box-output"),this.element.classList.add(r.a.flowchart_square),this.element.id=e}didAttach(e){this.attach(this.input),this.attach(this.output),this.element.onclick=this.onClick,this.element.onmousedown=this.mouseDown,this.onScrolledCallbacks=[]}copyOther(e,t=e.posX,n=e.posY){this.posX=t+event.view.scrollX-50,this.posY=n+event.view.scrollY-50,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this.height=e.height,this.functionDescription=e.functionDescription,this.input=e.input,this.output=e.output}render(){return this.element.setAttribute("style",`position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`),this.element}print(){console.log(i.apa)}elementDrag(e){(e=e||window.event).preventDefault();let t=e.clientX-this.offsetX,n=e.clientY-this.offsetY;t=t<0?0:t,n=n<0?0:n;const i=window.innerHeight-this.height,o=i+window.scrollY;n=n-window.scrollY>=i?o:n,this.element.style.top=`${this.posY}px`,this.element.style.left=`${t}px`,this.posX=t,this.posY=n}closeDragElement(e){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}setPosY(e){this.posY=e}onScrolled(e){this.onScrolledCallbacks.push(e)}mouseDown(e){(e=e||window.event).preventDefault(),this.lastScrollPosition=window.scrollY,this.offsetX=e.clientX-this.posX,this.offsetY=e.clientY-this.posY,document.addEventListener("mouseup",e=>{this.closeDragElement(e)}),document.onmousemove=e=>{this.elementDrag(e)};let t=document.getElementById(this.id).style.cssText;document.getElementById(this.id).setAttribute("style",t+" box-shadow: 0px 0px 40px 20px #0ff;")}onClick(e){l.emit("clicked",this.id,e)}},a=n(1),u=n.n(a);var h=class extends o{constructor(e){super(e)}didAttach(e){super.didAttach(e),this.element.onclick=this.onClick}onClick(e){}};class p extends h{constructor(){super('<button type="button" name="button">Increase</button>'),this.render=this.render.bind(this),this.name="JI",this.onClick=this.onClick.bind(this)}onClick(e){l.emit("increase_size")}}class f extends h{constructor(){super('<button type="button" name="decrease_button">Decrease</button>'),this.render=this.render.bind(this),this.name="JI",this.onClick=this.onClick.bind(this)}onClick(e){l.emit("decrease_size")}}var m=class extends o{constructor(){super("<div></div>")}didAttach(e){super.didAttach(e),this.increase_size_btn=new p,this.attach(this.increase_size_btn),this.decrease_size_btn=new f,this.attach(this.decrease_size_btn)}render(){return this.child_views.forEach(e=>e.render()),this.element.classList.add(u.a.size_button),this.element}},v=n(5),b=n.n(v);var g=class extends h{constructor(){super(b.a),this.render=this.render.bind(this),this.name="Save",this.onClick=this.onClick.bind(this)}didAttach(e){super.didAttach(e)}render(){return this.child_views.forEach(e=>e.render()),this.element}onClick(e){l.emit("save")}},y=n(6),w=n.n(y);var x=class extends h{constructor(){super(w.a),this.render=this.render.bind(this),this.name="Load",this.onClick=this.onClick.bind(this)}didAttach(e){super.didAttach(e)}render(){return this.child_views.forEach(e=>e.render()),this.element}onClick(e){l.emit("load")}},k=n(7),C=n.n(k);var Y=class extends o{constructor(){super(C.a),this.obj={},this.render=this.render.bind(this)}show(e){this.obj=e,this.element.style.display="block";let t=this.element.childNodes,n=t[1],i=t[3],o=t[5];var s,r,l,c;s=n,r=i,l=o,c=this.obj,s.textContent="ID: "+c.id.toString(),function(e,t){e.innerHTML=`\n                            <div id="boxtime">                       \n                              Input: <input type="text" id="inputBox" value="${t.input}"> </br>\n                              Output: <input type="text" id="outputBox" value="${t.output}"> </br>\n                              Description: <input type="text" id="fundescBox" value="${t.functionDescription}">\n                            </div>`}(r,c),l.textContent="Close"}close(e){this.obj.input=document.getElementById("inputBox").value,this.obj.output=document.getElementById("outputBox").value,this.obj.functionDescription=document.getElementById("fundescBox").value,this.element.style.display="none"}render(){return this.child_views.forEach(e=>e.render()),this.element}};n(2);var _=class{constructor(){this.obj={}}saveFlow(e){console.log(e[0])}loadFlow(e,t){let i=n(14),o=i,s=0;for(console.log(i),s=0;s<o.length;s++)if(null==document.getElementById(o[s].id)){console.log("yyet");let n=new d(o[s].id);n.copyOther(o[s],o[s].posX,o[s].posY),e.push(n),t.attach(n)}console.log(s)}},X=n(8),j=n.n(X);var O=class extends o{constructor(){super("<div></div>"),this.render=this.render.bind(this)}updateConnections(e,t){let n=function(e,t,n,i){let o=e-n,s=t-i,r=Math.abs(o),l=Math.abs(s),c=Math.sqrt(Math.pow(r,2)+Math.pow(l,2)),d=180*Math.atan2(l,r)/Math.PI,a=e;o>0?(a=e-r/2,d=180-d):o<0&&(a=e+r/2);let u=t;return s>0?(u=t-l/2,d=180-d):s<0&&(u=t+l/2),a-=c/2,[c,a,u,d]}(e.posX+50,e.posY+115,t.posX+50,t.posY-15);this.element.setAttribute("style",`width:${n[0]}px; left:${n[1]}px; top:${n[2]}px; transform:rotate(${n[3]}deg);`)}render(){return this.element}};const S=n(2);var L=class extends o{constructor(){super(j.a),this.onClick=this.onClick.bind(this),this.onKeyPress=this.onKeyPress.bind(this),this.height=3e3,this.childScrolled=this.childScrolled.bind(this),this.modal=new Y,this.saveClass=new _,this.objects=[],this.markedObject=null,this.markedOutput="",this.connectorList=[],this.objectClick={},this.copyObject={},this.mouseX=0,this.mouseY=0,this.sizeDelta=200,l.on("clicked",(e,t)=>{this.objectClick=t;let n=this.objects.find(t=>t.id==e);n==this.markedObject?(n.closeDragElement(),this.modal.show(n),window.onclick=function(e){e.target==this.modal.element&&this.modal.close()}.bind(this)):(null!=this.markedObject&&this.removeMarked(),this.markedObject=n)}),l.on("outputClicked",e=>{this.markedOutput=e}),l.on("inputClicked",e=>{if(e!=this.markedOutput&&""!=this.markedOutput){let t=this.objects.find(t=>t.id==e),n=this.objects.find(e=>e.id==this.markedOutput),i={};t.input.connections.includes(this.markedOutput)?i=this.connectorList.find(e=>e.id==t.id+n.id):(t.input.connections.push(this.markedOutput),n.output.connections.push(t.id),i=new O,i.id=t.id+n.id,i.element.classList.add("connector"),this.attach(i),this.connectorList.push(i)),this.markedOutput="",i.updateConnections(n,t)}})}didAttach(e){const t=new m;this.attach(t);const n=new g;this.attach(n),l.on("save",()=>{this.saveClass.saveFlow(this.objects)});const i=new x;this.attach(i),l.on("load",()=>{this.saveClass.loadFlow(this.objects,this)}),this.attach(this.modal),l.on("increase_size",()=>{this.increaseSize()}),l.on("decrease_size",()=>{this.decreaseSize()}),this.element.onkeydown=this.onKeyPress,this.element.onclick=this.onClick}onClick(e){e.clientX==this.objectClick.clientX&&e.clientY==this.objectClick.clientY||null==this.markedObject||this.removeMarked()}removeMarked(){let e=document.getElementById(this.markedObject.id).style.cssText;e=e.split(" box-shadow")[0],document.getElementById(this.markedObject.id).style.cssText=e,this.markedObject=null}onKeyPress(e){if(e.ctrlKey)if(67==e.keyCode)null!=this.markedObject&&(document.addEventListener("mousemove",e=>{this.mouseX=e.clientX,this.mouseY=e.clientY}),this.copyObject=new d(S()),this.copyObject.copyOther(this.markedObject,this.mouseX,this.mouseY));else if(86==e.which&&null!=this.copyObject){let e=new d(S());e.copyOther(this.copyObject,this.mouseX,this.mouseY),this.objects.push(e),this.addBox(e)}}render(){return this.child_views.forEach(e=>e.render()),this.setHeight(this.height),this.element}increaseSize(){this.setHeight(this.height+this.sizeDelta)}decreaseSize(){if(window.innerHeight<this.height-this.sizeDelta){for(let e=0;e<this.objects.length;e++){const t=this.objects[e];if(t.getPosY()+t.getHeight()>this.height-this.sizeDelta)return}this.setHeight(this.height-this.sizeDelta)}}setHeight(e){this.height=e,this.element.style.height=`${e}px`}addBox(e){this.objects.push(e),this.attach(e),e.onScrolled(this.childScrolled)}childScrolled(e,t){e+t>=this.height&&this.increaseSize()}};var P=class{constructor(e){this.root=document.querySelector("#container-root");const t=e.render();this.root.appendChild(t),e.didAttach(this)}};const E=n(2);!function(){const e=new L;new P(e),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const t=new d(E());e.addBox(t),t.print()}))}()}]);