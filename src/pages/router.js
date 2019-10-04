import Vue from "vue";
import Router from "vue-router";
import storeRoute from "./Store/route";
// const City = () =>
//   import(/* webpackChunkName: "City" */ "./City/City");
// const Home = () =>
//   import(/* webpackChunkName: "Home" */ "./Home/Home");
// const Search = () =>
//   import(/* webpackChunkName: "Search" */ "./Search/Search");
// const ErrorView = () =>
//   import(/* webpackChunkName: "Error" */ "./Error/Error");

import City from './City/City';
import Home from './Home/Home';
import Search from './Search/Search';
import ErrorView from './Error/Error';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    storeRoute,
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
