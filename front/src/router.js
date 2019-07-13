import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import(/* webpackChunkName: "rooms" */ './views/Rooms.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/private-page',
      name: 'private_page',
      component: () => import(/* webpackChunkName: "private_page" */ './views/PrivatePage.vue')
    },
    {
      path: '/private-only-admin',
      name: 'private_only_admin',
      component: () => import(/* webpackChunkName: "private_only_admin" */ './views/PrivateOnlyAdmin.vue')
    },

  ]
})
