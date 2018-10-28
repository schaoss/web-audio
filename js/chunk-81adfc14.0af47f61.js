(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81adfc14"],{"063b":function(e,t,n){"use strict";var i=n("749b"),a=n.n(i);a.a},"0847":function(e,t,n){"use strict";t["a"]=function(e){if("suspended"===e.state&&"ontouchstart"in window){var t=function t(){e.resume().then(function(){document.body.removeEventListener("touchstart",t),document.body.removeEventListener("touchend",t)})};document.body.addEventListener("touchstart",t,!1),document.body.addEventListener("touchend",t,!1)}}},"5d39":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"panner-node"}},[n("h1",[e._v("Panner Node")]),n("button",{on:{click:e.clickHandler}},[e._v(" Play / Pause ")]),n("button",{on:{click:e.reset}},[e._v(" Reset ")]),n("div",{attrs:{id:"config"}},[n("div",{staticClass:"audio-note"},[e._m(0),n("div",{staticClass:"item"},[n("label",{attrs:{for:"frequency"}},[e._v("frequency : "),n("span",[e._v(e._s(e.frequency))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.frequency,expression:"frequency"}],attrs:{type:"range",min:"0",max:"1960",step:"1",id:"frequencyRange"},domProps:{value:e.frequency},on:{input:e.changeHandler,__r:function(t){e.frequency=t.target.value}}})])]),n("div",{staticClass:"audio-note"},[e._m(1),n("div",{staticClass:"item"},[n("label",{attrs:{for:"volume"}},[e._v("volume : "),n("span",[e._v(e._s(e.volume))])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.volume,expression:"volume"}],attrs:{type:"range",min:"0",max:"5",step:"0.1",id:"volumeRange"},domProps:{value:e.volume},on:{input:e.changeHandler,__r:function(t){e.volume=t.target.value}}})])])]),n("div",e._g({attrs:{id:"drag-area","data-role":"drag-drop-container"}},e.dragEvent),[n("div",{style:{left:this.dragData.listener.x+"px",top:this.dragData.listener.y+"px"},attrs:{id:"listener"}},[e._v(" 聽者 ")]),n("div",{style:{left:this.dragData.source.x+"px",top:this.dragData.source.y+"px"},attrs:{id:"source"}},[e._v(" 音源 ")])])])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",[n("span",[e._v("音源")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",[n("span",[e._v("增益節點")])])}],o=n("0847"),r={data:function(){var e=window.AudioContext||window.webkitAudioContext,t=new e,n=t.createOscillator(),i=t.createGain(),a=t.createPanner(),o=t.listener;return{isPlaying:!1,audioCtx:t,oscillator:n,gainNode:i,panner:a,listener:o,waveType:"triangle",frequency:440,detune:0,volume:1,draggingElem:"",dragData:{listener:{x:0,y:0},source:{x:0,y:0}}}},methods:{clickHandler:function(){this.isPlaying?this.stop():this.play(),this.isPlaying=!this.isPlaying},changeHandler:function(){this.setNoteConfig()},reset:function(){this.frequency=440,this.volume=1,this.dragData={listener:{x:window.innerWidth/2+20,y:window.innerHeight/2-50},source:{x:window.innerWidth/2-20,y:window.innerHeight/2+50}},this.setNoteConfig()},play:function(){this.panner.connect(this.audioCtx.destination)},stop:function(){this.panner.disconnect(this.audioCtx.destination)},setNoteConfig:function(){this.oscillator.type=this.waveType,this.oscillator.frequency.value=this.frequency,this.oscillator.detune.value=this.detune,this.gainNode.gain.value=this.volume,this.panner.setPosition(this.dragData.source.x,this.dragData.source.y,1),this.listener.setPosition(this.dragData.listener.x,this.dragData.listener.y,0)}},computed:{dragEvent:function(){var e=this;return{mousedown:function(t){var n=t.target.id;"source"!==n&&"listener"!==n||(e.draggingElem=t.target.id)},mousemove:function(t){e.draggingElem&&(e.dragData[e.draggingElem].x=t.clientX-25,e.dragData[e.draggingElem].y=t.clientY-25,e.setNoteConfig(),t.preventDefault())},mouseup:function(){e.draggingElem=""},touchstart:function(t){var n=t.target.id;"source"!==n&&"listener"!==n||(e.draggingElem=t.target.id)},touchmove:function(t){e.draggingElem&&(e.dragData[e.draggingElem].x=t.touches[0].pageX-25,e.dragData[e.draggingElem].y=t.touches[0].pageY-25,e.setNoteConfig(),t.preventDefault())},touchend:function(){e.draggingElem=""}}}},mounted:function(){Object(o["a"])(this.audioCtx),this.dragData={listener:{x:window.innerWidth/2+20,y:window.innerHeight/2-50},source:{x:window.innerWidth/2-20,y:window.innerHeight/2+50}},this.setNoteConfig(),this.panner.rolloffFactor=.1,this.oscillator.connect(this.gainNode),this.gainNode.connect(this.panner),this.oscillator.start()},beforeDestroy:function(){this.isPlaying&&this.panner.disconnect(this.audioCtx.destination)}},s=r,d=(n("063b"),n("2877")),u=Object(d["a"])(s,i,a,!1,null,"56de157e",null);u.options.__file="PannerNode.vue";t["default"]=u.exports},"749b":function(e,t,n){}}]);
//# sourceMappingURL=chunk-81adfc14.0af47f61.js.map