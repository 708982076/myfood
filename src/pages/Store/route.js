let Store = () => import(/* webpackChunkName: "Store" */ './Store');
let Goods = () => import(/* webpackChunkName: "Goods" */'./Goods/Goods');
let Comment = () => import(/* webpackChunkName: "Comment" */'./Comment/Comment');
let ShopDetail = () => import(/* webpackChunkName: "ShopDetail" */'./ShopDetail');

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
