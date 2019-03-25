import {
  GET_CURCITY
} from "./mutation-types";

export default {
  [GET_CURCITY](state, city) {
    state.currentCity = city;
  }
};
