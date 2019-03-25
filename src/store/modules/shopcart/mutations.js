import {
  CHANGE_FOOD_ID,
  ADD_FOOD_NUM_ID,
  ADD_GOODS,
  UPDATE_SHOP_CART
} from "./mutation-types";

export default {
  [UPDATE_SHOP_CART](state, shopingCartIdObj = {}) {
    state.shopingCartIdObj = shopingCartIdObj;
  },
  [CHANGE_FOOD_ID](state, foodId) {
    state.foodId = foodId;
  },
  [ADD_FOOD_NUM_ID](state, data) {
    state.foodCountItems = data;
  },
  [ADD_GOODS](state, goods){
    state.goods = goods;
  }
};
