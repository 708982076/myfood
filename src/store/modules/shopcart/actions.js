import {
  CHANGE_FOOD_ID,
  ADD_FOOD_NUM_ID,
  ADD_GOODS,
  UPDATE_SHOP_CART
} from "./mutation-types";
import { setStorage } from "lib/utils";
import { getStoreItem } from "root/getData";

let cache = {};
export default {
  clearCache({ commit }) {
    commit(CHANGE_FOOD_ID, "");
    commit(ADD_FOOD_NUM_ID, {});
    commit(ADD_GOODS, []);
    commit(UPDATE_SHOP_CART, {});
    cache = {};
  },
  addShopCart({ commit, state }, { id, count }) {
    const shopingCartIdObj = Object.assign({}, state.shopingCartIdObj);
    const foodId = state.foodId;
    const goods = state.goods;
    let shopingCartId = shopingCartIdObj[foodId];

    if (!shopingCartId) {
      shopingCartId = [];
    }

    const food = shopingCartId.find(food => food.id === id);

    if (food) {
      food.count = count;
    } else {
      shopingCartId.push(
        goods.find(food => {
          const flag = food.id === id;
          if (flag) {
            food.count = count;
          }
          return flag;
        })
      );
    }

    shopingCartIdObj[foodId] = shopingCartId;
    setStorage("allshopcart", shopingCartIdObj);
    commit(UPDATE_SHOP_CART, shopingCartIdObj);
  },
  removeShopCart({ commit, state }, { id, count }) {
    const shopingCartIdObj = Object.assign({}, state.shopingCartIdObj);
    const foodId = state.foodId;

    const food = shopingCartIdObj[foodId].find(f => f.id === id);
    food.count = count;

    if (count === 0) {
      shopingCartIdObj[foodId] = shopingCartIdObj[foodId].filter(
        f => f.id !== id
      );
      if (shopingCartIdObj[foodId].length === 0) {
        shopingCartIdObj[foodId] = [];
        delete shopingCartIdObj[foodId];
      }
    }

    setStorage("allshopcart", shopingCartIdObj);
    commit(UPDATE_SHOP_CART, shopingCartIdObj);
  },
  clearShopCart({ commit, state, dispatch }) {
    const foodId = state.foodId;
    const shopingCartIdObj = Object.assign({}, state.shopingCartIdObj);

    delete shopingCartIdObj[foodId];

    setStorage("allshopcart", shopingCartIdObj);
    dispatch("clearCount");
    commit(UPDATE_SHOP_CART, shopingCartIdObj);
  },
  setFoodId({ commit }, foodId) {
    commit(CHANGE_FOOD_ID, foodId);
  },
  clearCount({ state }) {
    const foodCountItemId = state.foodCountItems;
    const foodId = state.foodId;
    foodCountItemId[foodId].forEach(f => {
      f.count = 0;
    });
  },
  updateFoodItemCount({ commit, state }, data) {
    const foodCountItemId = state.foodCountItems;
    const foodId = state.foodId;
    const id = data.id;
    if (!foodCountItemId[foodId]) {
      foodCountItemId[foodId] = [];
    }

    if (cache[id]) {
      return cache[id];
    } else {
      cache[id] = data;
      foodCountItemId[foodId].push(data);
    }
    commit(ADD_FOOD_NUM_ID, foodCountItemId);
    return null;
  },
  async getStoreItem({ commit }, id) {
    const { code, data } = await getStoreItem(id);
    function addId(arr) {
      let start = 0;
      let goods = [];
      arr.forEach((item, index) => {
        item.id = index + 1;
        item.foods.forEach((food, index, arr) => {
          food.id = start + index + 1;
          goods.push(food);
        });
        start += item.foods.length;
      });
      return goods;
    }
    if (code === 0) {
      Object.freeze(data);
      const goods = addId(data.food_menu);
      Object.freeze(goods);
      commit(ADD_GOODS, goods);
      return data;
    }
    return {};
  }
};
