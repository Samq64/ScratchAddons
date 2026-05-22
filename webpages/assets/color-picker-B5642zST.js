const At=i=>class extends i{constructor(){super(),this.constructor.__saveInitialPropertyValues.call(this),this.constructor.__initProperties.call(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.constructor.__setInitialPropertyValues.call(this)}static __saveInitialPropertyValues(){this.__initialPropertyValues=new Map,(this.constructor.observedProperties||[]).map((t=>this.__initialPropertyValues.set(t,this[t])))}static __setInitialPropertyValues(){this.__initialPropertyValues.forEach(((t,e)=>{t!==void 0&&(this[e]=t)}))}static __initProperties(){this.constructor.__propertyAccessors={},(this.constructor.observedProperties||[]).map((t=>this.constructor.__initProperty.call(this,t)))}static __initProperty(t){this.constructor.__propertyAccessors[t]=this.__getPropertyDescriptor(this,t),Object.defineProperty(this,t,{set(e){this.constructor.__setProperty.call(this,t,e)},get(){return this.constructor.__getProperty.call(this,t)}})}static __getProperty(t){const e=this.constructor.__propertyAccessors[t]||{};return e.get?e.get.call(this,t):this[`#${t}`]}static __setProperty(t,e){const r=this.constructor.__propertyAccessors[t]||{},n=this[t];r.set?r.set.call(this,e):this[`#${t}`]=e,this.constructor.__propertyValueChanged.call(this,t,n,this[t])}static __propertyValueChanged(t,e,r){if(e!==r){try{if(JSON.stringify(e)===JSON.stringify(r))return}catch{}this.propertyChangedCallback&&this.propertyChangedCallback(t,e,r)}}__getPropertyDescriptor(t,e){if(t)return Object.getOwnPropertyDescriptor(t,e)||this.__getPropertyDescriptor(Object.getPrototypeOf(t),e)}},kt=i=>class extends i{static get observedAttributes(){const t=[],e=this.DOMProperties||[];for(let r in e)t.push((this.propertyAttributeNames||{})[e[r]]||e[r].toLowerCase());return t}attributeChangedCallback(t,e,r){if(e===r)return;const n=this.constructor.__getPropertyNameByAttributeName.call(this,t);n&&this.constructor.__setDOMProperty.call(this,n,this[n],r)}static __getPropertyNameByAttributeName(t){const e=this.constructor.propertyAttributeNames;for(let n in e)if(e[n]===t)return n;const r=this.constructor.DOMProperties||[];for(let n in r)if(r[n].toLowerCase()===t)return r[n]}static __setDOMProperty(t,e,r){const n=(this.constructor.propertyFromAttributeConverters||{})[t];n&&(r=n.call(this,e,r)),this[t]=r}},Ct=i=>class extends i{connectedCallback(){for(var t in super.connectedCallback(),this.constructor.reflectedProperties){const e=this.constructor.reflectedProperties[t],r=this.constructor.__getAttributeNameByPropertyName.call(this,e);this.constructor.__setDOMAttribute.call(this,r,e,this[e])}}propertyChangedCallback(t,e,r){if(super.propertyChangedCallback&&super.propertyChangedCallback(t,e,r),!this.isConnected||(this.constructor.reflectedProperties||{}).indexOf(t)===-1)return;const n=this.constructor.__getAttributeNameByPropertyName.call(this,t);this.constructor.__setDOMAttribute.call(this,n,t,r)}static __setDOMAttribute(t,e,r){const n=(this.constructor.propertyToAttributeConverters||{})[e];if(n&&(r=n.call(this,r)),r==null)return this.removeAttribute(t);this.setAttribute(t,r)}static __getAttributeNameByPropertyName(t){const e=this.constructor.reflectedProperties||[],r=this.constructor.propertyAttributeNames||{};if(e.indexOf(t)!==-1)return r[t]||t.toLowerCase()}},lt=i=>class extends Ct(kt(At(i))){static get properties(){return{}}static get observedProperties(){return Object.keys(this.__getFilteredProperties.call(this,"observe",!0))}static get DOMProperties(){return Object.keys(this.__getFilteredProperties.call(this,"DOM",!0))}static get reflectedProperties(){return Object.keys(this.__getFilteredProperties.call(this,"reflect",!0))}static get propertyChangedHandlers(){return this.__getPropertyValues.call(this,"changedHandler")}static get propertyAttributeNames(){const t={},e=this.properties;for(let r in e)t[r]=e[r].attributeName||r.toLowerCase();return t}static get propertyToAttributeConverters(){return this.__getPropertyValues.call(this,"toAttributeConverter")}static get propertyFromAttributeConverters(){return this.__getPropertyValues.call(this,"fromAttributeConverter")}static __getFilteredProperties(t,e){const r={},n=this.properties;for(let s in n)n[s][t]===e&&(r[s]=n[s]);return r}static __getPropertyValues(t){const e={},r=this.properties;for(let n in r)e[n]=r[n][t];return e}},ht=i=>class extends i{propertyChangedCallback(t,e,r){super.propertyChangedCallback&&super.propertyChangedCallback(t,e,r),this.constructor.__callPropertyHandlers.call(this,t,e,r)}static __callPropertyHandlers(t,e,r){const n=(this.constructor.propertyChangedHandlers||{})[t];if(n&&n.constructor){if(n.constructor.name==="Function")n.call(this,e,r);else if(n.constructor.name==="String"&&this[n])return this[n].call(this,e,r)}}},St=i=>class extends i{propertiesChangedCallback(t,e,r){super.propertiesChangedCallback&&super.propertiesChangedCallback(t,e,r),this.constructor.__callMultiPropertyHandlers.call(this,t)}static __callMultiPropertyHandlers(t){const e=new Map,r=this.constructor.propertiesChangedHandlers||{};for(let n in t)for(let s in r){const l=r[s];l.indexOf(t[n])!==-1&&e.set(s,l)}e.forEach(((n,s)=>this[s].call(this,...n.map((l=>this[l])))))}static get propertiesChangedHandlers(){return{}}},$t=i=>class extends i{propertyChangedCallback(t,e,r){super.propertyChangedCallback&&super.propertyChangedCallback(t,e,r),this.__changedProperties||(this.__changedProperties=new Map),this.constructor.__addChangedProperty.call(this,t,e)}static __addChangedProperty(t,e){this.__changedProperties.has(t)||this.__changedProperties.set(t,e),window.requestAnimationFrame(this.constructor.__invokeCallback.bind(this))}static __invokeCallback(){if(this.__changedProperties.size===0)return;const t={},e={};this.__changedProperties.forEach(((n,s)=>t[s]=n)),this.__changedProperties.forEach(((n,s)=>e[s]=this[s]));const r=Object.keys(t);this.__changedProperties.clear(),this.propertiesChangedCallback&&this.propertiesChangedCallback(r,t,e)}};function _(i,t){(function(r){return typeof r=="string"&&r.indexOf(".")!==-1&&parseFloat(r)===1})(i)&&(i="100%");var e=(function(r){return typeof r=="string"&&r.indexOf("%")!==-1})(i);return i=t===360?i:Math.min(t,Math.max(0,parseFloat(i))),e&&(i=parseInt(String(i*t),10)/100),Math.abs(i-t)<1e-6?1:i=t===360?(i<0?i%t+t:i%t)/parseFloat(String(t)):i%t/parseFloat(String(t))}function V(i){return Math.min(1,Math.max(0,i))}function ut(i){return i=parseFloat(i),(isNaN(i)||i<0||i>1)&&(i=1),i}function R(i){return i<=1?100*Number(i)+"%":i}function N(i){return i.length===1?"0"+i:String(i)}function Y(i,t,e){i=_(i,255),t=_(t,255),e=_(e,255);var r=Math.max(i,t,e),n=Math.min(i,t,e),s=0,l=0,h=(r+n)/2;if(r===n)l=0,s=0;else{var u=r-n;switch(l=h>.5?u/(2-r-n):u/(r+n),r){case i:s=(t-e)/u+(t<e?6:0);break;case t:s=(e-i)/u+2;break;case e:s=(i-t)/u+4}s/=6}return{h:s,s:l,l:h}}function B(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+6*e*(t-i):e<.5?t:e<2/3?i+(t-i)*(2/3-e)*6:i}function Z(i,t,e){i=_(i,255),t=_(t,255),e=_(e,255);var r=Math.max(i,t,e),n=Math.min(i,t,e),s=0,l=r,h=r-n,u=r===0?0:h/r;if(r===n)s=0;else{switch(r){case i:s=(t-e)/h+(t<e?6:0);break;case t:s=(e-i)/h+2;break;case e:s=(i-t)/h+4}s/=6}return{h:s,s:u,v:l}}function tt(i,t,e,r){var n=[N(Math.round(i).toString(16)),N(Math.round(t).toString(16)),N(Math.round(e).toString(16))];return r&&n[0].startsWith(n[0].charAt(1))&&n[1].startsWith(n[1].charAt(1))&&n[2].startsWith(n[2].charAt(1))?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0):n.join("")}function et(i){return k(i)/255}function k(i){return parseInt(i,16)}var W={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Mt(i){var t,e,r,n={r:0,g:0,b:0},s=1,l=null,h=null,u=null,d=!1,f=!1;return typeof i=="string"&&(i=(function(a){if((a=a.trim().toLowerCase()).length===0)return!1;var c=!1;if(W[a])a=W[a],c=!0;else if(a==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var o=C.rgb.exec(a);return o?{r:o[1],g:o[2],b:o[3]}:(o=C.rgba.exec(a))?{r:o[1],g:o[2],b:o[3],a:o[4]}:(o=C.hsl.exec(a))?{h:o[1],s:o[2],l:o[3]}:(o=C.hsla.exec(a))?{h:o[1],s:o[2],l:o[3],a:o[4]}:(o=C.hsv.exec(a))?{h:o[1],s:o[2],v:o[3]}:(o=C.hsva.exec(a))?{h:o[1],s:o[2],v:o[3],a:o[4]}:(o=C.hex8.exec(a))?{r:k(o[1]),g:k(o[2]),b:k(o[3]),a:et(o[4]),format:c?"name":"hex8"}:(o=C.hex6.exec(a))?{r:k(o[1]),g:k(o[2]),b:k(o[3]),format:c?"name":"hex"}:(o=C.hex4.exec(a))?{r:k(o[1]+o[1]),g:k(o[2]+o[2]),b:k(o[3]+o[3]),a:et(o[4]+o[4]),format:c?"name":"hex8"}:(o=C.hex3.exec(a))?{r:k(o[1]+o[1]),g:k(o[2]+o[2]),b:k(o[3]+o[3]),format:c?"name":"hex"}:!1})(i)),typeof i=="object"&&($(i.r)&&$(i.g)&&$(i.b)?(t=i.r,e=i.g,r=i.b,n={r:255*_(t,255),g:255*_(e,255),b:255*_(r,255)},d=!0,f=String(i.r).substr(-1)==="%"?"prgb":"rgb"):$(i.h)&&$(i.s)&&$(i.v)?(l=R(i.s),h=R(i.v),n=(function(a,c,o){a=6*_(a,360),c=_(c,100),o=_(o,100);var m=Math.floor(a),p=a-m,b=o*(1-c),v=o*(1-p*c),x=o*(1-(1-p)*c),A=m%6;return{r:255*[o,v,b,b,x,o][A],g:255*[x,o,o,v,b,b][A],b:255*[b,b,x,o,o,v][A]}})(i.h,l,h),d=!0,f="hsv"):$(i.h)&&$(i.s)&&$(i.l)&&(l=R(i.s),u=R(i.l),n=(function(a,c,o){var m,p,b;if(a=_(a,360),c=_(c,100),o=_(o,100),c===0)p=o,b=o,m=o;else{var v=o<.5?o*(1+c):o+c-o*c,x=2*o-v;m=B(x,v,a+1/3),p=B(x,v,a),b=B(x,v,a-1/3)}return{r:255*m,g:255*p,b:255*b}})(i.h,l,u),d=!0,f="hsl"),Object.prototype.hasOwnProperty.call(i,"a")&&(s=i.a)),s=ut(s),{ok:d,format:i.format||f,r:Math.min(255,Math.max(n.r,0)),g:Math.min(255,Math.max(n.g,0)),b:Math.min(255,Math.max(n.b,0)),a:s}}var F="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",j="[\\s|\\(]+("+F+")[,|\\s]+("+F+")[,|\\s]+("+F+")\\s*\\)?",z="[\\s|\\(]+("+F+")[,|\\s]+("+F+")[,|\\s]+("+F+")[,|\\s]+("+F+")\\s*\\)?",C={CSS_UNIT:new RegExp(F),rgb:new RegExp("rgb"+j),rgba:new RegExp("rgba"+z),hsl:new RegExp("hsl"+j),hsla:new RegExp("hsla"+z),hsv:new RegExp("hsv"+j),hsva:new RegExp("hsva"+z),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function $(i){return!!C.CSS_UNIT.exec(String(i))}var T=(function(){function i(t,e){var r;if(t===void 0&&(t=""),e===void 0&&(e={}),t instanceof i)return t;typeof t=="number"&&(t=(function(s){return{r:s>>16,g:(65280&s)>>8,b:255&s}})(t)),this.originalInput=t;var n=Mt(t);this.originalInput=t,this.r=n.r,this.g=n.g,this.b=n.b,this.a=n.a,this.roundA=Math.round(100*this.a)/100,this.format=(r=e.format)!==null&&r!==void 0?r:n.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=n.ok}return i.prototype.isDark=function(){return this.getBrightness()<128},i.prototype.isLight=function(){return!this.isDark()},i.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},i.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,r=t.g/255,n=t.b/255;return .2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))},i.prototype.getAlpha=function(){return this.a},i.prototype.setAlpha=function(t){return this.a=ut(t),this.roundA=Math.round(100*this.a)/100,this},i.prototype.toHsv=function(){var t=Z(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},i.prototype.toHsvString=function(){var t=Z(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),n=Math.round(100*t.v);return this.a===1?"hsv("+e+", "+r+"%, "+n+"%)":"hsva("+e+", "+r+"%, "+n+"%, "+this.roundA+")"},i.prototype.toHsl=function(){var t=Y(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},i.prototype.toHslString=function(){var t=Y(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),n=Math.round(100*t.l);return this.a===1?"hsl("+e+", "+r+"%, "+n+"%)":"hsla("+e+", "+r+"%, "+n+"%, "+this.roundA+")"},i.prototype.toHex=function(t){return t===void 0&&(t=!1),tt(this.r,this.g,this.b,t)},i.prototype.toHexString=function(t){return t===void 0&&(t=!1),"#"+this.toHex(t)},i.prototype.toHex8=function(t){return t===void 0&&(t=!1),(function(e,r,n,s,l){var h,u=[N(Math.round(e).toString(16)),N(Math.round(r).toString(16)),N(Math.round(n).toString(16)),N((h=s,Math.round(255*parseFloat(h)).toString(16)))];return l&&u[0].startsWith(u[0].charAt(1))&&u[1].startsWith(u[1].charAt(1))&&u[2].startsWith(u[2].charAt(1))&&u[3].startsWith(u[3].charAt(1))?u[0].charAt(0)+u[1].charAt(0)+u[2].charAt(0)+u[3].charAt(0):u.join("")})(this.r,this.g,this.b,this.a,t)},i.prototype.toHex8String=function(t){return t===void 0&&(t=!1),"#"+this.toHex8(t)},i.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},i.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return this.a===1?"rgb("+t+", "+e+", "+r+")":"rgba("+t+", "+e+", "+r+", "+this.roundA+")"},i.prototype.toPercentageRgb=function(){var t=function(e){return Math.round(100*_(e,255))+"%"};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},i.prototype.toPercentageRgbString=function(){var t=function(e){return Math.round(100*_(e,255))};return this.a===1?"rgb("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%)":"rgba("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%, "+this.roundA+")"},i.prototype.toName=function(){if(this.a===0)return"transparent";if(this.a<1)return!1;for(var t="#"+tt(this.r,this.g,this.b,!1),e=0,r=Object.entries(W);e<r.length;e++){var n=r[e],s=n[0];if(t===n[1])return s}return!1},i.prototype.toString=function(t){var e=!!t;t=t??this.format;var r=!1,n=this.a<1&&this.a>=0;return e||!n||!t.startsWith("hex")&&t!=="name"?(t==="rgb"&&(r=this.toRgbString()),t==="prgb"&&(r=this.toPercentageRgbString()),t!=="hex"&&t!=="hex6"||(r=this.toHexString()),t==="hex3"&&(r=this.toHexString(!0)),t==="hex4"&&(r=this.toHex8String(!0)),t==="hex8"&&(r=this.toHex8String()),t==="name"&&(r=this.toName()),t==="hsl"&&(r=this.toHslString()),t==="hsv"&&(r=this.toHsvString()),r||this.toHexString()):t==="name"&&this.a===0?this.toName():this.toRgbString()},i.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},i.prototype.clone=function(){return new i(this.toString())},i.prototype.lighten=function(t){t===void 0&&(t=10);var e=this.toHsl();return e.l+=t/100,e.l=V(e.l),new i(e)},i.prototype.brighten=function(t){t===void 0&&(t=10);var e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(-t/100*255))),e.g=Math.max(0,Math.min(255,e.g-Math.round(-t/100*255))),e.b=Math.max(0,Math.min(255,e.b-Math.round(-t/100*255))),new i(e)},i.prototype.darken=function(t){t===void 0&&(t=10);var e=this.toHsl();return e.l-=t/100,e.l=V(e.l),new i(e)},i.prototype.tint=function(t){return t===void 0&&(t=10),this.mix("white",t)},i.prototype.shade=function(t){return t===void 0&&(t=10),this.mix("black",t)},i.prototype.desaturate=function(t){t===void 0&&(t=10);var e=this.toHsl();return e.s-=t/100,e.s=V(e.s),new i(e)},i.prototype.saturate=function(t){t===void 0&&(t=10);var e=this.toHsl();return e.s+=t/100,e.s=V(e.s),new i(e)},i.prototype.greyscale=function(){return this.desaturate(100)},i.prototype.spin=function(t){var e=this.toHsl(),r=(e.h+t)%360;return e.h=r<0?360+r:r,new i(e)},i.prototype.mix=function(t,e){e===void 0&&(e=50);var r=this.toRgb(),n=new i(t).toRgb(),s=e/100;return new i({r:(n.r-r.r)*s+r.r,g:(n.g-r.g)*s+r.g,b:(n.b-r.b)*s+r.b,a:(n.a-r.a)*s+r.a})},i.prototype.analogous=function(t,e){t===void 0&&(t=6),e===void 0&&(e=30);var r=this.toHsl(),n=360/e,s=[this];for(r.h=(r.h-(n*t>>1)+720)%360;--t;)r.h=(r.h+n)%360,s.push(new i(r));return s},i.prototype.complement=function(){var t=this.toHsl();return t.h=(t.h+180)%360,new i(t)},i.prototype.monochromatic=function(t){t===void 0&&(t=6);for(var e=this.toHsv(),r=e.h,n=e.s,s=e.v,l=[],h=1/t;t--;)l.push(new i({h:r,s:n,v:s})),s=(s+h)%1;return l},i.prototype.splitcomplement=function(){var t=this.toHsl(),e=t.h;return[this,new i({h:(e+72)%360,s:t.s,l:t.l}),new i({h:(e+216)%360,s:t.s,l:t.l})]},i.prototype.onBackground=function(t){var e=this.toRgb(),r=new i(t).toRgb();return new i({r:r.r+(e.r-r.r)*e.a,g:r.g+(e.g-r.g)*e.a,b:r.b+(e.b-r.b)*e.a})},i.prototype.triad=function(){return this.polyad(3)},i.prototype.tetrad=function(){return this.polyad(4)},i.prototype.polyad=function(t){for(var e=this.toHsl(),r=e.h,n=[this],s=360/t,l=1;l<t;l++)n.push(new i({h:(r+l*s)%360,s:e.s,l:e.l}));return n},i.prototype.equals=function(t){return this.toRgbString()===new i(t).toRgbString()},i})();/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const rt=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,K=(i,t,e=null)=>{for(;t!==e;){const r=t.nextSibling;i.removeChild(t),t=r}},M=`{{lit-${String(Math.random()).slice(2)}}}`,ct=`<!--${M}-->`,it=new RegExp(`${M}|${ct}`);class dt{constructor(t,e){this.parts=[],this.element=e;const r=[],n=[],s=document.createTreeWalker(e.content,133,null,!1);let l=0,h=-1,u=0;const{strings:d,values:{length:f}}=t;for(;u<f;){const a=s.nextNode();if(a!==null){if(h++,a.nodeType===1){if(a.hasAttributes()){const c=a.attributes,{length:o}=c;let m=0;for(let p=0;p<o;p++)nt(c[p].name,"$lit$")&&m++;for(;m-- >0;){const p=d[u],b=U.exec(p)[2],v=b.toLowerCase()+"$lit$",x=a.getAttribute(v);a.removeAttribute(v);const A=x.split(it);this.parts.push({type:"attribute",index:h,name:b,strings:A}),u+=A.length-1}}a.tagName==="TEMPLATE"&&(n.push(a),s.currentNode=a.content)}else if(a.nodeType===3){const c=a.data;if(c.indexOf(M)>=0){const o=a.parentNode,m=c.split(it),p=m.length-1;for(let b=0;b<p;b++){let v,x=m[b];if(x==="")v=P();else{const A=U.exec(x);A!==null&&nt(A[2],"$lit$")&&(x=x.slice(0,A.index)+A[1]+A[2].slice(0,-5)+A[3]),v=document.createTextNode(x)}o.insertBefore(v,a),this.parts.push({type:"node",index:++h})}m[p]===""?(o.insertBefore(P(),a),r.push(a)):a.data=m[p],u+=p}}else if(a.nodeType===8)if(a.data===M){const c=a.parentNode;a.previousSibling!==null&&h!==l||(h++,c.insertBefore(P(),a)),l=h,this.parts.push({type:"node",index:h}),a.nextSibling===null?a.data="":(r.push(a),h--),u++}else{let c=-1;for(;(c=a.data.indexOf(M,c+1))!==-1;)this.parts.push({type:"node",index:-1}),u++}}else s.currentNode=n.pop()}for(const a of r)a.parentNode.removeChild(a)}}const nt=(i,t)=>{const e=i.length-t.length;return e>=0&&i.slice(e)===t},pt=i=>i.index!==-1,P=()=>document.createComment(""),U=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function st(i,t){const{element:{content:e},parts:r}=i,n=document.createTreeWalker(e,133,null,!1);let s=E(r),l=r[s],h=-1,u=0;const d=[];let f=null;for(;n.nextNode();){h++;const a=n.currentNode;for(a.previousSibling===f&&(f=null),t.has(a)&&(d.push(a),f===null&&(f=a)),f!==null&&u++;l!==void 0&&l.index===h;)l.index=f!==null?-1:l.index-u,s=E(r,s),l=r[s]}d.forEach((a=>a.parentNode.removeChild(a)))}const Pt=i=>{let t=i.nodeType===11?0:1;const e=document.createTreeWalker(i,133,null,!1);for(;e.nextNode();)t++;return t},E=(i,t=-1)=>{for(let e=t+1;e<i.length;e++){const r=i[e];if(pt(r))return e}return-1};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Ft=new WeakMap,H=i=>typeof i=="function"&&Ft.has(i),S={},ot={};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class G{constructor(t,e,r){this.__parts=[],this.template=t,this.processor=e,this.options=r}update(t){let e=0;for(const r of this.__parts)r!==void 0&&r.setValue(t[e]),e++;for(const r of this.__parts)r!==void 0&&r.commit()}_clone(){const t=rt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],r=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let s,l=0,h=0,u=n.nextNode();for(;l<r.length;)if(s=r[l],pt(s)){for(;h<s.index;)h++,u.nodeName==="TEMPLATE"&&(e.push(u),n.currentNode=u.content),(u=n.nextNode())===null&&(n.currentNode=e.pop(),u=n.nextNode());if(s.type==="node"){const d=this.processor.handleTextExpression(this.options);d.insertAfterNode(u.previousSibling),this.__parts.push(d)}else this.__parts.push(...this.processor.handleAttributeExpressions(u,s.name,s.strings,this.options));l++}else this.__parts.push(void 0),l++;return rt&&(document.adoptNode(t),customElements.upgrade(t)),t}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const at=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:i=>i}),Nt=` ${M} `;class ft{constructor(t,e,r,n){this.strings=t,this.values=e,this.type=r,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let n=0;n<t;n++){const s=this.strings[n],l=s.lastIndexOf("<!--");r=(l>-1||r)&&s.indexOf("-->",l+1)===-1;const h=U.exec(s);e+=h===null?s+(r?Nt:ct):s.substr(0,h.index)+h[1]+h[2]+"$lit$"+h[3]+M}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return at!==void 0&&(e=at.createHTML(e)),t.innerHTML=e,t}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Q=i=>i===null||!(typeof i=="object"||typeof i=="function"),J=i=>Array.isArray(i)||!(!i||!i[Symbol.iterator]);class gt{constructor(t,e,r){this.dirty=!0,this.element=t,this.name=e,this.strings=r,this.parts=[];for(let n=0;n<r.length-1;n++)this.parts[n]=this._createPart()}_createPart(){return new bt(this)}_getValue(){const t=this.strings,e=t.length-1,r=this.parts;if(e===1&&t[0]===""&&t[1]===""){const s=r[0].value;if(typeof s=="symbol")return String(s);if(typeof s=="string"||!J(s))return s}let n="";for(let s=0;s<e;s++){n+=t[s];const l=r[s];if(l!==void 0){const h=l.value;if(Q(h)||!J(h))n+=typeof h=="string"?h:String(h);else for(const u of h)n+=typeof u=="string"?u:String(u)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class bt{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===S||Q(t)&&t===this.value||(this.value=t,H(t)||(this.committer.dirty=!0))}commit(){for(;H(this.value);){const t=this.value;this.value=S,t(this)}this.value!==S&&this.committer.commit()}}class q{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(P()),this.endNode=t.appendChild(P())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=P()),t.__insert(this.endNode=P())}insertAfterPart(t){t.__insert(this.startNode=P()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(this.startNode.parentNode===null)return;for(;H(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=S,e(this)}const t=this.__pendingValue;t!==S&&(Q(t)?t!==this.value&&this.__commitText(t):t instanceof ft?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):J(t)?this.__commitIterable(t):t===ot?(this.value=ot,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,r=typeof(t=t??"")=="string"?t:String(t);e===this.endNode.previousSibling&&e.nodeType===3?e.data=r:this.__commitNode(document.createTextNode(r)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof G&&this.value.template===e)this.value.update(t.values);else{const r=new G(e,t.processor,this.options),n=r._clone();r.update(t.values),this.__commitNode(n),this.value=r}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let r,n=0;for(const s of t)r=e[n],r===void 0&&(r=new q(this.options),e.push(r),n===0?r.appendIntoPart(this):r.insertAfterPart(e[n-1])),r.setValue(s),r.commit(),n++;n<e.length&&(e.length=n,this.clear(r&&r.endNode))}clear(t=this.startNode){K(this.startNode.parentNode,t.nextSibling,this.endNode)}}class Dt{constructor(t,e,r){if(this.value=void 0,this.__pendingValue=void 0,r.length!==2||r[0]!==""||r[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=r}setValue(t){this.__pendingValue=t}commit(){for(;H(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=S,e(this)}if(this.__pendingValue===S)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=S}}class Et extends gt{constructor(t,e,r){super(t,e,r),this.single=r.length===2&&r[0]===""&&r[1]===""}_createPart(){return new Ht(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Ht extends bt{}let mt=!1;(()=>{try{const i={get capture(){return mt=!0,!1}};window.addEventListener("test",i,i),window.removeEventListener("test",i,i)}catch{}})();class It{constructor(t,e,r){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=r,this.__boundHandleEvent=n=>this.handleEvent(n)}setValue(t){this.__pendingValue=t}commit(){for(;H(this.__pendingValue);){const s=this.__pendingValue;this.__pendingValue=S,s(this)}if(this.__pendingValue===S)return;const t=this.__pendingValue,e=this.value,r=t==null||e!=null&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=t!=null&&(e==null||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=Ot(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=S}handleEvent(t){typeof this.value=="function"?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const Ot=i=>i&&(mt?{capture:i.capture,passive:i.passive,once:i.once}:i.capture);function Vt(i){let t=I.get(i.type);t===void 0&&(t={stringsArray:new WeakMap,keyString:new Map},I.set(i.type,t));let e=t.stringsArray.get(i.strings);if(e!==void 0)return e;const r=i.strings.join(M);return e=t.keyString.get(r),e===void 0&&(e=new dt(i,i.getTemplateElement()),t.keyString.set(r,e)),t.stringsArray.set(i.strings,e),e}const I=new Map,D=new WeakMap;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Rt=new class{handleAttributeExpressions(i,t,e,r){const n=t[0];return n==="."?new Et(i,t.slice(1),e).parts:n==="@"?[new It(i,t.slice(1),r.eventContext)]:n==="?"?[new Dt(i,t.slice(1),e)]:new gt(i,t,e).parts}handleTextExpression(i){return new q(i)}};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const O=(i,...t)=>new ft(i,t,"html",Rt),vt=(i,t)=>`${i}--${t}`;let L=!0;window.ShadyCSS===void 0?L=!1:window.ShadyCSS.prepareTemplateDom===void 0&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const Tt=i=>t=>{const e=vt(t.type,i);let r=I.get(e);r===void 0&&(r={stringsArray:new WeakMap,keyString:new Map},I.set(e,r));let n=r.stringsArray.get(t.strings);if(n!==void 0)return n;const s=t.strings.join(M);if(n=r.keyString.get(s),n===void 0){const l=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(l,i),n=new dt(t,l),r.keyString.set(s,n)}return r.stringsArray.set(t.strings,n),n},Lt=["html","svg"],yt=new Set,qt=(i,t,e)=>{yt.add(i);const r=e?e.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:s}=n;if(s===0)return void window.ShadyCSS.prepareTemplateStyles(r,i);const l=document.createElement("style");for(let d=0;d<s;d++){const f=n[d];f.parentNode.removeChild(f),l.textContent+=f.textContent}(d=>{Lt.forEach((f=>{const a=I.get(vt(f,d));a!==void 0&&a.keyString.forEach((c=>{const{element:{content:o}}=c,m=new Set;Array.from(o.querySelectorAll("style")).forEach((p=>{m.add(p)})),st(c,m)}))}))})(i);const h=r.content;e?(function(d,f,a=null){const{element:{content:c},parts:o}=d;if(a==null)return void c.appendChild(f);const m=document.createTreeWalker(c,133,null,!1);let p=E(o),b=0,v=-1;for(;m.nextNode();)for(v++,m.currentNode===a&&(b=Pt(f),a.parentNode.insertBefore(f,a));p!==-1&&o[p].index===v;){if(b>0){for(;p!==-1;)o[p].index+=b,p=E(o,p);return}p=E(o,p)}})(e,l,h.firstChild):h.insertBefore(l,h.firstChild),window.ShadyCSS.prepareTemplateStyles(r,i);const u=h.querySelector("style");if(window.ShadyCSS.nativeShadow&&u!==null)t.insertBefore(u.cloneNode(!0),t.firstChild);else if(e){h.insertBefore(l,h.firstChild);const d=new Set;d.add(l),st(e,d)}},_t=(i,t,e)=>{if(!e||typeof e!="object"||!e.scopeName)throw new Error("The `scopeName` option is required.");const r=e.scopeName,n=D.has(t),s=L&&t.nodeType===11&&!!t.host,l=s&&!yt.has(r),h=l?document.createDocumentFragment():t;if(((u,d,f)=>{let a=D.get(d);a===void 0&&(K(d,d.firstChild),D.set(d,a=new q(Object.assign({templateFactory:Vt},f))),a.appendInto(d)),a.setValue(u),a.commit()})(i,h,Object.assign({templateFactory:Tt(r)},e)),l){const u=D.get(h);D.delete(h);const d=u.value instanceof G?u.value.template:void 0;qt(r,h,d),K(t,t.firstChild),t.appendChild(h),D.set(t,u)}!n&&s&&window.ShadyCSS.styleElement(t.host)},w={fromAttribute:(i,t)=>t==="",toAttribute:i=>{if(i)return""}},y={fromAttribute:(i,t)=>i||t?t===""?null:t&&Number(t):i,toAttribute:i=>{if(!isNaN(i))return i}},g={fromAttribute:(i,t)=>i||t?t&&String(t):i,toAttribute:i=>{if(i!=="")return i}};class Bt extends lt(HTMLElement){static get properties(){return{accept:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},accessKey:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},alt:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},autocomplete:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},autofocus:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},capture:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},checked:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},dirname:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},disabled:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},height:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},inputmode:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},max:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},maxlength:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},name:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},min:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},minlength:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},multiple:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},pattern:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},placeholder:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},readonly:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},required:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:w.fromAttribute,toAttributeConverter:w.toAttribute},size:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},src:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},step:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},width:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},tabIndex:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:y.fromAttribute,toAttributeConverter:y.toAttribute},type:{observe:!0,DOM:!0,reflect:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},value:{observe:!0,DOM:!0,fromAttributeConverter:g.fromAttribute,toAttributeConverter:g.toAttribute},__elementFocused:{observe:!0}}}constructor(){super();const t=document.createElement("input");this.accept=t.accept,this.accessKey=t.accessKey,this.alt=t.alt,this.autocomplete=t.autocomplete,this.autofocus=t.autofocus,this.capture=t.capture,this.checked=t.checked,this.dirname=t.dirname,this.disabled=t.disabled,this.height=t.height,this.inputmode=t.inputmode,this.max=t.max,this.maxlength=t.maxlength,this.min=t.min,this.minlength=t.minlength,this.multiple=t.multiple,this.name=t.name,this.pattern=t.pattern,this.placeholder=t.placeholder,this.readonly=t.readonly,this.required=t.required,this.size=t.size,this.src=t.src,this.step=t.step,this.tabIndex=t.tabIndex,this.width=t.width,this.type=t.type,this.value=t.value,this.__elementFocused=!1,this.attachShadow({mode:"open",delegatesFocus:this.__delegatesFocus}),this.render(),this.__delegatesFocus||this.addEventListener("focus",(()=>this.$element.focus()))}propertyChangedCallback(t,e,r){super.propertyChangedCallback(t,e,r),this.render()}get styles(){return O`
      <style>
        :host { outline: none }

        input:invalid {
          border: 1px solid red;
        }
      </style>
    `}get template(){return O`
      ${this.styles}
      <input
      .accept="${this.accept}"
      .accessKey="${this.accessKey}"
      .alt="${this.alt}"
      ?autocomplete="${this.autocomplete}"
      ?autofocus="${this.autofocus}"
      .capture="${this.capture}"
      ?checked="${this.checked}"
      .dirname="${this.dirname}"
      ?disabled="${this.disabled}"
      .height="${this.height}"
      .inputmode="${this.inputmode}"
      .max="${this.max}"
      .maxlength="${this.maxlength}"
      .min="${this.min}"
      .minlength="${this.minlength}"
      ?multiple="${this.multiple}"
      .name="${this.name}"
      .placeholder="${this.placeholder}"
      ?readonly="${this.readonly}"
      ?required="${this.required}"
      .size="${this.size}"
      .src="${this.src}"
      .step="${this.step}"
      .tabIndex="${this.tabIndex}"
      .width="${this.width}"
      .type="${this.type}"
      .value="${this.value}"
      @focus="${()=>this.__elementFocused=!0}"
      @blur="${()=>this.__elementFocused=!1}"
      @input="${this.__handleInput}"
      @change="${this.__handleChange}"
      >
    `}render(){this.__elementFocused!==!0&&window.requestAnimationFrame((()=>{_t(this.template,this.shadowRoot,{eventContext:this,scopeName:this.localName})}))}get accessKey(){return this._accessKey}set accessKey(t){this._accessKey=t}get list(){return this.$element.list}get tabIndex(){return this.disabled===!0?-1:this._tabIndex}set tabIndex(t){this._tabIndex=parseInt(t)}get validationMessage(){return this.$element.validationMessage}get validity(){return this.$element.validity}get willValidate(){return this.$element.willValidate}checkValidity(){return this.$element.checkValidity()}reportValidity(){return this.$element.reportValidity()}select(){return this.$element.select()}setCustomValidity(t){this.$element.setCustomValidity(t)}setRangeText(){this.$element.setRangeText(...arguments)}setSelectionRange(){this.$element.setSelectionRange(...arguments)}stepDown(){this.$element.stepDown(),this.value=this.$element.value}stepUp(){this.$element.stepUp(),this.value=this.$element.value}get $element(){return this.shadowRoot&&this.shadowRoot.querySelector("input")||{}}get __delegatesFocus(){const t=document.createElement("div");return t.attachShadow({mode:"open",delegatesFocus:!0}),t.shadowRoot.delegatesFocus||!1}__handleInput(t){this.value=t.target.value,this.checked=t.target.checked}__handleChange(t){this.value=t.target.value,this.checked=t.target.checked,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0}))}}const X=i=>{(function(){window.__focusVisiblePolyFillReady!==!0&&(window.addEventListener("keydown",(t=>window.__focusVisiblePolyFillLastKeyDown=t.key)),window.addEventListener("mousedown",(()=>window.__focusVisiblePolyFillLastKeyDown=null)),window.addEventListener("pointerdown",(()=>window.__focusVisiblePolyFillLastKeyDown=null)),window.addEventListener("touchdown",(()=>window.__focusVisiblePolyFillLastKeyDown=null)),window.__focusVisiblePolyFillReady=!0)})(),i.addEventListener("focus",jt.bind(i)),i.addEventListener("blur",Wt.bind(i))};function jt(){if(window.__focusVisiblePolyFillLastKeyDown==="Tab")return zt.call(this);xt.call(this)}function zt(){this.classList.add("focus-visible")}function xt(){this.classList.remove("focus-visible")}function Wt(){xt.call(this)}class wt extends ht(Bt){static get properties(){return{...super.properties,label:{observe:!0,changedHandler:"_labelChanged"}}}get styles(){return O`
      <style>

        :host {
          display: block;
          outline: none;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: inline-block;
          background: transparent;
          padding: 0;
          border-radius: 10px;
          height: 14px;
          overflow: hidden;
        }

        input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          width: 100%;
          height: 100%;
          background: transparent;
          position: relative;
          margin: 0;
          padding: 0;
          font-size: 0;
          outline: none;
          z-index: 1;
        }

        :host(.focus-visible) input {
          outline-color: -webkit-focus-ring-color;
          outline-style: auto;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          ${this._thumbStyles}
        }

        input[type="range"]::-moz-range-thumb {
          -moz-appearance: none;
          ${this._thumbStyles}
        }

        input[type="range"]::-ms-thumb {
          -ms-appearance: none;
          ${this._thumbStyles}
        }

        input[type="range"]::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          ${this._trackStyles}
        }

        input[type="range"]::-moz-range-track {
          -moz-appearance: none;
          ${this._trackStyles}
        }

        input[type="range"]::-ms-track {
          -ms-appearance: none;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
          ${this._trackStyles}
        }

        input[type="range"]::-ms-fill-lower {
          background: transparent;
        }

      </style>
    `}get _thumbStyles(){return`
      height: 14px;
      width: 14px;
      background: transparent;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.4), inset 0 0 2px rgba(0,0,0,0.4);
      border-radius: 50%;
      box-sizing: border-box;
      content: '';
    `}get _trackStyles(){return`
      height: 100%;
      width: 100%;
      background: transparent;
    `}constructor(){super(),X(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),window.requestAnimationFrame((()=>{this._labelChanged(),this.$element.addEventListener("change",this._handleChange.bind(this))}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.$element.removeEventListener("change",this._handleChange.bind(this))}get type(){return"range"}_labelChanged(){this.$element.setAttribute&&this.$element.setAttribute("aria-label",this.label)}_handleChange(t){const e=document.createEvent("CustomEvent");e.initCustomEvent("change",t.bubbles,t.cancelable,t.detail),this.dispatchEvent(e)}}window.customElements.define("color-picker-slider",wt);class Kt extends St($t(ht(lt(HTMLElement)))){static get properties(){return{value:{observe:!0,DOM:!0,changedHandler:"_valueChanged"},no_alpha:{observe:!1,DOM:!0,changedHandler:"_noAlphaChanged"},formats:{observe:!0,DOM:!0,fromAttributeConverter:function(t,e){return e.replace(/\s+/g,"").split(",")},changedHandler:"_formatsChanged"},selectedFormat:{observe:!0,DOM:!0,changedHandler:"_selectedFormatChanged"},_pointerDown:{observe:!0},_sliderDown:{observe:!0}}}get value(){if(this.color)return this.selectedFormat==="hex"?this.color.toHexString():this.selectedFormat==="hex8"?this.color.toHex8String():this.selectedFormat==="hsl"?this.color.toHslString():this.selectedFormat==="hsv"?this.color.toHsvString():this.color.toRgbString()}set value(t){this["#value"]=new T(t)}get color(){return this["#value"]}set formats(t){if(t.constructor.name!=="Array")return;const e=[];for(var r in t)this.supportedFormats.indexOf(t[r])!==-1&&e.push(t[r]);this["#formats"]=[...e]}get supportedFormats(){return["hex","hex8","rgb","hsv","hsl"]}get selectedFormat(){return this["#selectedFormat"]}set selectedFormat(t){(this.formats||[]).indexOf(t)!==-1&&(this["#selectedFormat"]=t)}get hsv(){return this.color.toHsv()}get alpha(){return this.color.getAlpha()}set alpha(t){const e=this.color;this.color.setAlpha(t),this.propertyChangedCallback("value",e,this.color)}get hex(){return this.color.toHex()}get hex8(){return this.color.toHex8()}get rgb(){return this.color.toRgb()}get hsl(){return this.color.toHsl()}get _gridGradient(){return this.selectedFormat==="hsl"?"linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%), linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%)":"linear-gradient(rgba(0,0,0,0) 0%, #000 100%), linear-gradient(to left, rgba(255,255,255,0) 0%, #fff 100%)"}constructor(){super(),this.attachShadow({mode:"open"}),this.value={h:0,s:1,v:1},this.selectedFormat="rgb",this._pointerDown=!1,this._sliderDown=!1,this.formats=this.supportedFormats,this.no_alpha=this.getAttribute("no_alpha"),window.addEventListener("mouseup",this._handleMouseup.bind(this),!1),window.addEventListener("mousemove",this._handleMousemove.bind(this),!1),X(this._$grid),this._valueChanged(),this.shadowRoot.querySelectorAll("input, select").forEach((t=>X(t)))}connectedCallback(){super.connectedCallback(),this.selectedFormat=this.color.format,this._valueChanged()}propertyChangedCallback(t,e,r){super.propertyChangedCallback(t,e,r),_t(this.template,this.shadowRoot,{eventContext:this,scopeName:this.localName})}static get propertiesChangedHandlers(){return{_notifyChanges:["value","_pointerDown","_sliderDown"]}}get template(){return O`

      <style>

        *, *:before, *:after {
          box-sizing: border-box;
          font-size: 0;
          font-family: var(--color-picker-font-family);
        }

        :host {
          width: 240px;
          height: 240px;
          display: block;
          --color-picker-background-color: #fff;
          --color-picker-color: #222;
          --color-picker-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-family: var(--color-picker-font-family);
        }

        :host([light]) {
          --color-picker-background-color: #fff;
          --color-picker-color: #222;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --color-picker-background-color: #222;
            --color-picker-color: #fff;
          }
        }

        :host([dark]) {
          --color-picker-background-color: #222;
          --color-picker-color: #fff;
        }

        #container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background-color: var(--color-picker-background-color);
          color: var(--color-picker-color);
        }

        #gridInput {
          width: 100%;
          outline: none;
          flex: 1;
          position: relative;
        }

        #gridInput .overlay {
          width: 100%;
          top: 0;
          left: 0;
          height: 100%;
          pointer-events: none;
          position: absolute;
        }

        #gridInput .overlay .thumb {
          position: absolute;
          margin: -7px;
          pointer-events: none;
          ${this._thumbStyles}
        }

        #gridInput.focus-visible:focus {
          outline-color: -webkit-focus-ring-color;
          outline-style: auto;
        }

        .absbefore:before,
        .absafter:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: '';
        }

        #sliderInput {
          padding: 8px;
          display: flex;
        }

        #sliders {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          margin-right: 8px;
        }

        color-picker-slider {
          position: relative;
        }

        color-picker-slider + color-picker-slider {
          margin-top: 8px;
        }

        color-picker-slider:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }

        #hueInput:after {
          background: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);
        }

        #alphaInput:after {
          background: var(--color-picker-alpha-slider-background);
        }

        #alphaInput:before, #alphaInput:after {
          border-radius: inherit;
          pointer-events: none;
        }

        #colorSteel {
          position: relative;
          width: 100%;
          height: 100%;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--bg-color--20);
          margin: auto;
          overflow: hidden;
        }

        .checkerboard:before {
          background: linear-gradient(45deg, #777 25%, transparent 25%), linear-gradient(-45deg, #777 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #777 75%), linear-gradient(-45deg, transparent 75%, #777 75%);
          background-size: 6px 6px;
          background-position: 0 0, 0 3px, 3px -3px, -3px 0px;
        }

        #colorSteel .inner {
          width: 100%;
          height: 100%;
          position: relative;
        }

        input, select {
          border: 1px solid transparent;
          outline: none;
        }

        option {
          color: #222;
          background: var(--color-picker-background-color);
        }

        input:hover, select:hover, input:focus, select:focus {
          border-color: var(--bg-color--20);
        }

        :focus.focus-visible {
          outline-color: -webkit-focus-ring-color;
          outline-style: auto;
        }

        input, select, select * {
          font-size: 12px;
          padding: 3px;
          min-width: 44px;
          color: inherit;
          -moz-appearance: textfield;
          font-family: var(--color-picker-font-family);
        }

        input[type="text"] {
          min-width: 80px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        #textInput {
          padding: 0 8px 8px 8px;
          display: flex;
          /* align-items: center; */
        }

        select, .color-input, .alpha-input {
          flex: 0;
          padding: 0;
        }

        .color-input label, .alpha-input label {
          position: relative;
          display: block;
          flex-grow: 1;
        }
        
        .color-input label:after, .alpha-input label:after {
          content: attr(data-name);
          font-size: 10px;
          width: 100%;
          text-align: center;
          text-transform: uppercase;
          color: inherit;
          color: var(--bg-color--60);
          display: block;
        }

        select .alpha-input {
          flex: 0;
        }

        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          border-radius: 0;
          background: transparent;
          padding: 3px;
          text-align: center;
          text-align-last: center;
          align-self: flex-start;
          margin: 0;
        }

        select::-ms-expand {
          display: none;
        }

        .color-input {
          flex: 1 0 0;
          display: flex;
          justify-content: flex-start;
        }

        input {
          padding: 3px;
          margin: 0;
          flex: 1;
          text-align: center;
          text-align-last: center;
          background: transparent;
          color: inherit;
          text-transform: uppercase;
          width: 100%;
        }

        [hidden] {
          display: none!important;
        }
      </style>

      <div id="container">

        <section
          id="gridInput"
          tabindex="0"
          role="slider"
          aria-label="change saturation and ${this.selectedFormat==="hsl"?"light":"value"}"
          aria-valuemin="0"
          aria-valuemax="1.00"
          aria-orientation="vertical"
          aria-valuetext="saturation ${this.hsv.s.toFixed(2)} ${this.selectedFormat==="hsl"?`light ${this.hsl.l.toFixed(2)}`:`value ${this.hsv.v.toFixed(2)}`}"
          @mousedown="${this._handleMousedown}"
          @keydown="${this._handleGridKeydown}"
        ><div class="overlay"><div class="thumb"></div></div></section>

        <section id="sliderInput">
          <div id="sliders">
            <color-picker-slider tabindex="0" .label="${"change hue"}" id="hueInput" .value="${this.hsv.h}" min="0" max="359" step="1" data-scheme="hsv" data-key="h" @input="${this._handleHueSliderInput}" @change="${this._handleHueSliderInput}" @mousedown="${()=>this._sliderDown=!0}" @mouseup="${()=>this._sliderDown=!1}"></color-picker-slider>
            <color-picker-slider tabindex="0" .label="${"change alpha"}" id="alphaInput" class="absbefore absafter checkerboard" ?hidden="${this.no_alpha=="true"}" .value="${100*this.alpha}" min="0" max="100" step="1" @input="${this._handleAlphaSliderInput}" @change="${this._handleAlphaSliderInput}" @mousedown="${()=>this._sliderDown=!0}" @mouseup="${()=>this._sliderDown=!1}"></color-picker-slider>
          </div>
          <div id="colorSteel" class="checkerboard absbefore">
            <div class="inner"></div>
          </div>
        </section>

        <section id="textInput">

          <select aria-label="select color scheme" .selectedIndex="${(this.formats||[]).indexOf(this.selectedFormat)}" @change="${this._handleSelectChange}" @input="${t=>t.stopPropagation()}">
            ${(this.formats||[]).map((t=>O`
              <option .value="${t}">${t.toUpperCase()}</option>
            `))}
          </select>

          <div ?hidden="${this.selectedFormat!=="hsv"}" class="color-input">
            <label data-name="h"><input aria-label="change hue" type="number" .value="${Math.round(this.hsv.h)}" min="0" max="359" step="1" data-scheme="hsv", data-key="h" @input="${this._handleInput}"></label>
            <label data-name="s"><input aria-label="change saturation" type="number" .value="${Math.round(100*this.hsv.s)}" min="0" max="100" step="1" data-scheme="hsv", data-key="s" @input="${this._handleInput}"></label>
            <label data-name="v"><input aria-label="change value / brightness" type="number" .value="${Math.round(100*this.hsv.v)}" min="0" max="100" step="1" data-scheme="hsv", data-key="v" @input="${this._handleInput}"></label>
            <label ?hidden="${this.no_alpha=="true"}" data-name="%"><input aria-label="change alpha" type="number" .value="${Math.round(100*this.alpha)}" min="0" max="100" step="1" data-scheme="alpha" @input="${this._handleAlphaInput}"></label>
          </div>

          <div ?hidden="${this.selectedFormat!=="hsl"}" class="color-input">
            <label data-name="h"><input aria-label="change hue" type="number" .value="${Math.round(this.hsl.h)}" min="0" max="359" step="1" data-scheme="hsl", data-key="h" @input="${this._handleInput}"></label>
            <label data-name="s"><input aria-label="change saturation" type="number" .value="${Math.round(100*this.hsl.s)}" min="0" max="100" step="1" data-scheme="hsl", data-key="s" @input="${this._handleInput}"></label>
            <label data-name="l"><input aria-label="change light" type="number" .value="${Math.round(100*this.hsl.l)}" min="0" max="100" step="1" data-scheme="hsl", data-key="l" @input="${this._handleInput}"></label>
            <label ?hidden="${this.no_alpha=="true"}" data-name="%"><input aria-label="change alpha" type="number" .value="${Math.round(100*this.alpha)}" min="0" max="100" step="1" data-scheme="alpha" @input="${this._handleAlphaInput}"></label>
          </div>

          <div ?hidden="${this.selectedFormat!=="rgb"}" class="color-input">
            <label data-name="r"><input aria-label="change red" type="number" .value="${this.rgb.r}" min="0" max="255" step="1" data-scheme="rgb", data-key="r" @input="${this._handleInput}"></label>
            <label data-name="g"><input aria-label="change green" type="number" .value="${this.rgb.g}" min="0" max="255" step="1" data-scheme="rgb", data-key="g" @input="${this._handleInput}"></label>
            <label data-name="b"><input aria-label="change blue" type="number" .value="${this.rgb.b}" min="0" max="255" step="1" data-scheme="rgb", data-key="b" @input="${this._handleInput}"></label>
            <label ?hidden="${this.no_alpha=="true"}" data-name="%"><input aria-label="change alpha" type="number" .value="${Math.round(100*this.alpha)}" min="0" max="100" step="1" data-scheme="alpha" @input="${this._handleAlphaInput}"></label>
          </div>

          <div ?hidden="${this.selectedFormat!=="hex"}" class="color-input">
            <label data-name="#"><input aria-label="change hex" type="text" .value="${this.hex}" data-scheme="hex" maxlength="6" @change="${this._handleInput}" @input="${t=>t.stopPropagation()}"></label>
            <label ?hidden="${this.no_alpha=="true"}" data-name="%"><input aria-label="change alpha" type="number" .value="${Math.round(100*this.alpha)}" min="0" max="100" step="1" data-scheme="alpha" @input="${this._handleAlphaInput}"></label>
          </div>

          <div ?hidden="${this.selectedFormat!=="hex8"}" class="color-input">
          <label data-name="#"><input aria-label="change hex8" type="text" .value="${this.hex8}" data-scheme="hex8" maxlength="8" @change="${this._handleInput}" @input="${t=>t.stopPropagation()}"></label>
          </div>

        </section>
      </div>
    `}_handleInput(t){t.stopPropagation();const e=t.target.dataset.scheme,r=t.target.dataset.key,n=t.target.value;let s=this[e];r?s[r]=Math.round(n):s=n,this.value=s}_handleHueSliderInput(t){this._handleInput(t),this.propertyChangedCallback("value")}_handleAlphaSliderInput(t){t.stopPropagation(),this.alpha=t.target.value/100}_handleAlphaInput(t){t.stopPropagation(),this.alpha=t.target.value/100}_handleSelectChange(t){this.selectedFormat=t.target.value}_handleMouseup(){this._pointerDown=!1}_handleMousemove(t){if(!this._pointerDown)return;const{x:e,y:r}=this.getBoundingClientRect(),n=Math.round(t.clientX-e),s=Math.round(t.clientY-r),l=Math.min(Math.max(n/this._$grid.offsetWidth,0),1),h=1-Math.min(Math.max(s/this._$grid.offsetHeight,0),1);this.selectedFormat==="hsl"?this.value={...this.color.toHsl(),s:l,l:h}:this.value={...this.color.toHsv(),s:l,v:h}}_handleMousedown(t){this._pointerDown=!0,this._handleMousemove(t)}_handleGridKeydown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].indexOf(t.key)===-1)return;t.preventDefault();const e=this.color.toHsl(),r=this.color.toHsv();return t.key.indexOf()&&t.key==="ArrowLeft"?this.value=this.selectedFormat==="hsl"?{...e,s:e.s-.01}:{...r,s:r.s-.01}:t.key==="ArrowRight"?this.value=this.selectedFormat==="hsl"?{...e,s:e.s+.01}:{...r,s:r.s+.01}:t.key==="ArrowUp"?this.value=this.selectedFormat==="hsl"?{...e,l:e.l+.01}:{...r,v:r.v+.01}:t.key==="ArrowDown"?this.value=this.selectedFormat==="hsl"?{...e,l:e.l-.01}:{...r,v:r.v-.01}:t.key==="Home"?this.value=this.selectedFormat==="hsl"?{...e,s:e.s-.1}:{...r,s:r.s-.1}:t.key==="End"?this.value=this.selectedFormat==="hsl"?{...e,s:e.s+.1}:{...r,s:r.s+.1}:t.key==="PageUp"?this.value=this.selectedFormat==="hsl"?{...e,l:e.l+.1}:{...r,v:r.v+.1}:t.key==="PageDown"?this.value=this.selectedFormat==="hsl"?{...e,l:e.l-.1}:{...r,v:r.v-.1}:void 0}_valueChanged(){this._setGridThumbPosition(),this._setHighlightColors(),this._setColorSteelColor(),this._setAlphaSliderBackground()}_setColorSteelColor(){this._$container&&this._setCSSProperty("background",this.color.toRgbString(),this._$colorSteel.querySelector(".inner"))}_setAlphaSliderBackground(){this._$container&&this._setCSSProperty("--color-picker-alpha-slider-background",this._alphaSliderBackground,this._$container)}get _gridBackground(){return new T({h:this.shadowRoot.querySelector("#hueInput").value,s:1,v:1}).toRgbString()}get _alphaSliderBackground(){const t=new T(this.value);return`linear-gradient(to right, ${t.setAlpha(0).toRgbString()} 0%, ${t.setAlpha(1).toRgbString()} 100%)`}_formatsChanged(){this.formats.indexOf(this.selectedFormat)===-1&&(this.selectedFormat=this.formats[0])}_noAlphaChanged(){this.no_alpha=this.getAttribute("no_alpha")}_selectedFormatChanged(){this._setCSSProperty("background",this._gridGradient,this._$grid.querySelector(".overlay")),this._setGridThumbPosition()}_notifyChanges(){if(this._pointerDown||this._sliderDown)return this._dispatchValue("input");this._dispatchValue("change")}_dispatchValue(t){this.dispatchEvent(new CustomEvent(t,{detail:{value:this.value}}))}_setGridThumbPosition(){if(!this._$grid)return;const t=this.selectedFormat==="hsl"?this.hsl.s:this.hsv.s,e=this.selectedFormat==="hsl"?this.hsl.l:this.hsv.v,r=this._$grid.offsetWidth*t,n=this._$grid.offsetHeight*(1-e);this._setCSSProperty("transform",`translate(${r}px, ${n}px)`,this._$grid.querySelector(".thumb")),this._setCSSProperty("background",this._gridBackground,this._$grid)}_setHighlightColors(){if(!this._$container)return;const t=new T(window.getComputedStyle(this._$container).backgroundColor),e=t.isLight()?"darken":"brighten";this._setCSSProperty("--bg-color--20",t[e]()[e]().toRgbString(),this._$container),this._setCSSProperty("--bg-color--60",t[e]()[e]()[e]()[e]()[e]()[e]().toRgbString(),this._$container)}_setCSSProperty(t,e,r=this){r&&(r.style.setProperty(t,e),window.ShadyCSS&&window.ShadyCSS.styleSubtree(r,{[t]:e}))}get _thumbStyles(){return new wt()._thumbStyles}get _$container(){return this.shadowRoot.querySelector("#container")}get _$grid(){return this.shadowRoot.querySelector("#gridInput")}get _$colorSteel(){return this.shadowRoot.querySelector("#colorSteel")}}window.customElements.define("color-picker",Kt);
