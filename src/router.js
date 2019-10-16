import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:"/down"
    },
    {
      path: '/dynshare',
      name: 'dyn',
      component:()=>import('./views/dynamicShare.vue')
    },
    {
      path: '/artshare',
      name: 'art',
      component:()=>import('./views/articleShare.vue')
    },
    {
      path: '/err',
      name: 'err',
      component:()=>import('./views/err.vue')
    },
    {
      path: '/down',
      name: 'down',
      component:()=>import('./views/down.vue')
    },
    {
      path: '/policy',
      name: 'policy',
      component:()=>import('./views/policy.vue')
    },
    {
      path: '/videoShare',
      name: 'videoShare',
      component:()=>import('./views/videoShare.vue')
    },
    {
      path: '/contrastShare',
      name: 'contrastShare',
      component:()=>import('./views/contrastShare.vue')
    },
    {
      path: '/comparAndroid',
      name: 'comparAndroid',
      component:()=>import('./views/comparAndroid.vue')
    },
  ]
})
