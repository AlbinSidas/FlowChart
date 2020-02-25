!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=15)}([function(t,e,n){var i=n(3),o=n(9);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});t.exports=r},function(t,e,n){var i,o,s=n(12),r=n(13),c=0,a=0;t.exports=function(t,e,n){var l=e&&n||0,h=e||[],d=(t=t||{}).node||i,u=void 0!==t.clockseq?t.clockseq:o;if(null==d||null==u){var p=s();null==d&&(d=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==u&&(u=o=16383&(p[6]<<8|p[7]))}var f=void 0!==t.msecs?t.msecs:(new Date).getTime(),m=void 0!==t.nsecs?t.nsecs:a+1,v=f-c+(m-a)/1e4;if(v<0&&void 0===t.clockseq&&(u=u+1&16383),(v<0||f>c)&&void 0===t.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=f,a=m,o=u;var b=(1e4*(268435455&(f+=122192928e5))+m)%4294967296;h[l++]=b>>>24&255,h[l++]=b>>>16&255,h[l++]=b>>>8&255,h[l++]=255&b;var g=f/4294967296*1e4&268435455;h[l++]=g>>>8&255,h[l++]=255&g,h[l++]=g>>>24&15|16,h[l++]=g>>>16&255,h[l++]=u>>>8|128,h[l++]=255&u;for(var y=0;y<6;++y)h[l+y]=d[y];return e||r(h)}},function(t,e,n){var i=n(3),o=n(11);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var s={insert:"head",singleton:!1},r=(i(o,s),o.locals?o.locals:{});t.exports=r},function(t,e,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},s=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),r=[];function c(t){for(var e=-1,n=0;n<r.length;n++)if(r[n].identifier===t){e=n;break}return e}function a(t,e){for(var n={},i=[],o=0;o<t.length;o++){var s=t[o],a=e.base?s[0]+e.base:s[0],l=n[a]||0,h="".concat(a," ").concat(l);n[a]=l+1;var d=c(h),u={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(r[d].references++,r[d].updater(u)):r.push({identifier:h,updater:v(u,e),references:1}),i.push(h)}return i}function l(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var r=s(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var h,d=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function u(t,e,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=d(e,o);else{var s=document.createTextNode(o),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(s,r[e]):t.appendChild(s)}}function p(t,e,n){var i=n.css,o=n.media,s=n.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),s&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var f=null,m=0;function v(t,e){var n,i,o;if(e.singleton){var s=m++;n=f||(f=l(e)),i=u.bind(null,n,s,!1),o=u.bind(null,n,s,!0)}else n=l(e),i=p.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var n=a(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<n.length;i++){var o=c(n[i]);r[o].references--}for(var s=a(t,e),l=0;l<n.length;l++){var h=c(n[l]);0===r[h].references&&(r[h].updater(),r.splice(h,1))}n=s}}}},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(r=i,c=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(a," */")),s=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[n].concat(s).concat([o]).join("\n")}var r,c,a;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,i){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(i)for(var s=0;s<this.length;s++){var r=this[s][0];null!=r&&(o[r]=!0)}for(var c=0;c<t.length;c++){var a=[].concat(t[c]);i&&o[a[0]]||(n&&(a[2]?a[2]="".concat(n," and ").concat(a[2]):a[2]=n),e.push(a))}},e}},function(t,e){t.exports='<div>\n    <button type="button" name="button">Save</button>\n  </div>\n  \n'},function(t,e){t.exports='<div>\n    <button type="button" name="button">Load</button>\n  </div>\n  \n'},function(t,e){t.exports='<div id="modal" class="modal">\n    <div class="modal-header"></div>\n    <div class="modal-content"></div>\n    <div class="modal-footer"></div>\n</div>'},function(t,e,n){t.exports='<div id="workspace-root" tabindex="0">\n        \n        <div id="element-picker"> </div>\n\n        <div id="newObject">\n          <img src="'+n(14).default+'" />\n          \x3c!-- <img src="../assets/addbutton.png"/> --\x3e\n        </div>\n\n</div>'},function(t,e,n){(e=n(4)(!1)).push([t.i,"body{\n    margin:0;\n    padding:0;\n    border:0;\n}\n\n#container-root {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    flex-direction: row;\n    padding: 0px;\n}\n\n.menu {\n    text-align: center;\n    flex-grow: 1;\n    /*background-color: blue;*/\n    max-width: 20%;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    border-right: solid;\n    border-color: black;\n}\n\n.filemenu {\n    margin-top: 20vh;\n    /*background-color: mediumturquoise;*/\n}\n\n#workspace-root {\n    flex-grow: 8;\n    position: relative;\n    background-color: mediumseagreen;\n    height: 1500px;\n    padding: 0;\n    margin: 0;\n}\n\n#newObject {\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    position: fixed;\n    right: 3%;\n    bottom: 3%;\n    background-color: orangered;\n}\n\n#newObject img {\n    width: 100%;\n}\n\n#element-picker {\n    background-color: orange;\n    visibility: hidden;\n    position: fixed;\n    right: 6%;\n    bottom: 6%;\n    height: 15vh;\n    width: 15vw;\n}\n\n._3LwtxabBonJSYSE6LuKV_l{\n    background-color: purple;\n    height: 3vh;\n    width: 3vw;\n    position: absolute;\n    border-radius: 10%;\n    color: white;\n    padding: 10px;\n    text-align: center;\n    font-size: 2vh;\n    z-index: 5;\n}\n\n._2Y0Zg4F9Vt5eWnXlqczSkU {\n    border-radius: 0px 0px 27.5px 27.5px;\n    width: 50px;\n    height: 25px;\n    margin-top: 34px;\n    margin-left: 11px;\n    background-color: black;\n    cursor: pointer;\n}\n\n.hoNx1jZXFuZE9Qfc8Q8s_ {\n    visibility: hidden;\n    width: 0px;\n    height: 0px;\n    z-index: -3;\n}\n\n\nboxStartDummy\n\n._1ot9Raw2QDKYRqMuW2src0 {\n    border-radius: 27.5px 27.5px 0px 0px;\n    height: 25px;\n    width: 50px;\n    margin-top: -25px;\n    margin-left: 25px;\n    background-color: green;\n    cursor: pointer;\n}\n   \n   \n.connector-line {\n    stroke-width: 10;\n    stroke: black;\n    fill: yellowgreen;\n    /*stroke:rgb(255,255,0);*/\n}\n\n.connector {\n    z-index: 1;\n    /* background: transparent; */\n    background-color: blue;\n    pointer-events: none;\n    position: absolute;\n    padding:0px; \n    margin:0px;\n    height:10px;\n    line-height:1px; \n}\n\n/*Output circle*/\n._1Oj6BKLbzii0AcmH0pIYe- {\n    border-radius: 0px 0px 27.5px 27.5px;\n    height: 25px;\n    width: 50px;\n    margin-top: 100px;\n    margin-left: 25px;\n    background-color: red;\n    cursor: pointer;\n}\n\n.IlIxhmMyTdSCZV1cxWXFv {\n    z-index: 10;\n    width: 100px;\n    height: 100px;\n    cursor: move;\n    position: absolute;\n    background-color: cornflowerblue;\n}\n\n/* The Modal (background) */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 15; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Header */\n.modal-header {\n  margin: 15% auto 0;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Footer */\n.modal-footer {\n  margin: 0 auto;\n  width: 80%;\n  background-color: #BEBEBE;\n}\n\n/* Modal Content/Box */\n.modal-content {\n  margin: 0 auto;\n  background-color: #fefefe;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 77%; \n}\n",""]),e.locals={startnode:"_3LwtxabBonJSYSE6LuKV_l",boxStart:"_2Y0Zg4F9Vt5eWnXlqczSkU",boxStartDummy:"hoNx1jZXFuZE9Qfc8Q8s_",boxInput:"_1ot9Raw2QDKYRqMuW2src0",boxOutput:"_1Oj6BKLbzii0AcmH0pIYe-",flowchart_square:"IlIxhmMyTdSCZV1cxWXFv"},t.exports=e},function(t,e,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,s=o&&"function"==typeof o.apply?o.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var r=Number.isNaN||function(t){return t!=t};function c(){c.init.call(this)}t.exports=c,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var a=10;function l(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function h(t){return void 0===t._maxListeners?c.defaultMaxListeners:t._maxListeners}function d(t,e,n,i){var o,s,r,c;if(l(n),void 0===(s=t._events)?(s=t._events=Object.create(null),t._eventsCount=0):(void 0!==s.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),s=t._events),r=s[e]),void 0===r)r=s[e]=n,++t._eventsCount;else if("function"==typeof r?r=s[e]=i?[n,r]:[r,n]:i?r.unshift(n):r.push(n),(o=h(t))>0&&r.length>o&&!r.warned){r.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=t,a.type=e,a.count=r.length,c=a,console&&console.warn&&console.warn(c)}return t}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(t,e,n){var i={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=u.bind(i);return o.listener=n,i.wrapFn=o,o}function f(t,e,n){var i=t._events;if(void 0===i)return[];var o=i[e];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):v(o,o.length)}function m(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(t,e){for(var n=new Array(e),i=0;i<e;++i)n[i]=t[i];return n}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(t){if("number"!=typeof t||t<0||r(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");a=t}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||r(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},c.prototype.getMaxListeners=function(){return h(this)},c.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var i="error"===t,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var r;if(e.length>0&&(r=e[0]),r instanceof Error)throw r;var c=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw c.context=r,c}var a=o[t];if(void 0===a)return!1;if("function"==typeof a)s(a,this,e);else{var l=a.length,h=v(a,l);for(n=0;n<l;++n)s(h[n],this,e)}return!0},c.prototype.addListener=function(t,e){return d(this,t,e,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(t,e){return d(this,t,e,!0)},c.prototype.once=function(t,e){return l(e),this.on(t,p(this,t,e)),this},c.prototype.prependOnceListener=function(t,e){return l(e),this.prependListener(t,p(this,t,e)),this},c.prototype.removeListener=function(t,e){var n,i,o,s,r;if(l(e),void 0===(i=this._events))return this;if(void 0===(n=i[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete i[t],i.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===e||n[s].listener===e){r=n[s].listener,o=s;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(i[t]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",t,r||e)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(t){var e,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(o=s[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(i=e.length-1;i>=0;i--)this.removeListener(t,e[i]);return this},c.prototype.listeners=function(t){return f(this,t,!0)},c.prototype.rawListeners=function(t){return f(this,t,!1)},c.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):m.call(t,e)},c.prototype.listenerCount=m,c.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(t,e,n){(e=n(4)(!1)).push([t.i,"._1MLRU1Xc_z92TUWOWE0MK6 {\n  position: fixed;\n  width: 100px;\n  bottom: 0px;\n  padding: 5px;\n  left: 0px;\n}\n",""]),e.locals={size_button:"_1MLRU1Xc_z92TUWOWE0MK6"},t.exports=e},function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);t.exports=function(){return n(i),i}}else{var o=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),o[e]=t>>>((3&e)<<3)&255;return o}}},function(t,e){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);t.exports=function(t,e){var i=e||0,o=n;return[o[t[i++]],o[t[i++]],o[t[i++]],o[t[i++]],"-",o[t[i++]],o[t[i++]],"-",o[t[i++]],o[t[i++]],"-",o[t[i++]],o[t[i++]],"-",o[t[i++]],o[t[i++]],o[t[i++]],o[t[i++]],o[t[i++]],o[t[i++]]].join("")}},function(t,e,n){"use strict";n.r(e),e.default=n.p+"6347a2a34a2ab5fe252dcd21ded9ef42.png"},function(t,e,n){"use strict";n.r(e);var i={apa:"ok"};var o=class{constructor(t){var e=document.createRange();e.selectNode(document.getElementById("context"));var n=e.createContextualFragment(t);this.element=n.childNodes[0],this.child_views=[]}didAttach(t){}render(){return this.element}attach(t){this.child_views.push(t),this.element.appendChild(t.render()),t.didAttach(this)}addChildView(t){this.child_views.push(t),this.element.appendChild(t.render())}addStyle(t){this.element.classList.append(t)}getPosY(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("top"))}getPosYFromBottom(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("bottom"))}getPosX(){return parseInt(window.getComputedStyle(this.element).getPropertyValue("left"))}getWidth(){return this.element.offsetWidth}getHeight(){return console.log("LALALAL",this.element.offsetHeight),this.element.offsetHeight}},s=n(0),r=n.n(s);var c=new(n(10));var a=class extends o{constructor(t,e){switch(super("<div></div>"),this.type=e,this.parent=t,this.onClick=this.onClick.bind(this),this.id=t.id,this._value="",e){case"box-input":this.element.classList.add(r.a.boxInput);break;case"box-output":this.element.classList.add(r.a.boxOutput);break;case"box-start":this.element.classList.add(r.a.boxStart);break;case"box-dummy":this.element.classList.add(r.a.boxStartDummy)}this.element.setAttribute("id",t.id+e),this.connections=[],this.element.onclick=this.onClick}setValue(t){this._value=t}getValue(){return this._value}onClick(t){if("box-output"==this.type)c.emit("outputClicked",this.id);else if("box-input"==this.type)c.emit("inputClicked",this.id);else if("box-start"==this.type)c.emit("outputClicked",this.id);else if("box-dummy"==this.type)return}};var l=class extends o{constructor(t){super("<div></div>"),this.onClick=this.onClick.bind(this),this.elementDrag=this.elementDrag.bind(this),this.mouseDown=this.mouseDown.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.posX=100,this.posY=100,this.height=100,this.oldPosY=this.posY,this.oldPosX=this.posX,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,this._connectorUpdaters=[],this.id=t,this.functionDescription="No function yet",this.input=new a(this,"box-input"),this.output=new a(this,"box-output"),this.element.classList.add(r.a.flowchart_square),this.element.id=t}didAttach(t){this.attach(this.input),this.attach(this.output),this.element.onclick=this.onClick,this.element.onmousedown=this.mouseDown,this.onScrolledCallbacks=[]}copyOther(t,e=t.posX,n=t.posY){this.posX=e+event.view.scrollX-50,this.posY=n+event.view.scrollY-50,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=t.offsetX,this.offsetY=t.offsetY,this.height=t.height,this.functionDescription=t.functionDescription}fillNode(t,e=t.posX,n=t.posY){this.posX=e,this.posY=n,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=t.offsetX,this.offsetY=t.offsetY,this.height=t.height,this.functionDescription=t.functionDescription}registerConnectorUpdater(t,e){this._connectorUpdaters.push(e)}unregisterConnectorUpdater(t){}render(){return this.element.setAttribute("style",`position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`),this.element}print(){console.log(i.apa)}elementDrag(t){(t=t||window.event).preventDefault();let e=t.clientX-this.offsetX,n=t.clientY-this.offsetY;e=e<0?0:e,n=n<0?0:n;const i=window.innerHeight-this.height,o=i+window.scrollY;n=n-window.scrollY>=i?o:n,this.element.style.top=`${this.posY}px`,this.element.style.left=`${e}px`,this.posX=e,this.posY=n,this._connectorUpdaters.forEach(t=>{t()})}closeDragElement(t){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}onScrolled(t){this.onScrolledCallbacks.push(t)}mouseDown(t){(t=t||window.event).preventDefault(),this.lastScrollPosition=window.scrollY,this.offsetX=t.clientX-this.posX,this.offsetY=t.clientY-this.posY,document.addEventListener("mouseup",t=>{this.closeDragElement(t)}),document.onmousemove=t=>{this.elementDrag(t)};let e=document.getElementById(this.id).style.cssText;document.getElementById(this.id).setAttribute("style",e+" box-shadow: 0px 0px 40px 20px #0ff;")}onClick(t){c.emit("clicked",this.id,t)}},h=n(2),d=n.n(h);var u=class extends o{constructor(t){super(t)}didAttach(t){super.didAttach(t),this.element.onclick=this.onClick}onClick(t){}};class p extends u{constructor(){super('<button type="button" name="button">Increase</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(t){c.emit("increase_size")}}class f extends u{constructor(){super('<button type="button" name="decrease_button">Decrease</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(t){c.emit("decrease_size")}}class m extends u{constructor(){super('<button type="button" name="button_horizontal">Increase Width</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(t){c.emit("increase_size_horizontal")}}class v extends u{constructor(){super('<button type="button" name="decrease_button_horizontal">Decrease Width</button>'),this.render=this.render.bind(this),this.onClick=this.onClick.bind(this)}onClick(t){c.emit("decrease_size_horizonal")}}var b=class extends o{constructor(){super("<div></div>")}didAttach(t){super.didAttach(t),this.increase_size_btn=new p,this.attach(this.increase_size_btn),this.decrease_size_btn=new f,this.attach(this.decrease_size_btn),this.increase_horizontal_size_btn=new m,this.attach(this.increase_horizontal_size_btn),this.decrease_horizontal_size_btn=new v,this.attach(this.decrease_horizontal_size_btn)}render(){return this.child_views.forEach(t=>t.render()),this.element.classList.add(d.a.size_button),this.element}},g=n(5),y=n.n(g);var x=class extends u{constructor(){super(y.a),this.render=this.render.bind(this),this.name="Save",this.onClick=this.onClick.bind(this)}didAttach(t){super.didAttach(t)}render(){return this.child_views.forEach(t=>t.render()),this.element}onClick(t){c.emit("save")}},w=n(6),k=n.n(w);var C=class extends u{constructor(){super(k.a),this.render=this.render.bind(this),this.name="Load",this.onClick=this.onClick.bind(this)}didAttach(t){super.didAttach(t)}render(){return this.child_views.forEach(t=>t.render()),this.element}onClick(t){c.emit("load")}},_=n(7),j=n.n(_);var L=class extends o{constructor(){super(j.a),this.obj={},this.render=this.render.bind(this)}show(t){this.obj=t,this.element.style.display="block";let e=this.element.childNodes,n=e[1],i=e[3],o=e[5];var s,r,c,a;s=n,r=i,c=o,a=this.obj,s.textContent="ID: "+a.id.toString(),function(t,e){t.innerHTML=`\n                            <div id="boxtime">                       \n                              Input: <input type="text" id="inputBox" value="${e.input.getValue()}"> </br>\n                              Output: <input type="text" id="outputBox" value="${e.output.getValue()}"> </br>\n                              Description: <input type="text" id="fundescBox" value="${e.functionDescription}">\n                            </div>`}(r,a),c.textContent="Close"}close(){this.obj.input.setValue(document.getElementById("inputBox").value),this.obj.output.setValue(document.getElementById("outputBox").value),this.obj.functionDescription=document.getElementById("fundescBox").value,this.element.style.display="none"}render(){return this.child_views.forEach(t=>t.render()),this.element}};n(1);var O=class{constructor(t,e,n,i,o,s){this.funDes=t,this.pX=e,this.pY=n,this.id=i,this.iCon=o,this.oCon=s}};n(1);var S=class{constructor(){this.obj=[]}saveFlow(t){let e=prompt("Please enter the name for your save file"),n=[],i=0;for(i=0;i<t.length;i++){let e=new O(t[i].functionDescription,t[i].posX,t[i].posY,t[i].id,t[i].input.connections,t[i].output.connections);n.push(e)}const o={data:n,filename:e};fetch("http://localhost:3000/save",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})}async loadFlow(t,e){const n=await fetch("http://localhost:3000/loadfilenames"),i=await n.json();let o=0,s="";for(o=0;o<i.length;o++)s+=i[o]+"\n";let r=prompt("skriv in namnet på filen du vill ladda\n"+s);const a=await fetch("http://localhost:3000/loadfile/"+r);let h=await a.json(),d=0;for(d=0;d<h.length;d++)if(null==document.getElementById(h[d].id)){let n=new l(h[d].id);n.fillNode(h[d],h[d].pX,h[d].pY),t.push(n),e.attach(n)}for(d=0;d<h.length;d++){let t=0;for(t=0;t<h[d].oCon.length;t++)c.emit("outputClicked",h[d].id),c.emit("inputClicked",h[d].oCon[t])}}},z=n(8),E=n.n(z);var Y=class extends o{constructor(t,e,n){super("<div></div>"),this.render=this.render.bind(this),this.id=t,this.element.id=t,this.currNode=n,this.prevNode=e,this.updateConnections=this.updateConnections.bind(this)}updateConnections(){let t=this.prevNode.posX+50,e=this.prevNode.posY+115,n=this.currNode.posX+50,i=this.currNode.posY-15,o=this._calculateLine(t,e,n,i);this.element.setAttribute("style",`width:${o[0]}px; left:${o[1]}px; top:${o[2]}px; transform:rotate(${o[3]}deg);`)}_calculateLine(t,e,n,i){let o=t-n,s=e-i,r=Math.abs(o),c=Math.abs(s),a=Math.sqrt(Math.pow(r,2)+Math.pow(c,2)),l=180*Math.atan2(c,r)/Math.PI,h=t;o>0?(h=t-r/2,l=180-l):o<0&&(h=t+r/2);let d=e;return s>0?(d=e-c/2,l=180-l):s<0&&(d=e+c/2),h-=a/2,[a,h,d,l]}render(){return this.element}};const X=n(1);var D=class extends o{constructor(){super(E.a),this.onClick=this.onClick.bind(this),this.onKeyPress=this.onKeyPress.bind(this),this.height=3e3,this.width=window.innerWidth,this.childScrolled=this.childScrolled.bind(this),this.modal=new L,this.saveClass=new S,this.objects=[],this.markedObject=null,this.markedOutput="",this.connectorList=[],this.objectClick={},this.copyObject={},this.mouseX=0,this.mouseY=0,this.sizeDelta=200,c.on("clicked",(t,e)=>{this.objectClick=e;let n=this.objects.find(e=>e.id==t);n==this.markedObject?(n.closeDragElement(),this.modal.show(n),window.onclick=function(t){t.target==this.modal.element&&this.modal.close()}.bind(this)):(null!=this.markedObject&&this.removeMarked(),this.markedObject=n)}),c.on("outputClicked",t=>{this.markedOutput=t}),c.on("inputClicked",t=>{if(t!=this.markedOutput&&""!=this.markedOutput){let e=this.objects.find(e=>e.id==t),n=this.objects.find(t=>t.id==this.markedOutput),i={};e.input.connections.includes(this.markedOutput)?i=this.connectorList.find(t=>t.id==e.id+n.id):(e.input.connections.push(this.markedOutput),n.output.connections.push(e.id),i=new Y(e.id+n.id,n,e),n.registerConnectorUpdater("",i.updateConnections),e.registerConnectorUpdater("",i.updateConnections),i.element.classList.add("connector"),this.attach(i),this.connectorList.push(i)),this.markedOutput="",i.updateConnections()}})}didAttach(t){const e=new b;this.attach(e);const n=new x;this.attach(n),c.on("save",()=>{this.saveClass.saveFlow(this.objects)});const i=new C;this.attach(i),c.on("load",()=>{this.saveClass.loadFlow(this.objects,this)}),this.attach(this.modal),c.on("increase_size",()=>{this.increaseSize()}),c.on("decrease_size",()=>{this.decreaseSize()}),c.on("increase_size_horizontal",()=>{this.increaseSizeHorizontal()}),c.on("decrease_size_horizonal",()=>{this.decreaseSizeHorizontal()}),this.element.onkeydown=this.onKeyPress,this.element.onclick=this.onClick}onClick(t){t.clientX==this.objectClick.clientX&&t.clientY==this.objectClick.clientY||null==this.markedObject||this.removeMarked()}removeMarked(){let t=document.getElementById(this.markedObject.id).style.cssText;t=t.split(" box-shadow")[0],document.getElementById(this.markedObject.id).style.cssText=t,this.markedObject=null}onKeyPress(t){if(t.ctrlKey)switch(t.keyCode){case 67:null!=this.markedObject&&(document.addEventListener("mousemove",t=>{this.mouseX=t.clientX,this.mouseY=t.clientY}),this.copyObject=new l(X()),this.copyObject.copyOther(this.markedObject,this.mouseX,this.mouseY));break;case 86:if(null!=this.copyObject){let t=new l(X());t.copyOther(this.copyObject,this.mouseX,this.mouseY),this.addBox(t)}break;case 68:if(t.preventDefault(),null!=this.markedObject){this.objects.splice(this.objects.indexOf(this.markedObject),1);for(let t=this.connectorList.length-1;t>=0;t--)if(this.connectorList[t].id.includes(this.markedObject.id)){let e=this.connectorList[t];this.connectorList.splice(t,1);let n=document.getElementById(e.id);n.parentElement.removeChild(n)}let t=document.getElementById(this.markedObject.id);t.parentElement.removeChild(t),this.markedObject=null}t.preventDefault()}}render(){return this.child_views.forEach(t=>t.render()),this.setHeight(this.height),this.setWidth(this.width),this.element}increaseSize(){this.setHeight(this.height+this.sizeDelta)}decreaseSize(){if(window.innerHeight<this.height-this.sizeDelta){for(let t=0;t<this.objects.length;t++){const e=this.objects[t];if(e.getPosY()+e.getHeight()>this.height-this.sizeDelta)return}this.setHeight(this.height-this.sizeDelta)}}increaseSizeHorizontal(){this.setWidth(this.width+this.sizeDelta)}decreaseSizeHorizontal(){if(window.innerWidth<this.width-this.sizeDelta){for(let t=0;t<this.objects.length;t++){const e=this.objects[t];if(e.getPosX()+e.getWidth()>this.width-this.sizeDelta)return}this.setWidth(this.width-this.sizeDelta)}}setHeight(t){this.height=t,this.element.style.height=`${t}px`}setWidth(t){this.width=t,this.element.style.width=`${t}px`}addBox(t){this.objects.push(t),this.attach(t),t.onScrolled(this.childScrolled)}childScrolled(t,e){t+e>=this.height&&this.increaseSize()}};var M=class extends o{constructor(t){super("<div></div>"),this.onClick=this.onClick.bind(this),this.posX=1150,this.posY=30,this.element.classList.add(r.a.startnode),this.element.setAttribute("style","margin-top:"+this.posY+"px; margin-left:"+this.posX+"px;"),this.id=t,this.element.id=t,this.inputValue="hej",this.functionDescription="STARTNODE FTW",this.output=new a(this,"box-start"),this.input=new a(this,"box-dummy"),this.onScrolledCallbacks=[],this._connectorUpdaters=[],this.attach(this.output),this.element.onclick=this.onClick}onScrolled(t){this.onScrolledCallbacks.push(t)}registerConnectorUpdater(t,e){this._connectorUpdaters.push(e)}unregisterConnectorUpdater(t){}closeDragElement(t){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}onClick(t){console.log("Click before emit"),c.emit("clicked",this.id,t),console.log("Click and emit works")}};var B=class{constructor(t){this.root=document.querySelector("#container-root");const e=t.render();this.root.appendChild(e),t.didAttach(this)}};const I=n(1);!function(){const t=new D,e=(new B(t),new M("start-node"));t.addBox(e),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const e=new l(I());t.addBox(e),e.print()}))}()}]);