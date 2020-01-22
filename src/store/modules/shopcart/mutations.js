import Vue from 'vue';
import {ADD_SHOPCART, RM_SHOPCART, CLEAR_SHOPCART} from './mutation-types';

export default {
  [ADD_SHOPCART](state, {id, food}) {
    if (!state.shopCart[id]) {
      Vue.set(state.shopCart, id, {
        food,
        count: 1
      })
    }else {
      state.shopCart[id].count++;
    }
  },
  [RM_SHOPCART](state, id) {
    state.shopCart[id].count--;
    if (!state.shopCart[id].count) {
      Vue.delete( state.shopCart, id )
    }
  },
  [CLEAR_SHOPCART](state) {
    state.shopCart = {}
  }
}