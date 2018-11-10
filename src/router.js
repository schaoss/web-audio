import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/web-audio-api',
      name: 'WebAudioApi',
      component: () => import('./views/WebAudioApi.vue')
    },
    {
      path: '/guitar-tuner',
      name: 'GuitarTuner',
      component: () => import('./views/GuitarTuner.vue')
    },
    {
      path: '/stereo-panner-node',
      name: 'StereoPannerNode',
      component: () => import('./views/StereoPannerNode.vue')
    },
    {
      path: '/panner-node',
      name: 'PannerNode',
      component: () => import('./views/PannerNode.vue')
    },
    {
      path: '/source',
      name: 'Source',
      component: () => import('./views/Source.vue')
    },
    {
      path: '/analyser',
      name: 'Analyser',
      component: () => import('./views/Analyser.vue')
    },
    {
      path: '/guitar-tuner-2.0',
      name: 'GuitarTuner2.0',
      component: () => import('./views/GuitarTuner_2.vue')
    },
    {
      path: '/voice-changer',
      name: 'VoiceChanger',
      component: () => import('./views/VoiceChanger.vue')
    },
    {
      path: '/tone',
      name: 'Tone',
      component: () => import('./views/Tone.vue')
    },
    {
      path: '/wave-surfer',
      name: 'WaveSurfer',
      component: () => import('./views/WaveSurfer.vue')
    }
  ]
})
