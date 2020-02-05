!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){var i,o,r=n(1),s=n(2),l=0,u=0;e.exports=function(e,t,n){var c=t&&n||0,a=t||[],f=(e=e||{}).node||i,h=void 0!==e.clockseq?e.clockseq:o;if(null==f||null==h){var p=r();null==f&&(f=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==h&&(h=o=16383&(p[6]<<8|p[7]))}var d=void 0!==e.msecs?e.msecs:(new Date).getTime(),v=void 0!==e.nsecs?e.nsecs:u+1,m=d-l+(v-u)/1e4;if(m<0&&void 0===e.clockseq&&(h=h+1&16383),(m<0||d>l)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");l=d,u=v,o=h;var y=(1e4*(268435455&(d+=122192928e5))+v)%4294967296;a[c++]=y>>>24&255,a[c++]=y>>>16&255,a[c++]=y>>>8&255,a[c++]=255&y;var g=d/4294967296*1e4&268435455;a[c++]=g>>>8&255,a[c++]=255&g,a[c++]=g>>>24&15|16,a[c++]=g>>>16&255,a[c++]=h>>>8|128,a[c++]=255&h;for(var A=0;A<6;++A)a[c+A]=f[A];return t||s(a)}},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,o=n;return[o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]]].join("")}},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,r=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function l(){l.init.call(this)}e.exports=l,l.EventEmitter=l,l.prototype._events=void 0,l.prototype._eventsCount=0,l.prototype._maxListeners=void 0;var u=10;function c(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?l.defaultMaxListeners:e._maxListeners}function f(e,t,n,i){var o,r,s,l;if(c(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(o=a(e))>0&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,l=u,console&&console.warn&&console.warn(l)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(i);return o.listener=n,i.wrapFn=o,o}function d(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):m(o,o.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(l,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");u=e}}),l.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},l.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},l.prototype.getMaxListeners=function(){return a(this)},l.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var l=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw l.context=s,l}var u=o[e];if(void 0===u)return!1;if("function"==typeof u)r(u,this,t);else{var c=u.length,a=m(u,c);for(n=0;n<c;++n)r(a[n],this,t)}return!0},l.prototype.addListener=function(e,t){return f(this,e,t,!1)},l.prototype.on=l.prototype.addListener,l.prototype.prependListener=function(e,t){return f(this,e,t,!0)},l.prototype.once=function(e,t){return c(t),this.on(e,p(this,e,t)),this},l.prototype.prependOnceListener=function(e,t){return c(t),this.prependListener(e,p(this,e,t)),this},l.prototype.removeListener=function(e,t){var n,i,o,r,s;if(c(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},l.prototype.off=l.prototype.removeListener,l.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},l.prototype.listeners=function(e){return d(this,e,!0)},l.prototype.rawListeners=function(e){return d(this,e,!1)},l.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},l.prototype.listenerCount=v,l.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){"use strict";n.r(t);var i={apa:"ok"};const o=n(0);class r{constructor(e,t,n){this.parent=e,this.eventEmitter=n,this.onClick=this.onClick.bind(this),this.id=e.id+t,this.element=document.createElement("div"),this.element.classList.add(t),this.element.setAttribute("id",e.id),this.connections=[],this.element.onclick=this.onClick}onClick(e){alert("AHAHHHEOiAHEUGO"),this.parent.closeDragElement(),this.testFunc(e),this.eventEmitter.emit("outputClicked",this.id),console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")}testFunc(e){console.log(this.id),console.log("^^^^^^^")}}var s=class{constructor(e,t){console.log("EventEmit:",t.emit("clicked",e)),this.posX=100,this.posY=100,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,console.log(e),this.onClick=this.onClick.bind(this),this.id=e,this.functionDescription="No function yet",this.input=new r(this,"box-input",t),this.output=new r(this,"box-output",t),this.eventEmitter=t,this.element=document.createElement("div"),this.element.classList.add("flowchart-square"),this.element.appendChild(this.input.element),this.element.appendChild(this.output.element),this.element.id=e,this.elementDrag=this.elementDrag.bind(this),this.dragMouseDown=this.dragMouseDown.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.element.onmousedown=this.onClick}render(){return this.element.setAttribute("style",`left: ${this.posX}px; top:${this.posY}px;`),this.element}print(){console.log(i.apa),console.log(o())}elementDrag(e){(e=e||window.event).preventDefault();let t=e.clientX-this.offsetX,n=e.clientY-this.offsetY;t=t<0?0:t,this.element.style.top=`${n}px`,this.element.style.left=`${t}px`,this.posY=n,this.posX=t}closeDragElement(){document.onmouseup=null,document.onmousemove=null}dragMouseDown(e){(e=e||window.event).preventDefault(),this.offsetX=e.clientX-this.posX,this.offsetY=e.clientY-this.posY,document.addEventListener("mouseup",e=>{this.closeDragElement(e)}),document.onmousemove=e=>{this.elementDrag(e)}}onClick(e){this.dragMouseDown(e),this.eventEmitter.emit("clicked",this.id)}};const l=n(3),u=n(0);!function(){let e=new l,t=[],n=[],i={Kalle:1};e.on("clicked",(function(e){let t=n.find(t=>t.id==e);if(t==i){console.log("Open modal");let e=document.getElementById("modal");e.style.display="block",window.onclick=function(t){t.target==e&&(e.style.display="none")}}else i=t,console.log("markedObject: ",i)})),e.on("outputClicked",(function(e){console.log("hallooooooooooooooooooooj"+e)})),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const i=u();t.push(i);const o=new s(i,e);n.push(o),document.querySelector("#workspace-root").appendChild(o.render()),o.print()}))}()}]);