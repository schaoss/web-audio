(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e193c48"],{"0847":function(e,t,i){"use strict";t["a"]=function(e){if("suspended"===e.state&&"ontouchstart"in window){var t=function t(){e.resume().then(function(){document.body.removeEventListener("touchstart",t),document.body.removeEventListener("touchend",t)})};document.body.addEventListener("touchstart",t,!1),document.body.addEventListener("touchend",t,!1)}}},"1b17":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"web-audio-api"}},[i("h1",[e._v("Hello, Web Audio API")]),i("button",{on:{click:e.clickHandler}},[e._v(" Play / Pause ")]),i("button",{on:{click:e.reset}},[e._v(" Reset ")]),i("div",{attrs:{id:"config"}},[i("div",{staticClass:"audio-note"},[e._m(0),i("div",{staticClass:"item"},[i("label",{attrs:{for:"waveType"}},[e._v("type : "),i("span",[e._v(e._s(e.waveType))])]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.waveType,expression:"waveType"}],attrs:{id:"waveType"},on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.waveType=t.target.multiple?i:i[0]},e.changeHandler]}},[i("option",{attrs:{value:"sine",selected:""}},[e._v("sine")]),i("option",{attrs:{value:"square"}},[e._v("square")]),i("option",{attrs:{value:"sawtooth"}},[e._v("sawtooth")]),i("option",{attrs:{value:"triangle"}},[e._v("triangle")])])]),i("div",{staticClass:"item"},[i("label",{attrs:{for:"frequency"}},[e._v("frequency : "),i("span",[e._v(e._s(e.frequency))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.frequency,expression:"frequency"}],attrs:{type:"range",min:"0",max:"4000",step:"1",id:"frequencyRange"},domProps:{value:e.frequency},on:{input:e.changeHandler,__r:function(t){e.frequency=t.target.value}}})]),i("div",{staticClass:"item"},[i("label",{attrs:{for:"detune"}},[e._v("detune : "),i("span",[e._v(e._s(e.detune))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.detune,expression:"detune"}],attrs:{type:"range",min:"-2000",max:"2000",step:"1",vid:"detuneRange"},domProps:{value:e.detune},on:{input:e.changeHandler,__r:function(t){e.detune=t.target.value}}})])]),i("div",{staticClass:"audio-note"},[e._m(1),i("div",{staticClass:"item"},[i("label",{attrs:{for:"volume"}},[e._v("volume : "),i("span",[e._v(e._s(e.volume))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.volume,expression:"volume"}],attrs:{type:"range",min:"0",max:"5",step:"0.1",id:"volumeRange"},domProps:{value:e.volume},on:{input:e.changeHandler,__r:function(t){e.volume=t.target.value}}})])]),i("div",{staticClass:"audio-note"},[e._m(2),i("div",{staticClass:"item"},[i("label",{attrs:{for:"filterType"}},[e._v("filterType : "),i("span",[e._v(e._s(e.filterType))])]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.filterType,expression:"filterType"}],attrs:{id:"filterType"},on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.filterType=t.target.multiple?i:i[0]},e.changeHandler]}},[i("option",{attrs:{value:"allpass",selected:""}},[e._v("allpass")]),i("option",{attrs:{value:"highpass"}},[e._v("highpass")]),i("option",{attrs:{value:"bandpass"}},[e._v("bandpass")]),i("option",{attrs:{value:"lowshelf"}},[e._v("lowshelf")]),i("option",{attrs:{value:"highshelf"}},[e._v("highshelf")]),i("option",{attrs:{value:"peaking"}},[e._v("peaking")]),i("option",{attrs:{value:"notch"}},[e._v("notch")])])]),i("div",{staticClass:"item"},[i("label",{attrs:{for:"filterF"}},[e._v("filterF : "),i("span",[e._v(e._s(e.filterF))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.filterF,expression:"filterF"}],attrs:{type:"range",min:"0",max:"4000",step:"1",id:"filterF"},domProps:{value:e.filterF},on:{input:e.changeHandler,__r:function(t){e.filterF=t.target.value}}})]),i("div",{staticClass:"item"},[i("label",{attrs:{for:"filterQ"}},[e._v("filterQ : "),i("span",[e._v(e._s(e.filterQ))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.filterQ,expression:"filterQ"}],attrs:{type:"range",min:"0.01",max:"1000",step:"0.01",id:"filterQ"},domProps:{value:e.filterQ},on:{input:e.changeHandler,__r:function(t){e.filterQ=t.target.value}}})]),i("div",{staticClass:"item"},[i("label",{attrs:{for:"filterGain"}},[e._v("filterGain : "),i("span",[e._v(e._s(e.filterGain))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.filterGain,expression:"filterGain"}],attrs:{type:"range",min:"0",max:"5",step:"0.1",id:"filterGain"},domProps:{value:e.filterGain},on:{input:e.changeHandler,__r:function(t){e.filterGain=t.target.value}}})])])])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("h3",[i("span",[e._v("音源")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("h3",[i("span",[e._v("增益節點")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("h3",[i("span",[e._v("濾波器節點")])])}],s=(i("cadf"),i("551c"),i("097d"),i("0847")),r={data:function(){var e=window.AudioContext||window.webkitAudioContext,t=new e,i=t.createOscillator(),a=t.createGain(),n=t.createBiquadFilter();return{isPlaying:!1,audioCtx:t,oscillator:i,gainNode:a,filter:n,waveType:"sine",frequency:440,detune:0,volume:1,filterType:"allpass",filterF:"350",filterQ:"1",filterGain:"0"}},methods:{clickHandler:function(){this.isPlaying?this.stop():this.play(),this.isPlaying=!this.isPlaying},changeHandler:function(){this.setNoteConfig()},reset:function(){this.waveType="sine",this.frequency=440,this.detune=0,this.volume=1,this.filterType="allpass",this.filterF=350,this.filterQ=1,this.filterGain=0,this.setNoteConfig()},play:function(){this.filter.connect(this.audioCtx.destination)},stop:function(){this.filter.disconnect(this.audioCtx.destination)},setNoteConfig:function(){this.oscillator.type=this.waveType,this.oscillator.frequency.value=this.frequency,this.oscillator.detune.value=this.detune,this.gainNode.gain.value=this.volume,this.filter.type=this.filterType,this.filter.frequency.value=this.filterF,this.filter.Q.value=this.filterQ,this.filter.gain.value=this.filterGain}},mounted:function(){Object(s["a"])(this.audioCtx),this.setNoteConfig(),this.oscillator.connect(this.gainNode),this.gainNode.connect(this.filter),this.oscillator.start()},beforeDestroy:function(){this.isPlaying&&this.filter.disconnect(this.audioCtx.destination)}},l=r,o=(i("721d"),i("2877")),u=Object(o["a"])(l,a,n,!1,null,"5f237052",null);u.options.__file="WebAudioApi.vue";t["default"]=u.exports},"721d":function(e,t,i){"use strict";var a=i("a751"),n=i.n(a);n.a},a751:function(e,t,i){}}]);
//# sourceMappingURL=chunk-7e193c48.0abe09f6.js.map