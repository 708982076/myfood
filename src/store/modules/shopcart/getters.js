import { sum } from "lib/utils";

export default {
  getFoodCountItems(state) {
    const foodCountItems = state.foodCountItems[state.foodId];
    return id => foodCountItems.find(data => data.id === id);
  },
  shopcartPricetotal(state) {
    const shopingCartIdObj = state.shopingCartIdObj;
    const foodId = state.foodId;
    if (!shopingCartIdObj[foodId]) {
      return 0;
    }
    return sum(
      shopingCartIdObj[foodId].reduce((a, b) => {
        return a + b.price * b.count;
      }, 0),
      1
    );
  },
  shopcartCount(state) {
    const shopingCartIdObj = state.shopingCartIdObj;
    const foodId = state.foodId;

    if (!shopingCartIdObj[foodId]) {
      return 0;
    }

    return shopingCartIdObj[foodId].reduce((a, b) => {
      return a + b.count;
    }, 0);
  },
  curShopcart(state) {
    const foodId = state.foodId;
    const shopingCartIdObj = state.shopingCartIdObj[foodId] || [];

    return shopingCartIdObj;
  }
};
