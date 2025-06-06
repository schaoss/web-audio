import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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
      path: '/sequencer',
      name: 'Sequencer',
      component: () => import('./views/Sequencer.vue')
    },
    {
      path: '/wave-surfer',
      name: 'WaveSurfer',
      component: () => import('./views/WaveSurfer.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
