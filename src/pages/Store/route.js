import { AsyncComponent } from '../async';
let Store = () => AsyncComponent(import(/* webpackChunkName: "Store" */ './Store'));
let Goods = () => AsyncComponent(import(/* webpackChunkName: "Goods" */'./Goods'));
let Comment = () => AsyncComponent(import(/* webpackChunkName: "Comment" */'./Comment'));
let ShopDetail = () => AsyncComponent(import(/* webpackChunkName: "ShopDetail" */'./ShopDetail'));

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
