import Vue from "vue";
import Router from "vue-router";
import { AsyncComponent } from "./async";
import storeRoute from "./Store/route";
const City = () =>
  AsyncComponent(import(/* webpackChunkName: "City" */ "./City/City"));
const Home = () =>
  AsyncComponent(import(/* webpackChunkName: "Home" */ "./Home/Home"));
const Search = () =>
  AsyncComponent(import(/* webpackChunkName: "Search" */ "./Search/Search"));
const ErrorView = () =>
  AsyncComponent(import(/* webpackChunkName: "Error" */ "./Error/Error"));

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
