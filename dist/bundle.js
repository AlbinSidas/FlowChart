!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}([function(e,t,n){var i=n(1),o=n(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});e.exports=r},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},s=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),r=[];function c(e){for(var t=-1,n=0;n<r.length;n++)if(r[n].identifier===e){t=n;break}return t}function a(e,t){for(var n={},i=[],o=0;o<e.length;o++){var s=e[o],a=t.base?s[0]+t.base:s[0],h=n[a]||0,l="".concat(a," ").concat(h);n[a]=h+1;var d=c(l),u={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(r[d].references++,r[d].updater(u)):r.push({identifier:l,updater:v(u,t),references:1}),i.push(l)}return i}function h(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var r=s(e.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}return t}var l,d=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function u(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=d(t,o);else{var s=document.createTextNode(o),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(s,r[t]):e.appendChild(s)}}function p(e,t,n){var i=n.css,o=n.media,s=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),s&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var f=null,m=0;function v(e,t){var n,i,o;if(t.singleton){var s=m++;n=f||(f=h(t)),i=u.bind(null,n,s,!1),o=u.bind(null,n,s,!0)}else n=h(t),i=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=c(n[i]);r[o].references--}for(var s=a(e,t),h=0;h<n.length;h++){var l=c(n[h]);0===r[l].references&&(r[l].updater(),r.splice(l,1))}n=s}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(r=i,c=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(a," */")),s=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(s).concat([o]).join("\n")}var r,c,a;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var s=0;s<this.length;s++){var r=this[s][0];null!=r&&(o[r]=!0)}for(var c=0;c<e.length;c++){var a=[].concat(e[c]);i&&o[a[0]]||(n&&(a[2]?a[2]="".concat(n," and ").concat(a[2]):a[2]=n),t.push(a))}},t}},function(e,t,n){var i,o,s=n(10),r=n(11),c=0,a=0;e.exports=function(e,t,n){var h=t&&n||0,l=t||[],d=(e=e||{}).node||i,u=void 0!==e.clockseq?e.clockseq:o;if(null==d||null==u){var p=s();null==d&&(d=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==u&&(u=o=16383&(p[6]<<8|p[7]))}var f=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:a+1,v=f-c+(m-a)/1e4;if(v<0&&void 0===e.clockseq&&(u=u+1&16383),(v<0||f>c)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=f,a=m,o=u;var b=(1e4*(268435455&(f+=122192928e5))+m)%4294967296;l[h++]=b>>>24&255,l[h++]=b>>>16&255,l[h++]=b>>>8&255,l[h++]=255&b;var g=f/4294967296*1e4&268435455;l[h++]=g>>>8&255,l[h++]=255&g,l[h++]=g>>>24&15|16,l[h++]=g>>>16&255,l[h++]=u>>>8|128,l[h++]=255&u;for(var y=0;y<6;++y)l[h+y]=d[y];return t||r(l)}},function(e,t,n){var i=n(1),o=n(9);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});e.exports=r},function(e,t){e.exports='<div id="modal" class="modal">\n    <div class="modal-header"></div>\n    <div class="modal-content"></div>\n    <div class="modal-footer"></div>\n</div>'},function(e,t,n){e.exports='<div id="workspace-root" tabindex="0">\n        <div id="element-picker"> </div>\n\n        <div id="newObject">\n          <img src="'+n(12).default+'" />\n          \x3c!-- <img src="../assets/addbutton.png"/> --\x3e\n        </div>\n\n</div>'},function(e,t,n){(t=n(2)(!1)).push([e.i,"body{\n    margin:0;\n    padding:0;\n    border:0;\n}\n\n#container-root {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    flex-direction: row;\n    padding: 0px;\n}\n\n.menu {\n    text-align: center;\n    flex-grow: 1;\n    /*background-color: blue;*/\n    max-width: 20%;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    border-right: solid;\n    border-color: black;\n}\n\n.filemenu {\n    margin-top: 20vh;\n    /*background-color: mediumturquoise;*/\n}\n\n#workspace-root {\n    flex-grow: 8;\n    position: relative;\n    background-color: mediumseagreen;\n    height: 1500px;\n    padding: 0;\n    margin: 0;\n}\n\n#newObject {\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    position: fixed;\n    right: 3%;\n    bottom: 3%;\n    background-color: orangered;\n}\n\n#newObject img {\n    width: 100%;\n}\n\n#element-picker {\n    background-color: orange;\n    visibility: hidden;\n    position: fixed;\n    right: 6%;\n    bottom: 6%;\n    height: 15vh;\n    width: 15vw;\n}\n\n/*Input circle*/\n._1ot9Raw2QDKYRqMuW2src0 {\n    border-radius: 27.5px 27.5px 0px 0px;\n    height: 25px;\n    width: 50px;\n    margin-top: -25px;\n    margin-left: 25px;\n    background-color: green;\n    cursor: pointer;\n}\n   \n   \n.connector-line {\n    stroke-width: 10;\n    stroke: black;\n    fill: yellowgreen;\n    /*stroke:rgb(255,255,0);*/\n}\n\n.connector {\n    z-index: 1;\n    /* background: transparent; */\n    background-color: blue;\n    pointer-events: none;\n    position: absolute;\n    padding:0px; \n    margin:0px;\n    height:10px;\n    line-height:1px; \n}\n\n/*Output circle*/\n._1Oj6BKLbzii0AcmH0pIYe- {\n    border-radius: 0px 0px 27.5px 27.5px;\n    height: 25px;\n    width: 50px;\n    margin-top: 100px;\n    margin-left: 25px;\n    background-color: red;\n    cursor: pointer;\n}\n\n.IlIxhmMyTdSCZV1cxWXFv {\n    z-index: 10;\n    width: 100px;\n    height: 100px;\n    cursor: move;\n    position: absolute;\n    background-color: cornflowerblue;\n}\n\n/* The Modal (background) */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Header */\n.modal-header {\n  margin: 15% auto 0;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Footer */\n.modal-footer {\n  margin: 0 auto;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Content/Box */\n.modal-content {\n  margin: 0 auto;\n  background-color: #fefefe;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 77%; \n}\n",""]),t.locals={boxInput:"_1ot9Raw2QDKYRqMuW2src0",boxOutput:"_1Oj6BKLbzii0AcmH0pIYe-",flowchart_square:"IlIxhmMyTdSCZV1cxWXFv"},e.exports=t},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,s=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function c(){c.init.call(this)}e.exports=c,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var a=10;function h(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?c.defaultMaxListeners:e._maxListeners}function d(e,t,n,i){var o,s,r,c;if(h(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),r=s[t]),void 0===r)r=s[t]=n,++e._eventsCount;else if("function"==typeof r?r=s[t]=i?[n,r]:[r,n]:i?r.unshift(n):r.push(n),(o=l(e))>0&&r.length>o&&!r.warned){r.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=r.length,c=a,console&&console.warn&&console.warn(c)}return e}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=u.bind(i);return o.listener=n,i.wrapFn=o,o}function f(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):v(o,o.length)}function m(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},c.prototype.getMaxListeners=function(){return l(this)},c.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var r;if(t.length>0&&(r=t[0]),r instanceof Error)throw r;var c=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw c.context=r,c}var a=o[e];if(void 0===a)return!1;if("function"==typeof a)s(a,this,t);else{var h=a.length,l=v(a,h);for(n=0;n<h;++n)s(l[n],this,t)}return!0},c.prototype.addListener=function(e,t){return d(this,e,t,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(e,t){return d(this,e,t,!0)},c.prototype.once=function(e,t){return h(t),this.on(e,p(this,e,t)),this},c.prototype.prependOnceListener=function(e,t){return h(t),this.prependListener(e,p(this,e,t)),this},c.prototype.removeListener=function(e,t){var n,i,o,s,r;if(h(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){r=n[s].listener,o=s;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,r||t)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(o=s[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},c.prototype.listeners=function(e){return f(this,e,!0)},c.prototype.rawListeners=function(e){return f(this,e,!1)},c.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},c.prototype.listenerCount=m,c.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){(t=n(2)(!1)).push([e.i,"._1MLRU1Xc_z92TUWOWE0MK6 {\n  position: fixed;\n  width: 100px;\n  bottom: 0px;\n  padding: 5px;\n  left: 0px;\n}\n",""]),t.locals={size_button:"_1MLRU1Xc_z92TUWOWE0MK6"},e.exports=t},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,o=n;return[o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]]].join("")}},function(e,t,n){"use strict";n.r(t),t.default=n.p+"6347a2a34a2ab5fe252dcd21ded9ef42.png"},function(e,t,n){"use strict";n.r(t);var i={apa:"ok"};var o=class{constructor(e){var t=document.createRange();console.log(e),t.selectNode(document.getElementById("context"));var n=t.createContextualFragment(e);this.element=n.childNodes[0],this.child_views=[]}didAttach(e){}render(){return this.element}attach(e){this.child_views.push(e),this.element.appendChild(e.render()),e.didAttach(this)}addChildView(e){this.child_views.push(e),this.element.appendChild(e.render())}addStyle(e){this.element.classList.append(e)}getPosY(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("top"))}getPosYFromBottom(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("bottom"))}getPosX(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("left"))}getWidth(){return this.element.offsetWidth}getHeight(){return console.log("LALALAL",this.element.offsetHeight),this.element.offsetHeight}},s=n(0),r=n.n(s);var c=new(n(8));var a=class extends o{constructor(e,t){switch(super("<div></div>"),this.type=t,this.parent=e,this.onClick=this.onClick.bind(this),this.id=e.id,this._value="",t){case"box-input":this.element.classList.add(r.a.boxInput);break;case"box-output":this.element.classList.add(r.a.boxOutput)}this.element.setAttribute("id",e.id+t),this.connections=[],this.element.onclick=this.onClick}setValue(e){this._value=e}getValue(){return this._value}onClick(e){"box-output"==this.type?c.emit("outputClicked",this.id):"box-input"==this.type&&c.emit("inputClicked",this.id)}};var h=class extends o{constructor(e){super("<div></div>"),this.onClick=this.onClick.bind(this),this.elementDrag=this.elementDrag.bind(this),this.mouseDown=this.mouseDown.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.posX=100,this.posY=100,this.height=100,this.oldPosY=this.posY,this.oldPosX=this.posX,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,this._connectorUpdaters=[],this.id=e,this.functionDescription="No function yet",this.input=new a(this,"box-input"),this.output=new a(this,"box-output"),this.element.classList.add(r.a.flowchart_square),this.element.id=e}didAttach(e){this.attach(this.input),this.attach(this.output),this.element.onclick=this.onClick,this.element.onmousedown=this.mouseDown,this.onScrolledCallbacks=[]}copyOther(e,t=e.posX,n=e.posY){this.posX=t+event.view.scrollX-50,this.posY=n+event.view.scrollY-50,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this.height=e.height,this.functionDescription=e.functionDescription}registerConnectorUpdater(e,t){this._connectorUpdaters.push(t)}unregisterConnectorUpdater(e){}render(){return this.element.setAttribute("style",`position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`),this.element}print(){console.log(i.apa)}elementDrag(e){(e=e||window.event).preventDefault();let t=e.clientX-this.offsetX,n=e.clientY-this.offsetY;t=t<0?0:t,n=n<0?0:n;const i=window.innerHeight-this.height,o=i+window.scrollY;n=n-window.scrollY>=i?o:n,this.element.style.top=`${this.posY}px`,this.element.style.left=`${t}px`,this.posX=t,this.posY=n,this._connectorUpdaters.forEach(e=>{e()})}closeDragElement(e){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}onScrolled(e){this.onScrolledCallbacks.push(e)}mouseDown(e){(e=e||window.event).preventDefault(),this.lastScrollPosition=window.scrollY,this.offsetX=e.clientX-this.posX,this.offsetY=e.clientY-this.posY,document.addEventListener("mouseup",e=>{this.closeDragElement(e)}),document.onmousemove=e=>{this.elementDrag(e)};let t=document.getElementById(this.id).style.cssText;document.getElementById(this.id).setAttribute("style",t+" box-shadow: 0px 0px 40px 20px #0ff;")}onClick(e){c.emit("clicked",this.id,e)}},l=n(4),d=n.n(l);var u=class extends o{constructor(e){super(e)}didAttach(e){super.didAttach(e),this.element.onclick=this.onClick}onClick(e){}};class p extends u{constructor(){super('<button type="button" name="button">Increase</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){c.emit("increase_size")}}class f extends u{constructor(){super('<button type="button" name="decrease_button">Decrease</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){c.emit("decrease_size")}}class m extends u{constructor(){super('<button type="button" name="button_horizontal">Increase Width</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){c.emit("increase_size_horizontal")}}class v extends u{constructor(){super('<button type="button" name="decrease_button_horizontal">Decrease Width</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){c.emit("decrease_size_horizonal")}}var b=class extends o{constructor(){super("<div></div>")}didAttach(e){super.didAttach(e),this.increase_size_btn=new p,this.attach(this.increase_size_btn),this.decrease_size_btn=new f,this.attach(this.decrease_size_btn),this.increase_horizontal_size_btn=new m,this.attach(this.increase_horizontal_size_btn),this.decrease_horizontal_size_btn=new v,this.attach(this.decrease_horizontal_size_btn)}render(){return this.child_views.forEach(e=>e.render()),this.element.classList.add(d.a.size_button),this.element}},g=n(5),y=n.n(g);var w=class extends o{constructor(){super(y.a),this.obj={},this.render=this.render.bind(this)}show(e){this.obj=e,this.element.style.display="block";let t=this.element.childNodes,n=t[1],i=t[3],o=t[5];var s,r,c,a;s=n,r=i,c=o,a=this.obj,s.textContent="ID: "+a.id.toString(),function(e,t){e.innerHTML=`\n                            <div id="boxtime">                       \n                              Input: <input type="text" id="inputBox" value="${t.input.getValue()}"> </br>\n                              Output: <input type="text" id="outputBox" value="${t.output.getValue()}"> </br>\n                              Description: <input type="text" id="fundescBox" value="${t.functionDescription}">\n                            </div>`}(r,a),c.textContent="Close"}close(){this.obj.input.setValue(document.getElementById("inputBox").value),this.obj.output.setValue(document.getElementById("outputBox").value),this.obj.functionDescription=document.getElementById("fundescBox").value,this.element.style.display="none"}render(){return this.child_views.forEach(e=>e.render()),this.element}},x=n(6),k=n.n(x);var _=class extends o{constructor(e,t){super("<div></div>"),this.render=this.render.bind(this),this.currNode=t,this.prevNode=e,this.updateConnections=this.updateConnections.bind(this)}updateConnections(){let e=this.prevNode.posX+50,t=this.prevNode.posY+115,n=this.currNode.posX+50,i=this.currNode.posY-15,o=this._calculateLine(e,t,n,i);this.element.setAttribute("style",`width:${o[0]}px; left:${o[1]}px; top:${o[2]}px; transform:rotate(${o[3]}deg);`)}_calculateLine(e,t,n,i){let o=e-n,s=t-i,r=Math.abs(o),c=Math.abs(s),a=Math.sqrt(Math.pow(r,2)+Math.pow(c,2)),h=180*Math.atan2(c,r)/Math.PI,l=e;o>0?(l=e-r/2,h=180-h):o<0&&(l=e+r/2);let d=t;return s>0?(d=t-c/2,h=180-h):s<0&&(d=t+c/2),l-=a/2,[a,l,d,h]}render(){return this.element}};const C=n(3);var j=class extends o{constructor(){super(k.a),this.onClick=this.onClick.bind(this),this.onKeyPress=this.onKeyPress.bind(this),this.height=3e3,this.width=window.innerWidth,this.childScrolled=this.childScrolled.bind(this),this.modal=new w,this.objects=[],this.markedObject=null,this.markedOutput="",this.connectorList=[],this.objectClick={},this.copyObject={},this.mouseX=0,this.mouseY=0,this.sizeDelta=200,c.on("clicked",(e,t)=>{this.objectClick=t;let n=this.objects.find(t=>t.id==e);n==this.markedObject?(n.closeDragElement(),this.modal.show(n),window.onclick=function(e){e.target==this.modal.element&&this.modal.close()}.bind(this)):1==n.moving||(null!=this.markedObject&&this.removeMarked(),this.markedObject=n)}),c.on("outputClicked",e=>{this.markedOutput=e}),c.on("inputClicked",e=>{if(e!=this.markedOutput&&""!=this.markedOutput){let t=this.objects.find(t=>t.id==e),n=this.objects.find(e=>e.id==this.markedOutput),i={};t.input.connections.includes(this.markedOutput)?i=this.connectorList.find(e=>e.id==t.id+n.id):(t.input.connections.push(this.markedOutput),n.output.connections.push(t.id),i=new _(n,t),n.registerConnectorUpdater("",i.updateConnections),t.registerConnectorUpdater("",i.updateConnections),i.id=t.id+n.id,i.element.classList.add("connector"),this.attach(i),this.connectorList.push(i)),this.markedOutput="",i.updateConnections()}})}didAttach(e){const t=new b;this.attach(t),this.attach(this.modal),c.on("increase_size",()=>{this.increaseSize()}),c.on("decrease_size",()=>{this.decreaseSize()}),c.on("increase_size_horizontal",()=>{this.increaseSizeHorizontal()}),c.on("decrease_size_horizonal",()=>{this.decreaseSizeHorizontal()}),this.element.onkeydown=this.onKeyPress,this.element.onclick=this.onClick}onClick(e){e.clientX==this.objectClick.clientX&&e.clientY==this.objectClick.clientY||null==this.markedObject||this.removeMarked()}removeMarked(){let e=document.getElementById(this.markedObject.id).style.cssText;e=e.split(" box-shadow")[0],document.getElementById(this.markedObject.id).style.cssText=e,this.markedObject=null}onKeyPress(e){if(e.ctrlKey)if(67==e.keyCode)null!=this.markedObject&&(document.addEventListener("mousemove",e=>{this.mouseX=e.clientX,this.mouseY=e.clientY}),this.copyObject=new h(C()),this.copyObject.copyOther(this.markedObject,this.mouseX,this.mouseY));else if(86==e.which&&null!=this.copyObject){let e=new h(C());e.copyOther(this.copyObject,this.mouseX,this.mouseY),this.objects.push(e),this.addBox(e)}}render(){return this.child_views.forEach(e=>e.render()),this.setHeight(this.height),this.setWidth(this.width),this.element}increaseSize(){this.setHeight(this.height+this.sizeDelta)}decreaseSize(){if(window.innerHeight<this.height-this.sizeDelta){for(let e=0;e<this.objects.length;e++){const t=this.objects[e];if(t.getPosY()+t.getHeight()>this.height-this.sizeDelta)return}this.setHeight(this.height-this.sizeDelta)}}increaseSizeHorizontal(){this.setWidth(this.width+this.sizeDelta)}decreaseSizeHorizontal(){if(window.innerWidth<this.width-this.sizeDelta){for(let e=0;e<this.objects.length;e++){const t=this.objects[e];if(t.getPosX()+t.getWidth()>this.width-this.sizeDelta)return}this.setWidth(this.width-this.sizeDelta)}}setHeight(e){this.height=e,this.element.style.height=`${e}px`}setWidth(e){this.width=e,this.element.style.width=`${e}px`}addBox(e){this.objects.push(e),this.attach(e),e.onScrolled(this.childScrolled)}childScrolled(e,t){e+t>=this.height&&this.increaseSize()}};var O=class{constructor(e){this.root=document.querySelector("#container-root");const t=e.render();this.root.appendChild(t),e.didAttach(this)}};const L=n(3);!function(){const e=new j;new O(e),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const t=new h(L());e.addBox(t),t.print()}))}()}]);