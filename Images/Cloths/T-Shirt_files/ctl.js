!function k(e,t,n){function o(r,i){if(!t[r]){if(!e[r]){var s="function"==typeof require&&require;if(!i&&s)return s(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=t[r]={exports:{}};e[r][0].call(c.exports,function(t){var n=e[r][1][t];return o(n?n:t)},c,c.exports,k,e,t,n)}return t[r].exports}for(var a="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(e,t,n){var o=0,a=1,r=2;function i(e){return this instanceof i?(this._state=o,this._onFulfilled=[],this._onRejected=[],this._value=null,this._reason=null,d(e)&&e(l(this.resolve,this),l(this.reject,this)),void 0):new i(e)}function s(e,t){if(e===t)return e.reject(new TypeError("A promise cannot be resolved with itself.")),void 0;if(u(t))try{t.then(function(t){s(e,t)},function(t){e.reject(t)})}catch(n){e.reject(n)}else e.resolve(t)}function c(e,t,n){return function(o){if(d(t))try{var a=t(o);s(e,a)}catch(r){e.reject(r)}else e[n](o)}}i.prototype={constructor:i,then:function(e,t){var n=new i;return this._onFulfilled.push(c(n,e,"resolve")),this._onRejected.push(c(n,t,"reject")),this.flush(),n},flush:function(){var e=this._state;if(e!==o){var t=e===a?this._onFulfilled.slice():this._onRejected.slice(),n=e===a?this._value:this._reason;setTimeout(function(){m(t,function(e){try{e(n)}catch(t){}})},0),this._onFulfilled=[],this._onRejected=[]}},resolve:function(e){this._state===o&&(this._state=a,this._value=e,this.flush())},reject:function(e){this._state===o&&(this._state=r,this._reason=e,this.flush())},always:function(e){return this.then(e,e)}},i.defer=function(){var e={};return e.promise=new i(function(t,n){e.resolve=t,e.reject=n}),e},i.all=function(e){var t=i.defer(),n=e.length,o=[];return m(e,function(e,a){e.then(function(e){o[a]=e,n--,0===n&&t.resolve(o)},function(e){t.reject(e)})}),t.promise};function u(e){return e&&d(e.then)}function l(e,t){var n=[].slice,o=n.call(arguments,2),a=function(){},r=function(){return e.apply(this instanceof a?this:t,o.concat(n.call(arguments)))};return a.prototype=e.prototype,r.prototype=new a,r}var d=f("Function");function f(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function m(e,t){for(var n=0,o=e.length;o>n;n++)t(e[n],n)}t.exports=i},{}],2:[function(e,t,n){var o=e("./util"),a={SendMethod:8,LogVal:"collinaua",Token:(new Date).getTime()+":"+Math.random(),MaxMCLog:10,MaxKSLog:10,MaxMPLog:10,MaxTCLog:10,MaxFocusLog:1,Sync:!0},r=".alicdn.com",i="g"+r,s="af"+r,c="aeis"+r,u="aeu"+r,l={cn:{umid:i,uac:s},us:{umid:c,uac:u},aliapp:{umid:c,uac:u},usaliapp:{umid:c,uac:u},"in":{umid:c,uac:u},sg:{umid:c,uac:u},lazada:{umid:c,uac:u}},d=f().getAttribute("data-env")||"cn";function f(){for(var e=document.getElementsByTagName("script"),t=/ctlv?\.js/,n,o=0;o<e.length;o++)if(n=m(e[o]),t.test(n))return e[o];return e[e.length-1]}function m(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}t.exports={env:d,url:l[d],map:{def:o.extend({Flag:1670350},a),pc:o.extend({Flag:97422},a),h5:o.extend({Flag:1670350},a)}}},{"./util":5}],3:[function(e,t,n){t.exports=function(e){var t=[],n,o=!1,a=document,r=a.documentElement,i=r.doScroll,s="DOMContentLoaded",c="addEventListener",u="onreadystatechange",l="readyState",d=i?/^loaded|^c/:/^loaded|c/,f=d.test(a[l]);function m(e){for(f=1;e=t.shift();)e()}return a[c]&&a[c](s,n=function(){a.removeEventListener(s,n,o),m()},o),i&&a.attachEvent(u,n=function(){/^c/.test(a[l])&&(a.detachEvent(u,n),m())}),e=i?function(n){self!=top?f?n():t.push(n):function(){try{r.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){f?e():t.push(e)}}()},{}],4:[function(e,t,n){var o=e("./Promise"),a=e("./config"),r=e("./util"),i=e("./domready"),s=window,c=s.ctl,u=s.UA_Opt=s.UA_Opt||{},l=s.ctl={noConflict:function(){return s.ctl===l&&(s.ctl=c),l},config:function(e,t){return s.UA_Opt&&s.UA_Opt.LogVal?void 0:(u=s.UA_Opt=s.UA_Opt||{},t||(t=e,e="def"),e=(e+"").toLowerCase(),t=r.extend(u,a.map[e]||a.map.def,t||{}),u.LogVal&&(s[u.LogVal]=""),t)},getUA:function(){u=s.UA_Opt=s.UA_Opt||{};var e=u.Token;u.Token=(new Date).getTime()+":"+Math.random();var t=A();return u.Token=e,u.reload&&u.reload(),t},getUmidToken:function(){try{return umx.getToken()}catch(e){return""}},getUmidInstance:function(){return b},ready:function(e,t){return g.promise.then(e,t),g.promise}};l.config();var d=null,f=o.defer(),m=o.defer(),p=f.promise,h=m.promise;!function(e,t){var n=1e4,g_moduleConfig={uabModule:{grey:["AWSC/uab/1.140.0/collina.js"],stable:["AWSC/uab/1.140.0/collina.js"],greyBr:["AWSC-br/uab/1.140.0/collina.js"],stableBr:["AWSC-br/uab/1.140.0/collina.js"],ratio:10000,greyConfig:{},stableConfig:{}},fyModule:{grey:["AWSC/fireyejs/1.226.0/fireyejs.js"],stable:["AWSC/fireyejs/1.226.0/fireyejs.js"],greyBr:["AWSC-br/fireyejs/1.226.0/fireyejs.js"],stableBr:["AWSC-br/fireyejs/1.226.0/fireyejs.js"],ratio:10000,greyConfig:{},stableConfig:{}},nsModule:{grey:["js/nc/60.js"],stable:["js/nc/60.js"],ratio:1e4,greyConfig:{},stableConfig:{}},umidPCModule:{grey:["AWSC/WebUMID/1.93.0/um.js"],stable:["AWSC/WebUMID/1.93.0/um.js"],greyBr:["AWSC-br/WebUMID/1.93.0/um.js"],stableBr:["AWSC-br/WebUMID/1.93.0/um.js"],ratio:10000,greyConfig:{},stableConfig:{}},etModule:{grey:["AWSC/et/1.70.4/et_f.js","AWSC/et/1.70.4/et_n.js"],stable:["AWSC/et/1.70.2/et_f.js","AWSC/et/1.70.2/et_n.js"],greyBr:["AWSC-br/et/1.72.0/et_f.js","AWSC-br/et/1.72.1/et_n.js"],stableBr:["AWSC-br/et/1.71.0/et_f.js","AWSC-br/et/1.71.1/et_n.js"],ratio:9999,greyConfig:{"whitelist":["taobao","alibaba.com","alipay.com","tmall.com","lazada","aliexpress","1688.com","alimama.com","tb.cn","xiami.com","amap.com","cainiao.com","aliyun.com","etao.com","fliggy.com","liangxinyao.com","damai.cn","daraz","tmall.hk","jiyoujia.com","taopiaopiao.com","alitrip.com","fliggy.hk","alihealth.cn","alitrip.hk","ele.me","gaode","mp.dfkhgj.com","mp.bcvbw.com","m.dfkhgj.com","pailitao.com","youku.com","jiaoyimao","sm.cn","dingtalk.com","guoguo-app","kaola","alicdn","soku","koubei.com"]},stableConfig:{"whitelist":["taobao","alibaba.com","alipay.com","tmall.com","lazada","aliexpress","1688.com","alimama.com","tb.cn","xiami.com","amap.com","cainiao.com","aliyun.com","etao.com","fliggy.com","liangxinyao.com","damai.cn","daraz","tmall.hk","jiyoujia.com","taopiaopiao.com","alitrip.com","fliggy.hk","alihealth.cn","alitrip.hk","ele.me","gaode","mp.dfkhgj.com","mp.bcvbw.com","m.dfkhgj.com","pailitao.com","youku.com","jiaoyimao","sm.cn","dingtalk.com","guoguo-app","kaola","alicdn","soku","koubei.com"]}},ncModule:{grey:["AWSC/nc/1.92.1/nc.js"],stable:["AWSC/nc/1.92.1/nc.js"],ratio:10000,greyConfig:{},stableConfig:{}}},o=[{name:"umidPCModule",features:["umpc","um","umh5"],depends:[],sync:!1},{name:"uabModule",features:["uab"],depends:[],sync:!1},{name:"fyModule",features:["fy"],depends:[],sync:!1},{name:"nsModule",features:["ns"],depends:[],sync:!1},{name:"etModule",features:["et"],depends:[],sync:!1},{name:"ncModule",features:["nc","nvc","ic"],depends:["fy"],sync:!1}],a=navigator.userAgent,r=a.match(/Chrome\/(\d*)/);r&&(r=+r[1]);var i=a.match(/Edge\/([\d]*)/),s=a.match(/Safari\/([\d]*)/),c=a.match(/Firefox\/([\d]*)/),u=a.match(/MSIE|Trident/);function l(){var e="function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D";return"WebkitAppearance"in document.documentElement.style&&escape(navigator.javaEnabled.toString())===e?!0:!1}function d(t,o){var a="AWSC_SPECIFY_"+t.toUpperCase()+"_ADDRESSES";if(e[a])return e[a];var d={normalAddresses:[],brAddresses:[]};for(var f in g_moduleConfig)if(g_moduleConfig.hasOwnProperty(f)&&f===t){var m=g_moduleConfig[f],p=Math.ceil(Math.random()*n)<=m.ratio;d.normalAddresses=p?m.grey.slice():m.stable.slice(),m.stableBr&&m.greyBr&&(d.brAddresses=p?m.greyBr.slice():m.stableBr.slice()),"etModule"===t&&(i?(d.normalAddresses.pop(),d.brAddresses.pop()):r?(d.normalAddresses.pop(),d.brAddresses.pop()):s||c||u?(d.normalAddresses.shift(),d.brAddresses.shift()):l()?(d.normalAddresses.pop(),d.brAddresses.pop()):(d.normalAddresses.shift(),d.brAddresses.shift()));for(var h=0;h<d.normalAddresses.length;h++){var g=o?"https://"+o+"/":A;("https://assets.alicdn.com/"===g||"https://lzd-g.slatic.net/"===g||"https://g.lazcdn.com/"===g)&&(g+="g/"),d.normalAddresses[h]=g+d.normalAddresses[h],d.brAddresses[h]&&(d.brAddresses[h]=g+d.brAddresses[h])}return d}}var f=[],m="loading",p="loaded",h="timeout",g="unexpected",b="no such feature",v=new RegExp("^([\\w\\d+.-]+:)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(\\?[^#]*)?(#.*)?$"),A=y(_());function y(e){var t="https://g.alicdn.com/";if(!e)return t;if(/aliexpress/.test(location.href))return"https://aeis.alicdn.com/";var n=v.exec(e);return n?"https://"+n[3]+(n[4]?":"+n[4]:"")+"/":t}function _(){for(var e=document.getElementsByTagName("script"),t=0;t<e.length;t++){var n=e[t],o=n.hasAttribute?n.src:n.getAttribute("src",4);if(/\/awsc\.js/.test(o))return o}}function w(e){for(var t=void 0,n=0;n<o.length;n++){for(var a=o[n],r=0;r<a.features.length;r++)if(a.features[r]===e){t=a;break}if(t)break}return t}function T(e){for(var t=0;t<f.length;t++){var n=f[t];if(n.name===e)return n}}function C(e){for(var t=void 0,n=0;n<o.length;n++){var a=o[n];if(a.name===e){t=a;break}if(t)break}return t}function k(e,n,o){if(o)for(var a=0;a<e.normalAddresses.length;a++){var r=e.normalAddresses[a];t.write("<script src="+r+"></script>")}else{function i(e,o,a){for(var r=0;r<e.length;r++){var i=e[r],s=t.createElement("script");s.async=!1,s.src=i,s.id=n,s.onerror=o||function(){},s.onload=a||function(){};var c=t.getElementsByTagName("script")[0];c&&c.parentNode?c.parentNode.insertBefore(s,c):(c=t.body||t.head,c&&c.appendChild(s))}}i(e.normalAddresses)}}function S(t,n,o){var a="https://acjs.aliyun.com/error?v="+t+"&e="+encodeURIComponent(n)+"&stack="+encodeURIComponent(o),r=new Image,i="_awsc_img_"+Math.floor(1e6*Math.random());e[i]=r,r.onload=r.onerror=function(){try{delete e[i]}catch(t){e[i]=null}},r.src=a}function j(e,t){Math.random()<1e-4&&S("awsc_state","feature="+e.name+"&state="+e.state+"&href="+encodeURIComponent(location.href));for(var n=void 0;n=e.callbacks.shift();)try{if("function"==typeof n)n(e.state,e.exportObj);else if("object"==typeof n){var o=e.exportObj;o&&"function"==typeof o.init&&o.init(n)}}catch(a){if(t)throw a;S(e.name,a.message,a.stack)}}function x(e,t,n,o){var a=w(e);if(!a)return"function"==typeof t&&t(b),void 0;var r=n&&n.cdn,i=n&&n.sync,s=n&&n.timeout||5e3;if(0!==a.depends.length)for(var c=0;c<a.depends.length;c++){var u=a.depends[c];n&&(delete n.sync,delete n.timeout,delete n.cdn),W(u,void 0,n)}var l=o||{};l.module=a,l.name=e,l.state=m,l.callbacks=l.callbacks||[],l.options=n,t&&l.callbacks.push(t),l.timeoutTimer=setTimeout(function(){l.state=h,j(l,n&&n.throwExceptionInCallback)},s),o||f.push(l);var p=a.sync;i&&(p=i);var g=d(a.name,r);k(g,"AWSC_"+a.name,p)}function W(e,t,n){var o=T(e);if(o)if(o.state===h)x(e,t,n,o);else if(o.state===p){if("function"==typeof t)t(o.state,o.exportObj);else if("object"==typeof t){var a=o.exportObj;a&&"function"==typeof a.init&&a.init(t)}}else o.state===m?t&&o.callbacks.push(t):void 0;else x(e,t,n)}function M(e,t,n){var o=!1;try{var a=C(e);a||void 0,a.moduleLoadStatus=p;for(var r=void 0,i=0;i<f.length;i++){var s=f[i];s.module===a&&s.name===t&&(o=s.options&&s.options.throwExceptionInCallback,r=s,clearTimeout(r.timeoutTimer),delete r.timeoutTimer,r.exportObj=n,s.state===m||s.state===h?(r.state=p,setTimeout(function(){j(r,o)},0)):void 0)}r||(r={},r.module=a,r.name=t,r.state=p,r.exportObj=n,r.callbacks=[],f.push(r))}catch(c){if(o)throw c;S("awsc_error",c.message,c.stack)}}function E(e){e.AWSCFY=function(){},e.AWSC.configFY=function(e,n,o,a){return t(e,n,o,a)},e.AWSC.configFYSync=function(e,n){return t(null,e,n)};function t(t,n,o,a){var r=location.protocol+"//"+location.host+location.pathname,i=new e.AWSCFY;e._umopt_npfp=0;var s=!1;i.umidToken="defaultToken1_um_not_loaded@@"+r+"@@"+(new Date).getTime(),e.AWSC.use("um",function(e,t){"loaded"===e?(i.umidToken="defaultToken3_init_callback_not_called@@"+r+"@@"+(new Date).getTime(),t.init(n,function(e,t){"success"===e?i.umidToken=t.tn:i.umidToken="defaultToken4_init_failed with "+e+"@@"+r+"@@"+(new Date).getTime(),s=!0,l()})):(i.umidToken="defaultToken2_load_failed with "+e+"@@"+r+"@@"+(new Date).getTime(),s=!0,l())});var c=!1;if(i.getUA=function(){return"defaultUA1_uab_not_loaded@@"+r+"@@"+(new Date).getTime()},e.AWSC.use("uab",function(e,t){c=!0,"loaded"===e?(i.uabModule=t,i.uabConfig=o,i.getUA=function(){return this.uabModule.getUA(this.uabConfig)}):i.getUA=function(){return"defaultUA2_load_failed with "+e+"@@"+r+"@@"+(new Date).getTime()},l()}),null!=t)var u=e.setTimeout(function(){l(!0)},a?a:2e3);function l(n){null!=t&&(c&&s||n)&&(t(i),e.clearTimeout(u))}return null==t?i:void 0}}function U(e){var t=function(){};e.AWSC.configFYEx=function(e,t,o){return n(e,t,o)},e.AWSC.configFYSyncEx=function(e){return n(null,e)};function n(n,o,a){var r=(location.protocol+"//"+location.host+location.pathname).substr(0,128),i=new t;if(a=a||5e3,"function"==typeof n)var s=e.setTimeout(function(){c()},a);function c(){"function"==typeof n&&(n(i),e.clearTimeout(s))}return i.getFYToken=i.getUidToken=function(){return"defaultFY1_fyjs_not_loaded@@"+r+"@@"+(new Date).getTime()},e.fyglobalopt=o,e.AWSC.use("fy",function(e,t){"loaded"===e?(i.getFYToken=i.getUidToken=function(){return"defaultFY3_fyjs_not_initialized@@"+r+"@@"+(new Date).getTime()},i.fyObj=t,t.init(o,function(e){i.getFYToken=function(){return this.fyObj.getFYToken(o)},i.getUidToken=function(){return this.fyObj.getUidToken(o)},c()})):(i.getFYToken=i.getUidToken=function(){return"defaultFY2_load_failed with "+e+"@@"+r+"@@"+(new Date).getTime()},c())},{timeout:a}),"function"==typeof n?void 0:i}}function F(e){var t=g_moduleConfig.etModule,o=Math.ceil(Math.random()*n)<=t.ratio,a=o?t.greyConfig.whitelist:t.stableConfig.whitelist,r=new RegExp(("^"+a.join("$|^")+"$").replace(/\*/g,".*"));r.test(location.host+location.pathname)&&(window.etrprtrt=.01,e.__etModule||e.AWSC.use("et"))}function Y(e){e.AWSC||(e.AWSC={},e.AWSC.use=W,e.AWSCInner={},e.AWSCInner.register=M,E(e),U(e),F(e))}Y(e)}(window,document),s.AWSC.use("uab",function(e,t){"loaded"===e&&(d=t,f.resolve())},{cdn:a.url.uac}),s.AWSC.use("um",function(e,t){"loaded"===e&&m.resolve()},{cdn:a.url.umid});var g=o.defer(),b=null,v=o.defer();h.then(function(){void 0;var e=document.getElementById("_umfp");b=umx.init({serviceLocation:a.env,appName:"ctl",containers:{flash:e,dcp:e},callback:function(){void 0,v.resolve()}})}),i(function(){var e=h;"lazada"===a.env&&(e=v.promise),o.all([p,e]).then(function(){t();var e=setInterval(t,50);g.promise.always(function(){clearInterval(e)})},function(){g.reject()}),setTimeout(function(){s.umx?d||g.reject():g.reject()},3e3);function t(){d&&g.resolve()}});function A(){var e=s.UA_Opt||u;return e.LogVal?s[e.LogVal]||"":""}},{"./Promise":1,"./config":2,"./domready":3,"./util":5}],5:[function(e,t,n){t.exports={extend:function(e){for(var t=[].slice.call(arguments),n=t.length,o,a,r=1;n>r;r++){o=t[r];for(a in o)o.hasOwnProperty(a)&&("Flag"===a&&e[a]?e[a]=e[a]|o[a]:e[a]=o[a])}return e}}},{}]},{},[4]);