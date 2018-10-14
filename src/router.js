import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/web-audio-api',
      name: 'WebAudioApi',
      component: () => import('./views/WebAudioApi.vue'),
    },
    {
      path: '/guitar-tuner',
      name: 'GuitarTuner',
      component: () => import('./views/GuitarTuner.vue'),
    },
    {
      path: '/stereo-panner-node',
      name: 'StereoPannerNode',
      component: () => import('./views/StereoPannerNode.vue'),
    },
  ],
});
