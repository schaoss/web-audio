(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-daa66b10"],{"5cc6":function(t,i,e){var a=e("74e8");a("Uint8",(function(t){return function(i,e,a){return t(this,i,e,a)}}))},"707a":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"analyser"}},[e("h1",[t._v("Analyser")]),e("button",{on:{click:t.clickHandler}},[t._v(" Play / Pause ")]),e("button",{on:{click:t.muteHandler}},[t._v(" "+t._s(t.isMute?"unmute":"mute")+" ")]),e("div",{attrs:{id:"config"}},[e("div",{staticClass:"audio-note"},[e("div",{staticClass:"result"},t._l(512,(function(i){return e("div",{key:i,staticClass:"fftData",style:{height:t.fftArray[i-1]+2+"px"}})})),0)])])])},n=[],s=(e("ace4"),e("d3b7"),e("5cc6"),e("9a8c"),e("a975"),e("735e"),e("c1ac"),e("d139"),e("3a7b"),e("d5d6"),e("82f8"),e("e91f"),e("60bd"),e("5f96"),e("3280"),e("3fcc"),e("ca91"),e("25a1"),e("cd26"),e("3c5d"),e("2954"),e("649e"),e("219c"),e("170b"),e("b39a"),e("72f7"),e("0847")),c={name:"Analyser",data:function(){var t=window.AudioContext||window.webkitAudioContext,i=new t,e=i.createGain(),a=i.createAnalyser();return e.gain.value=1,a.fftSize=1024,a.connect(e),{isPlaying:!1,isMute:!1,source:null,audioCtx:i,gainNode:e,analyser:a,micStream:null,fftArray:new Uint8Array(a.fftSize)}},methods:{clickHandler:function(){this.isPlaying?this.stop():this.play()},muteHandler:function(){this.isMute?(this.isMute=!1,this.gainNode.gain.value=1):(this.isMute=!0,this.gainNode.gain.value=0)},play:function(){this.isPlaying=!0,this.gainNode.connect(this.audioCtx.destination),requestAnimationFrame(this.getFFTData)},stop:function(){this.isPlaying=!1,this.gainNode.disconnect(this.audioCtx.destination)},getUserMic:function(t){this.micStream=t,this.source=this.audioCtx.createMediaStreamSource(t),this.source.connect(this.analyser)},getFFTData:function(){this.fftArray=new Uint8Array(this.analyser.fftSize),this.analyser.getByteFrequencyData(this.fftArray),this.isPlaying&&requestAnimationFrame(this.getFFTData)}},mounted:function(){Object(s["a"])(this.audioCtx),navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(this.getUserMic).catch((function(t){return console.log(t)}))},beforeDestroy:function(){this.micStream&&this.micStream.getAudioTracks()[0].stop()}},r=c,o=(e("aa72"),e("2877")),u=Object(o["a"])(r,a,n,!1,null,"f1275f40",null);i["default"]=u.exports},aa72:function(t,i,e){"use strict";var a=e("cd82"),n=e.n(a);n.a},cd82:function(t,i,e){}}]);
//# sourceMappingURL=chunk-daa66b10.cb6c923d.js.map