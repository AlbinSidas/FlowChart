!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([function(e,t,n){var i=n(2),o=n(5);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1},s=(i(o,r),o.locals?o.locals:{});e.exports=s},function(e,t,n){var i=n(2),o=n(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1},s=(i(o,r),o.locals?o.locals:{});e.exports=s},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function c(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},i=[],o=0;o<e.length;o++){var r=e[o],l=t.base?r[0]+t.base:r[0],a=n[l]||0,d="".concat(l," ").concat(a);n[l]=a+1;var h=c(d),u={css:r[1],media:r[2],sourceMap:r[3]};-1!==h?(s[h].references++,s[h].updater(u)):s.push({identifier:d,updater:v(u,t),references:1}),i.push(d)}return i}function a(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var s=r(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var d,h=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function u(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=h(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function p(e,t,n){var i=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var f=null,m=0;function v(e,t){var n,i,o;if(t.singleton){var r=m++;n=f||(f=a(t)),i=u.bind(null,n,r,!1),o=u.bind(null,n,r,!0)}else n=a(t),i=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=c(n[i]);s[o].references--}for(var r=l(e,t),a=0;a<n.length;a++){var d=c(n[a]);0===s[d].references&&(s[d].updater(),s.splice(d,1))}n=r}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(s=i,c=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(l," */")),r=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([o]).join("\n")}var s,c,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(o[s]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);i&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){var i,o,r=n(8),s=n(9),c=0,l=0;e.exports=function(e,t,n){var a=t&&n||0,d=t||[],h=(e=e||{}).node||i,u=void 0!==e.clockseq?e.clockseq:o;if(null==h||null==u){var p=r();null==h&&(h=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==u&&(u=o=16383&(p[6]<<8|p[7]))}var f=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:l+1,v=f-c+(m-l)/1e4;if(v<0&&void 0===e.clockseq&&(u=u+1&16383),(v<0||f>c)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=f,l=m,o=u;var g=(1e4*(268435455&(f+=122192928e5))+m)%4294967296;d[a++]=g>>>24&255,d[a++]=g>>>16&255,d[a++]=g>>>8&255,d[a++]=255&g;var b=f/4294967296*1e4&268435455;d[a++]=b>>>8&255,d[a++]=255&b,d[a++]=b>>>24&15|16,d[a++]=b>>>16&255,d[a++]=u>>>8|128,d[a++]=255&u;for(var x=0;x<6;++x)d[a+x]=h[x];return t||s(d)}},function(e,t,n){(t=n(3)(!1)).push([e.i,"/* \nbody{\n    margin:0;\n    padding:0;\n    border:0;\n}\n\n#container-root {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    padding: 0px;\n}\n\n.menu {\n    text-align: center;\n    flex-grow: 1;\n    max-width: 20%;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    border-right: solid;\n    border-color: black;\n}\n\n.filemenu {\n    margin-top: 20vh;\n}\n\n#workspace-root {\n    flex-grow: 8;\n    position: relative;   \n    background-color: mediumseagreen;\n    height: 1500px;\n    padding: 0;\n    margin: 0;\n}\n\n#newObject {\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    position: fixed;\n    right: 3%;\n    bottom: 3%;\n    background-color: orangered;\n}\n#newObject img {\n    width: 100%;\n}\n\n#element-picker {\n    background-color: orange;\n    visibility: hidden;\n    position: fixed;\n    right: 6%;\n    bottom: 6%;\n    height: 15vh;\n    width: 15vw;\n}\n*/\n\n/*Input circle*/\n ._1ot9Raw2QDKYRqMuW2src0 {\n border-radius: 27.5px 27.5px 0px 0px;\n height: 25px;\n width: 50px;\n margin-top: -25px;\n margin-left: 25px;\n background-color: green;\n cursor: pointer;\n}\n\n\n.connector-line {\n    stroke-width: 10;\n    stroke: black;\n    fill: yellowgreen;\n    /*stroke:rgb(255,255,0);*/\n}\n\n.connector {\n    z-index: 1;\n    /* background: transparent; */\n    background-color: blue;\n    pointer-events: none;\n    position:fixed;\n    padding:0px; \n    margin:0px;\n    height:10px;\n    line-height:1px; \n}\n\n/*Output circle*/\n ._1Oj6BKLbzii0AcmH0pIYe- {\n    border-radius: 0px 0px 27.5px 27.5px;\n    height: 25px;\n    width: 50px;\n    margin-top: 100px;\n    margin-left: 25px;\n    background-color: red;\n    cursor: pointer;\n}\n/*\n\n.flowchart-square {\n    width: 100px;\n    height: 100px;\n    cursor: move;\n    position: absolute;\n    background-color: cornflowerblue;\n    z-index: 2;\n    z-index: 2;\n}\n*/\n/* The Modal (background) */\n\nbody{\n    margin:0;\n    padding:0;\n    border:0;\n}\n\n#container-root {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    padding: 0px;\n}\n\n.menu {\n    text-align: center;\n    flex-grow: 1;\n    /*background-color: blue;*/\n    max-width: 20%;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    border-right: solid;\n    border-color: black;\n}\n\n.filemenu {\n    margin-top: 20vh;\n    /*background-color: mediumturquoise;*/\n}\n\n#workspace-root {\n    flex-grow: 8;\n    position: relative;   \n    background-color: mediumseagreen;\n    height: 1500px;\n    padding: 0;\n    margin: 0;\n}\n\n#newObject {\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    position: fixed;\n    right: 3%;\n    bottom: 3%;\n    background-color: orangered;\n}\n\n#newObject img {\n    width: 100%;\n}\n\n#element-picker {\n    background-color: orange;\n    visibility: hidden;\n    position: fixed;\n    right: 6%;\n    bottom: 6%;\n    height: 15vh;\n    width: 15vw;\n}\n\n#box1 {\n    background-color: mediumaquamarine;\n    height: 100px;\n    width: 100px;\n    margin-right: 400px;\n    margin-bottom: 200px;\n    margin-left: 40px;\n    padding: 0px;\n}\n\n.box-input {\n border-radius: 50%;\n height: 50px;\n width: 50px;\n margin-top: 25px;\n margin-left: -25px;\n background-color: salmon;\n}\n\n.box-output {\n    border-radius: 50%;\n    height: 50px;\n    width: 50px;\n    margin-top: -25px;\n    margin-left: 75px;\n    background-color: orange;\n}\n\n#box2 {\n    background-color: gold;\n    height: 100px;\n    width: 100px;\n    margin-left: 100px;\n    padding: 0px;\n}\n\n.IlIxhmMyTdSCZV1cxWXFv {\n    width: 100px;\n    height: 100px;\n    cursor: move;\n    position: absolute;\n    background-color: cornflowerblue;\n}\n\n/* The Modal (background) */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Header */\n.modal-header {\n  margin: 15% auto 0;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Footer */\n.modal-footer {\n  margin: 0 auto;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Content/Box */\n.modal-content {\n  margin: 0 auto;\n  background-color: #fefefe;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 77%; \n}\n",""]),t.locals={boxInput:"_1ot9Raw2QDKYRqMuW2src0",boxOutput:"_1Oj6BKLbzii0AcmH0pIYe-",flowchart_square:"IlIxhmMyTdSCZV1cxWXFv"},e.exports=t},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,r=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function c(){c.init.call(this)}e.exports=c,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var l=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function d(e){return void 0===e._maxListeners?c.defaultMaxListeners:e._maxListeners}function h(e,t,n,i){var o,r,s,c;if(a(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(o=d(e))>0&&s.length>o&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,c=l,console&&console.warn&&console.warn(c)}return e}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=u.bind(i);return o.listener=n,i.wrapFn=o,o}function f(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):v(o,o.length)}function m(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return l},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");l=e}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},c.prototype.getMaxListeners=function(){return d(this)},c.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var c=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw c.context=s,c}var l=o[e];if(void 0===l)return!1;if("function"==typeof l)r(l,this,t);else{var a=l.length,d=v(l,a);for(n=0;n<a;++n)r(d[n],this,t)}return!0},c.prototype.addListener=function(e,t){return h(this,e,t,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(e,t){return h(this,e,t,!0)},c.prototype.once=function(e,t){return a(t),this.on(e,p(this,e,t)),this},c.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,p(this,e,t)),this},c.prototype.removeListener=function(e,t){var n,i,o,r,s;if(a(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},c.prototype.listeners=function(e){return f(this,e,!0)},c.prototype.rawListeners=function(e){return f(this,e,!1)},c.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},c.prototype.listenerCount=m,c.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){(t=n(3)(!1)).push([e.i,"._1MLRU1Xc_z92TUWOWE0MK6 {\n  position: fixed;\n  width: 100px;\n  bottom: 0px;\n  padding: 5px;\n  left: 0px;\n}\n",""]),t.locals={size_button:"_1MLRU1Xc_z92TUWOWE0MK6"},e.exports=t},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,o=n;return[o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]]].join("")}},function(e,t,n){"use strict";n.r(t);var i={apa:"ok"};var o=class{constructor(e){var t=document.createRange();console.log(e),t.selectNode(document.getElementById("context"));var n=t.createContextualFragment(e);console.log(n),this.element=n.childNodes[0],this.child_views=[]}didAttach(e){}render(){return this.element}attach(e){this.child_views.push(e),this.element.appendChild(e.render()),e.didAttach(this)}},r=n(0),s=n.n(r);var c=new(n(6));var l=class extends o{constructor(e,t){switch(super("<div></div>"),this.type=t,this.parent=e,this.onClick=this.onClick.bind(this),this.id=e.id,t){case"box-input":this.element.classList.add(s.a.boxInput);break;case"box-output":this.element.classList.add(s.a.boxOutput)}this.element.setAttribute("id",e.id+t),this.connections=[],this.element.onclick=this.onClick}onClick(e){"box-output"==this.type?c.emit("outputClicked",this.id):"box-input"==this.type&&c.emit("inputClicked",this.id)}};var a=class extends o{constructor(e){super("<div></div>"),this.onClick=this.onClick.bind(this),this.elementDrag=this.elementDrag.bind(this),this.mouseDown=this.mouseDown.bind(this),this.setPosY=this.setPosY.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.posX=100,this.posY=100,this.height=100,this.oldPosY=this.posY,this.oldPosX=this.posX,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,this.id=e,this.functionDescription="No function yet",this.input=new l(this,"box-input"),this.output=new l(this,"box-output"),this.eventEmitter=c,this.element.classList.add(s.a.flowchart_square),this.element.id=e}didAttach(e){this.attach(this.input),this.attach(this.output),this.element.onclick=this.onClick,this.element.onmousedown=this.mouseDown,this.onScrolledCallbacks=[]}copyOther(e,t=e.posX,n=e.posY){this.posX=t+event.view.scrollX-50,this.posY=n+event.view.scrollY-50,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this.height=e.height,this.functionDescription=e.functionDescription,this.input=e.input,this.output=e.output}render(){return this.element.setAttribute("style",`position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`),this.element}print(){console.log(i.apa)}elementDrag(e){(e=e||window.event).preventDefault();let t=e.clientX-this.offsetX,n=e.clientY-this.offsetY;t=t<0?0:t,n=n<0?0:n;const i=window.innerHeight-this.height,o=i+window.scrollY;n=n-window.scrollY>=i?o:n,this.element.style.top=`${this.posY}px`,this.element.style.left=`${t}px`,this.posX=t,this.posY=n}closeDragElement(e){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}setPosY(e){this.posY=e}onScrolled(e){this.onScrolledCallbacks.push(e)}mouseDown(e){(e=e||window.event).preventDefault(),this.lastScrollPosition=window.scrollY,this.offsetX=e.clientX-this.posX,this.offsetY=e.clientY-this.posY,document.addEventListener("mouseup",e=>{this.closeDragElement(e)}),document.onmousemove=e=>{this.elementDrag(e)};let t=document.getElementById(this.id).style.cssText;document.getElementById(this.id).setAttribute("style",t+" box-shadow: 0px 0px 40px 20px #0ff;")}onClick(e){c.emit("clicked",this.id,e)}},d=n(1),h=n.n(d);var u=class extends o{constructor(e){super(e)}didAttach(e){super.didAttach(e),this.element.onclick=this.onClick}onClick(e){}};var p=class extends u{constructor(){super('<div>\n  <button type="button" name="button">APA</button>\n</div>\n'),console.log("Element",this.element),console.log(h.a),this.render=this.render.bind(this),this.name="JI",this.onClick=this.onClick.bind(this)}didAttach(e){super.didAttach(e)}render(){return this.child_views.forEach(e=>e.render()),this.element.classList.add(h.a.size_button),this.element}onClick(e){c.emit("increase_size")}};var f=class extends o{constructor(){super('<div id="modal" class="modal">\n    <div class="modal-header"></div>\n    <div class="modal-content"></div>\n    <div class="modal-footer"></div>\n</div>'),this.render=this.render.bind(this)}show(e){this.modal=document.getElementById("modal"),this.modal.style.display="block";let t=modal.childNodes;!function(e,t,n,i){e.textContent="ID: "+i.id.toString(),function(e,t){e.innerHTML=`<div>\n                                  Input: ${t.input} </br>\n                                  Output: ${t.output} </br>\n                                  Description: ${t.functionDescription}\n                               </div>`}(t,i),n.textContent="Close"}(t[1],t[3],t[5],e)}close(){this.element.style.display="none"}render(){return this.child_views.forEach(e=>e.render()),this.element}};var m=class extends o{constructor(){super("<div></div>"),this.render=this.render.bind(this)}updateConnections(e,t){let n=function(e,t,n,i){let o=e-n,r=t-i,s=Math.abs(o),c=Math.abs(r),l=Math.sqrt(Math.pow(s,2)+Math.pow(c,2)),a=180*Math.atan2(c,s)/Math.PI,d=e;o>0?(d=e-s/2,a=180-a):o<0&&(d=e+s/2);let h=t;return r>0?(h=t-c/2,a=180-a):r<0&&(h=t+c/2),d-=l/2,[l,d,h,a]}(e.posX+50,e.posY+115,t.posX+50,t.posY-15);this.element.setAttribute("style",`width:${n[0]}px; left:${n[1]}px; top:${n[2]}px; transform:rotate(${n[3]}deg);`)}};const v=n(4);var g=class extends o{constructor(){super('<div id="workspace-root" tabindex="0">\n\n        <h1> Flowchart goes here </h1>\n        <div id="element-picker"> </div>\n\n        <div id="newObject">\n          <img src="../assets/addbutton.png"/>\n        </div>\n\n</div>'),this.onClick=this.onClick.bind(this),this.onKeyPress=this.onKeyPress.bind(this),this.height=3e3,this.childScrolled=this.childScrolled.bind(this),this.modal=new f,this.objects=[],this.markedObject=null,this.markedOutput="",this.objectClick={},this.copyObject={},this.mouseX=0,this.mouseY=0,c.on("clicked",(e,t)=>{this.objectClick=t;let n=this.objects.find(t=>t.id==e);n==this.markedObject?(n.closeDragElement(),this.modal.show(n),window.onclick=function(e){e.target==this.modal.element&&this.modal.close()}.bind(this)):(null!=this.markedObject&&this.removeMarked(),this.markedObject=n)}),c.on("outputClicked",e=>{this.markedOutput=e,console.log("KLICKAD")}),c.on("inputClicked",e=>{if(e!=this.markedOutput&&""!=this.markedOutput){let t=this.objects.find(t=>t.id==e),n=this.objects.find(e=>e.id==this.markedOutput);console.log("prev node: "+n.id),console.log("curr node: "+t.id),t.input.connections.push(this.markedOutput),n.output.connections.push(t.id),this.markedOutput="";let i=new m;i.element.classList.add("connector"),console.log("new connector",i),this.attach(i),i.updateConnections(n,t)}})}didAttach(e){const t=new p;this.attach(t),this.attach(this.modal),c.on("increase_size",()=>{this.increaseSize()}),this.element.onkeydown=this.onKeyPress,this.element.onclick=this.onClick}onClick(e){e.clientX==this.objectClick.clientX&&e.clientY==this.objectClick.clientY||null==this.markedObject||this.removeMarked()}removeMarked(){let e=document.getElementById(this.markedObject.id).style.cssText;e=e.split(" box-shadow")[0],document.getElementById(this.markedObject.id).style.cssText=e,this.markedObject=null}onKeyPress(e){if(console.log("I ONKEYPRESS"),e.ctrlKey)if(67==e.keyCode)null!=this.markedObject&&(document.addEventListener("mousemove",e=>{this.mouseX=e.clientX,this.mouseY=e.clientY}),this.copyObject=new a(v()),this.copyObject.copyOther(this.markedObject,this.mouseX,this.mouseY));else if(86==e.which&&null!=this.copyObject){let e=new a(v());e.copyOther(this.copyObject,this.mouseX,this.mouseY),this.objects.push(e),this.addBox(e)}}render(){return this.child_views.forEach(e=>e.render()),this.setHeight(this.height),this.element}increaseSize(){console.log("INCREASING SIZE"),this.setHeight(this.height+200)}setHeight(e){this.height=e,this.element.style.height=`${e}px`}addBox(e){console.log("I add box",this,e),this.objects.push(e),this.attach(e),e.onScrolled(this.childScrolled)}childScrolled(e,t){e+t>=this.height&&this.increaseSize()}};var b=class{constructor(e){this.root=document.querySelector("#container-root");const t=e.render();this.root.appendChild(t),e.didAttach(this)}};const x=n(4);!function(){const e=new g;new b(e),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const t=new a(x());e.addBox(t),t.print()}))}()}]);