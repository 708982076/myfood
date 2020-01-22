export default {
  shopCartCount(state) {
    const shopCart = state.shopCart;
    const foodsId = Object.keys(shopCart);
    let count = 0;
    for (const id of foodsId) {
      count += shopCart[id].count;
    }
    return count;
  },
  shopCartPrice(state) {
    const shopCart = state.shopCart;
    const foodsId = Object.keys(shopCart);
    let price = 0;
    for (const id of foodsId) {
      price += shopCart[id].count * shopCart[id].food.price;
    }
    return price;
  }
}