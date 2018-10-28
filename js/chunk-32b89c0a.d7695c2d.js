(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32b89c0a"],{"0847":function(t,e,n){"use strict";e["a"]=function(t){if("suspended"===t.state&&"ontouchstart"in window){var e=function e(){t.resume().then(function(){document.body.removeEventListener("touchstart",e),document.body.removeEventListener("touchend",e)})};document.body.addEventListener("touchstart",e,!1),document.body.addEventListener("touchend",e,!1)}}},"0d6e":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"guitar-tuner"}},[n("h1",[t._v(" Guitar Tuner ")]),n("button",{on:{click:t.playHandler}},[t._v(" Play / Pause ")]),n("button",{on:{click:t.reset}},[t._v(" Reset ")]),n("div",{attrs:{id:"config"}},[n("div",{staticClass:"audio-note"},[t._m(0),n("div",{staticClass:"item"},[n("label",{attrs:{for:"standardA4"}},[t._v("A4 : "),n("span",[t._v(t._s(t.standardA4))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.standardA4,expression:"standardA4"}],attrs:{type:"range",min:"430",max:"450",step:"1",id:"standardA4Range"},domProps:{value:t.standardA4},on:{input:t.changeConfigHandler,__r:function(e){t.standardA4=e.target.value}}})]),n("div",{staticClass:"item"},[t._m(1),n("select",{directives:[{name:"model",rawName:"v-model",value:t.tuning,expression:"tuning"}],attrs:{id:"tuning"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.tuning=e.target.multiple?n:n[0]},t.changeTuningHandler]}},[n("option",{attrs:{value:"standard",selected:""}},[t._v("標準")]),n("option",{attrs:{value:"1-step-down"}},[t._v("降全音")]),n("option",{attrs:{value:"drop-d"}},[t._v("Drop D")]),n("option",{attrs:{value:"open-e"}},[t._v("Open E")]),n("option",{attrs:{value:"open-d"}},[t._v("Open D")])])]),n("div",{staticClass:"item"},[n("label",{attrs:{for:"volume"}},[t._v("volume : "),n("span",[t._v(t._s(t.volume))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.volume,expression:"volume"}],attrs:{type:"range",min:"0",max:"5",step:"0.1",id:"volumeRange"},domProps:{value:t.volume},on:{input:t.changeConfigHandler,__r:function(e){t.volume=e.target.value}}})])])]),n("div",{attrs:{id:"notes"}},t._l(t.noteArr,function(e){return n("div",{key:e,staticClass:"note",on:{click:function(n){t.changeNoteHandler(e)}}},[t._v(t._s(e))])})),n("div",{attrs:{id:"display"}},[n("h1",[t._v(t._s(t.note))])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",[n("span",[t._v("設定")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{attrs:{for:"tuning"}},[t._v("調弦法 : "),n("span")])}],o=n("0847"),s={name:"GuitarTuner",data:function(){var t=window.AudioContext||window.webkitAudioContext,e=new t,n=e.createOscillator(),i=e.createGain();return{isPlaying:!1,audioCtx:e,oscillator:n,gainNode:i,waveType:"triangle",frequency:440,detune:0,volume:1,standardA4:440,tuning:"standard",noteArr:["E2","A2","D3","G3","B3","E4"],note:"-"}},methods:{playHandler:function(){this.isPlaying?(this.stop(),this.note="-"):(this.changeNoteHandler(this.noteArr[0]),this.play()),this.isPlaying=!this.isPlaying},changeTuningHandler:function(){this.noteArr=this.getTuningNoteArr(this.tuning)},changeNoteHandler:function(t){this.note=t,this.frequency=this.getFrequency(this.getSemitone(t)),this.setNoteConfig()},changeConfigHandler:function(){this.frequency=this.getFrequency(this.getSemitone(this.note)),this.setNoteConfig()},reset:function(){this.waveType="triangle",this.standardA4=440,this.detune=0,this.volume=1,this.setNoteConfig()},play:function(){this.gainNode.connect(this.audioCtx.destination)},stop:function(){this.gainNode.disconnect(this.audioCtx.destination)},setNoteConfig:function(){this.oscillator.type=this.waveType,this.oscillator.frequency.value=this.frequency,this.oscillator.detune.value=this.detune,this.gainNode.gain.value=this.volume},getSemitone:function(t){if(!t||"-"===t)return 69;var e={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11};return e[t.slice(0,-1)]+12*(1+parseInt(t.slice(-1)))},getFrequency:function(t){return this.standardA4*Math.pow(2,(t-69)/12)},getTuningNoteArr:function(){var t={standard:["E2","A2","D3","G3","B3","E4"],"1-step-down":["D2","G2","C3","F3","A3","D4"],"drop-d":["D2","A2","D3","G3","B3","E4"],"open-e":["E2","B2","E3","G#3","B3","E4"],"open-d":["D2","A2","D3","F#3","A3","D4"]};return t[this.tuning]}},mounted:function(){Object(o["a"])(this.audioCtx),this.setNoteConfig(),this.oscillator.connect(this.gainNode),this.oscillator.start()},beforeDestroy:function(){this.isPlaying&&this.gainNode.disconnect(this.audioCtx.destination)}},r=s,u=(n("1176"),n("2877")),d=Object(u["a"])(r,i,a,!1,null,"248e6caa",null);d.options.__file="GuitarTuner.vue";e["default"]=d.exports},1176:function(t,e,n){"use strict";var i=n("3347"),a=n.n(i);a.a},3347:function(t,e,n){}}]);
//# sourceMappingURL=chunk-32b89c0a.d7695c2d.js.map