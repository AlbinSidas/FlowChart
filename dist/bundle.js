!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){var i=n(2),o=n(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1},s=(i(o,r),o.locals?o.locals:{});e.exports=s},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,r=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function c(){c.init.call(this)}e.exports=c,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var l=10;function u(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?c.defaultMaxListeners:e._maxListeners}function d(e,t,n,i){var o,r,s,c;if(u(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(o=a(e))>0&&s.length>o&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,c=l,console&&console.warn&&console.warn(c)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function f(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(i);return o.listener=n,i.wrapFn=o,o}function p(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):m(o,o.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return l},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");l=e}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},c.prototype.getMaxListeners=function(){return a(this)},c.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var c=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw c.context=s,c}var l=o[e];if(void 0===l)return!1;if("function"==typeof l)r(l,this,t);else{var u=l.length,a=m(l,u);for(n=0;n<u;++n)r(a[n],this,t)}return!0},c.prototype.addListener=function(e,t){return d(this,e,t,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(e,t){return d(this,e,t,!0)},c.prototype.once=function(e,t){return u(t),this.on(e,f(this,e,t)),this},c.prototype.prependOnceListener=function(e,t){return u(t),this.prependListener(e,f(this,e,t)),this},c.prototype.removeListener=function(e,t){var n,i,o,r,s;if(u(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},c.prototype.listeners=function(e){return p(this,e,!0)},c.prototype.rawListeners=function(e){return p(this,e,!1)},c.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},c.prototype.listenerCount=v,c.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function c(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},i=[],o=0;o<e.length;o++){var r=e[o],l=t.base?r[0]+t.base:r[0],u=n[l]||0,a="".concat(l," ").concat(u);n[l]=u+1;var d=c(a),h={css:r[1],media:r[2],sourceMap:r[3]};-1!==d?(s[d].references++,s[d].updater(h)):s.push({identifier:a,updater:m(h,t),references:1}),i.push(a)}return i}function u(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var s=r(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var a,d=(a=[],function(e,t){return a[e]=t,a.filter(Boolean).join("\n")});function h(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=d(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function f(e,t,n){var i=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var p=null,v=0;function m(e,t){var n,i,o;if(t.singleton){var r=v++;n=p||(p=u(t)),i=h.bind(null,n,r,!1),o=h.bind(null,n,r,!0)}else n=u(t),i=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=c(n[i]);s[o].references--}for(var r=l(e,t),u=0;u<n.length;u++){var a=c(n[u]);0===s[a].references&&(s[a].updater(),s.splice(a,1))}n=r}}}},function(e,t,n){(t=n(4)(!1)).push([e.i,"._1MLRU1Xc_z92TUWOWE0MK6 {\n  position: fixed;\n  width: 100px;\n  bottom: 0px;\n  padding: 5px;\n  left: 0px;\n}\n",""]),t.locals={size_button:"_1MLRU1Xc_z92TUWOWE0MK6"},e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(s=i,c=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(l," */")),r=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([o]).join("\n")}var s,c,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(o[s]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);i&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){var i,o,r=n(6),s=n(7),c=0,l=0;e.exports=function(e,t,n){var u=t&&n||0,a=t||[],d=(e=e||{}).node||i,h=void 0!==e.clockseq?e.clockseq:o;if(null==d||null==h){var f=r();null==d&&(d=i=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==h&&(h=o=16383&(f[6]<<8|f[7]))}var p=void 0!==e.msecs?e.msecs:(new Date).getTime(),v=void 0!==e.nsecs?e.nsecs:l+1,m=p-c+(v-l)/1e4;if(m<0&&void 0===e.clockseq&&(h=h+1&16383),(m<0||p>c)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=p,l=v,o=h;var y=(1e4*(268435455&(p+=122192928e5))+v)%4294967296;a[u++]=y>>>24&255,a[u++]=y>>>16&255,a[u++]=y>>>8&255,a[u++]=255&y;var g=p/4294967296*1e4&268435455;a[u++]=g>>>8&255,a[u++]=255&g,a[u++]=g>>>24&15|16,a[u++]=g>>>16&255,a[u++]=h>>>8|128,a[u++]=255&h;for(var b=0;b<6;++b)a[u+b]=d[b];return t||s(a)}},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,o=n;return[o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],"-",o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]],o[e[i++]]].join("")}},function(e,t,n){"use strict";n.r(t);var i={apa:"ok"};var o=class{constructor(e,t){this.onClick=this.onClick.bind(this),this.elementDrag=this.elementDrag.bind(this),this.mouseDown=this.mouseDown.bind(this),this.setPosY=this.setPosY.bind(this),this.closeDragElement=this.closeDragElement.bind(this),this.posX=100,this.posY=100,this.height=100,this.oldPosY=this.posY,this.oldPosX=this.posX,this.oldX=this.posX,this.oldY=this.posY,this.offsetX=0,this.offsetY=0,this.id=e,this.functionDescription="No function yet",this.input="",this.output="",this.eventEmitter=t,this.element=document.createElement("div"),this.element.classList.add("flowchart-square"),this.element.id=e,this.element.onclick=this.onClick,this.element.onmousedown=this.mouseDown,this.onScrolledCallbacks=[]}render(){return this.element.setAttribute("style",`position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`),this.element}print(){console.log(i.apa)}elementDrag(e){(e=e||window.event).preventDefault();let t=e.clientX-this.offsetX,n=e.clientY-this.offsetY;t=t<0?0:t,n=n<0?0:n;const i=window.innerHeight-this.height,o=i+window.scrollY;n=n-window.scrollY>=i?o:n,this.element.style.top=`${this.posY}px`,this.element.style.left=`${t}px`,this.posX=t,this.posY=n}closeDragElement(e){document.onmouseup=null,document.onmousemove=null,document.onwheel=null}setPosY(e){this.posY=e}onScrolled(e){this.onScrolledCallbacks.push(e)}mouseDown(e){(e=e||window.event).preventDefault(),this.lastScrollPosition=window.scrollY,this.offsetX=e.clientX-this.posX,this.offsetY=e.clientY-this.posY,document.addEventListener("mouseup",e=>{this.closeDragElement(e)}),document.onmousemove=e=>{this.elementDrag(e)};let t=document.getElementById(this.id).style.cssText;document.getElementById(this.id).setAttribute("style",t+" box-shadow: 0px 0px 40px 20px #0ff;")}onClick(e){this.eventEmitter.emit("clicked",this.id,e)}},r=n(0),s=n.n(r);var c=class{constructor(e){var t=document.createRange();console.log(e),t.selectNode(document.getElementById("context"));var n=t.createContextualFragment(e);console.log(n),this.element=n.childNodes[0],this.child_views=[]}didAttach(e){}render(){return this.element}attach(e){this.element.appendChild(e.render()),e.didAttach(this)}addChildView(e){this.child_views.push(e),this.element.appendChild(e.element)}};var l=class extends c{constructor(e){super(e),console.log("element does not exsits",this.element)}didAttach(e){super.didAttach(e),this.element.onclick=this.onClick}onClick(e){}};var u=new(n(1));var a=class extends l{constructor(){super('<div>\n  <button type="button" name="button">APA</button>\n</div>\n'),console.log("Element",this.element),console.log(s.a),this.render=this.render.bind(this),this.name="JI",this.onClick=this.onClick.bind(this)}didAttach(e){super.didAttach(e)}render(){return this.child_views.forEach(e=>e.render()),this.element.classList.add(s.a.size_button),this.element}onClick(e){console.log("I AM CLICKED"+this.name),u.emit("increase_size")}},d='<div id="workspace-root">\n\n\n        <div id="box1"><div id="box1-input" class="box-input"></div><div id="box1-output" class="box-output"></div></div>\n        <div id="box2"><div id="box2-input" class="box-input"></div><div id="box2-output" class="box-output"></div></div>\n\n\n        <h1> Flowchart goes here </h1>\n        <div id="element-picker"> </div>\n\n        <div id="newObject">\n          <img src="../assets/addbutton.png"/>\n        </div>\n\n</div>';var h=class extends c{constructor(e){super(d),this.eventEmitter=e,this.onClick=this.onClick.bind(this),console.log("!C",d),this.height=3e3,this.childScrolled=this.childScrolled.bind(this)}didAttach(e){const t=new a;this.attach(t),u.on("increase_size",()=>{console.log("APAAAAAA"),this.increaseSize()})}onClick(e){this.eventEmitter.emit("clickedWorkspace",e)}render(){return this.child_views.forEach(e=>e.render()),this.setHeight(this.height),this.element}increaseSize(){console.log("INCREASING SIZE"),this.setHeight(this.height+200)}setHeight(e){this.height=e,this.element.style.height=`${e}px`}addBox(e){e.onScrolled(this.childScrolled)}childScrolled(e,t){e+t>=this.height&&this.increaseSize()}};var f=class{constructor(e){this.root=document.querySelector("#container-root");const t=e.render();this.root.appendChild(t),e.didAttach(this)}};const p=n(1),v=n(5);!function(){let e=new p,t=[],n=[],i=null,r={};function s(){let e=document.getElementById(i.id).style.cssText;e=e.split(" box-shadow")[0],document.getElementById(i.id).style.cssText=e,i=null}new a,e.on("clickedWorkspace",e=>{e.clientX==r.clientX&&e.clientY==r.clientY||null==i||s()}),e.on("clicked",(function(e,t){r=t;let o=n.find(t=>t.id==e);if(o==i){console.log("Open modal",o),o.closeDragElement();let e=document.getElementById("modal");e.style.display="block";let t=e.childNodes;!function(e,t,n,i){e.textContent="ID: "+i.id.toString(),function(e,t){e.innerHTML=`<div>\n                                    Input: ${t.input} </br>\n                                    Output: ${t.output} </br>\n                                    Description: ${t.functionDescription}\n                                 </div>`}(t,i),n.textContent="Close"}(t[1],t[3],t[5],o),window.onclick=function(t){t.target==e&&(e.style.display="none")}}else null!=i&&s(),i=o}));const c=new h(e);new f(c),document.querySelector("#newObject").addEventListener("click",(function(){"hidden"==document.getElementById("element-picker").style.visibility?document.getElementById("element-picker").style.visibility="visible":document.getElementById("element-picker").style.visibility="hidden";const i=v();t.push(i);const r=new o(i,e);n.push(r),c.addBox(r),r.print()}))}()}]);