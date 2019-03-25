import Vue from 'vue'
import Router from 'vue-router'
const App = () => import(/* webpackChunkName: "App" */ '../App');
const City = () => import(/* webpackChunkName: "City" */'../pages/City/City');
const Home = () => import(/* webpackChunkName: "Home" */'../pages/Home/Home');
const Search = () => import(/* webpackChunkName: "Search" */'../pages/Search/Search');
const Channel = () => import(/* webpackChunkName: "Channel" */'../pages/Channel/Channel');
const Login = () => import(/* webpackChunkName: "Login" */'../pages/Login/Login');
const Error = () => import(/* webpackChunkName: "Error" */'../pages/Error/Error');
import store from './store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        store,
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/city',
          name: 'city',
          component: City
        },
        {
          path: '/home/:cityname?',
          name: 'home',
          component: Home
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/channel',
          name: 'channel',
          component: Channel
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/error',
          name: 'error',
          component: Error
        },
        {
          path: '*',
          redirect: '/error'
        }
      ]
    }
  ]
})

export default router