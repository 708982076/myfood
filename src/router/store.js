const Store = () => import(/* webpackChunkName: "Store" */ '../pages/Store/Store');
const Goods = () => import(/* webpackChunkName: "Goods" */'../pages/Store/Goods');
const Comment = () => import(/* webpackChunkName: "Comment" */'../pages/Store/Comment');
const ShopDetail = () => import(/* webpackChunkName: "ShopDetail" */'../pages/Store/ShopDetail');

export default {
  path: "/store",
  name: "store",
  component: Store,
  children: [
    {
      path: "goods",
      name: "goods",
      component: Goods,
      meta: { i:1 }
    },
    {
      path: "comment",
      name: "comment",
      component: Comment,
      meta: { i:2 }
    },
    {
      path: "shopdetail",
      name: "shopdetail",
      component: ShopDetail,
      meta: { i:3 }
    }
  ],
  redirect: () => {
    return { name: "goods" };
  }
};
