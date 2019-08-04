import Vue from "vue";
import Router from "vue-router";
import { AsyncComponent } from './async';
import store from './Store/route';
const City = () => AsyncComponent(import(/* webpackChunkName: "City" */ "./City/City"));
const Home = () =>
  AsyncComponent(import(/* webpackChunkName: "Home" */ "./Home/Home"));
const Search = () =>
  import(/* webpackChunkName: "Search" */ "./Search/Search");
const Channel = () =>
  AsyncComponent(import(/* webpackChunkName: "Channel" */ "./Channel/Channel"));

const ErrorView = () =>
  import(/* webpackChunkName: "Error" */ "./Error/Error");

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    store,
    {
      path: "/city",
      name: "city",
      component: City
    },
    {
      path: "/home/:cityname?",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/channel",
      name: "channel",
      component: Channel
    },
    {
      path: "/error",
      name: "error",
      component: ErrorView
    },
    {
      path: "*",
      redirect: "/error"
    }
  ]
});

export default router;
