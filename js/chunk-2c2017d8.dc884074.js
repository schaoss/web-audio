(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c2017d8"],{"0847":function(e,t,n){"use strict";t["a"]=function(e){if("suspended"===e.state&&"ontouchstart"in window){var t=function t(){e.resume().then(function(){document.body.removeEventListener("touchstart",t),document.body.removeEventListener("touchend",t)})};document.body.addEventListener("touchstart",t,!1),document.body.addEventListener("touchend",t,!1)}}},"7f1f":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"stereo-panner-node"}},[n("h1",[e._v("Stereo Panner Node")]),n("button",{on:{click:e.clickHandler}},[e._v(" Play / Pause ")]),n("button",{on:{click:e.reset}},[e._v(" Reset ")]),n("div",{attrs:{id:"config"}},[n("div",{staticClass:"audio-note"},[e._m(0),n("div",{staticClass:"item"},[n("label",{attrs:{for:"waveType"}},[e._v("type : "),n("span",[e._v(e._s(e.waveType))])]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.waveType,expression:"waveType"}],attrs:{id:"waveType"},on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.waveType=t.target.multiple?n:n[0]},e.changeHandler]}},[n("option",{attrs:{value:"sine",selected:""}},[e._v("sine")]),n("option",{attrs:{value:"square"}},[e._v("square")]),n("option",{attrs:{value:"sawtooth"}},[e._v("sawtooth")]),n("option",{attrs:{value:"triangle"}},[e._v("triangle")])])]),n("div",{staticClass:"item"},[n("label",{attrs:{for:"frequency"}},[e._v("frequency : "),n("span",[e._v(e._s(e.frequency))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.frequency,expression:"frequency"}],attrs:{type:"range",min:"0",max:"4000",step:"1",id:"frequencyRange"},domProps:{value:e.frequency},on:{input:e.changeHandler,__r:function(t){e.frequency=t.target.value}}})]),n("div",{staticClass:"item"},[n("label",{attrs:{for:"detune"}},[e._v("detune : "),n("span",[e._v(e._s(e.detune))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.detune,expression:"detune"}],attrs:{type:"range",min:"-2000",max:"2000",step:"1",vid:"detuneRange"},domProps:{value:e.detune},on:{input:e.changeHandler,__r:function(t){e.detune=t.target.value}}})])]),n("div",{staticClass:"audio-note"},[e._m(1),n("div",{staticClass:"item"},[n("label",{attrs:{for:"volume"}},[e._v("volume : "),n("span",[e._v(e._s(e.volume))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.volume,expression:"volume"}],attrs:{type:"range",min:"0",max:"5",step:"0.1",id:"volumeRange"},domProps:{value:e.volume},on:{input:e.changeHandler,__r:function(t){e.volume=t.target.value}}})])]),n("div",{staticClass:"audio-note"},[e._m(2),n("div",{staticClass:"item"},[n("label",{attrs:{for:"pan"}},[e._v("pan : "),n("span",[e._v(e._s(e.pan))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.pan,expression:"pan"}],attrs:{type:"range",min:"-1",max:"1",step:"0.01",id:"pan"},domProps:{value:e.pan},on:{input:e.changeHandler,__r:function(t){e.pan=t.target.value}}})])])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",[n("span",[e._v("音源")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",[n("span",[e._v("增益節點")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",[n("span",[e._v("雙聲道節點")])])}],s=(n("cadf"),n("551c"),n("097d"),n("0847")),o={data:function(){var e=window.AudioContext||window.webkitAudioContext,t=new e,n=t.createOscillator(),a=t.createGain(),i=t.createStereoPanner();return{isPlaying:!1,audioCtx:t,oscillator:n,gainNode:a,stereoPanner:i,waveType:"sine",frequency:440,detune:0,volume:1,pan:0}},methods:{clickHandler:function(){this.isPlaying?this.stop():this.play(),this.isPlaying=!this.isPlaying},changeHandler:function(){this.setNoteConfig()},reset:function(){this.waveType="sine",this.frequency=440,this.detune=0,this.volume=1,this.pan=0,this.setNoteConfig()},play:function(){this.stereoPanner.connect(this.audioCtx.destination)},stop:function(){this.stereoPanner.disconnect(this.audioCtx.destination)},setNoteConfig:function(){this.oscillator.type=this.waveType,this.oscillator.frequency.value=this.frequency,this.oscillator.detune.value=this.detune,this.gainNode.gain.value=this.volume,this.stereoPanner.pan.value=this.pan}},mounted:function(){Object(s["a"])(this.audioCtx),this.setNoteConfig(),this.oscillator.connect(this.gainNode),this.gainNode.connect(this.stereoPanner),this.oscillator.start()},beforeDestroy:function(){this.isPlaying&&this.stereoPanner.disconnect(this.audioCtx.destination)}},r=o,u=(n("c696"),n("2877")),c=Object(u["a"])(r,a,i,!1,null,"3d483b2e",null);c.options.__file="StereoPannerNode.vue";t["default"]=c.exports},"7fc1":function(e,t,n){},c696:function(e,t,n){"use strict";var a=n("7fc1"),i=n.n(a);i.a}}]);
//# sourceMappingURL=chunk-2c2017d8.dc884074.js.map