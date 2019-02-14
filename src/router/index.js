import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import city from '@/components/city/city'
import home from '@/components/home/home'
import search from '@/components/search/search'
import channel from '@/components/channel/channel'
import login from '@/components/login/login'
import store from '@/components/store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/city',
          name: 'city',
          component: city
        },
        {
          path: '/home/:city_name?',
          name: 'home',
          component: home
        },
        {
          path: '/store/:id',
          name: 'store',
          component: store
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/channel',
          name: 'channel',
          component: channel
        },
        {
          path: '/login',
          name: 'login',
          component: login
        }
      ]
    }
  ]
})


export default router