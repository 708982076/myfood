<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="cart" @click="toggleList" :class="{light: totalCount > 0}">
          <i class="icon-shopping_cart cart-icon"></i>
          <span class="totalCount" v-if="totalCount > 0">{{totalCount}}</span>
        </div>
        <div class="prices">
          <span class="price" :class="{light: totalPrice > 0}">￥{{totalPrice}}</span>
          <span class="freight">另需配送费￥{{totalPrice >= minPrice ? 0 : deliveryPrice}}元</span>
        </div>
      </div>
      <div class="content-right">
        <div class="buy" :class="{light: totalPrice >= minPrice}">
          {{minDeliveryPrice}}
        </div>
      </div>
    </div>
    <transition name="list">
      <div class="list" v-show="show">
        <div class="list-header">
          <span class="title">购物车</span>
          <span class="clear" @click="clear">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="list-item" v-for="(food, index) in selectFoods" :key="index">
              <span class="food-name">{{food.name}}</span>
              <div class="food-price">
                <span class="price">￥{{(food.price*10 + food.count* 10) / 10}}</span>
                <CartControl :food="food"></CartControl>  
              </div>
            </li>
          </ul>
        </div>
      </div>  
    </transition>
    <div class="bg-mask" v-show="show" @click="toggleList"></div>
  </div>
</template>

<script>
import CartControl from '../CartControl/CartControl'
import BS from 'better-scroll'
export default {
  components: {
    CartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default(){
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toggleList(){
      if (!this.totalCount){
        return;
      }
      this.isShow = !this.isShow;
    },
    clear(){
      this.selectFoods.forEach((food) => {
        food.count = 0;
      })
    }
  },
  computed: {
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    show(){
      if (!this.totalCount){
        this.isShow = true;
        return false;
      }
      let show = !this.isShow;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BS(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    },
    totalPrice(){
      let totalPrice = 0;
      this.selectFoods.forEach((food) => {
        totalPrice += (food.price * 10) * food.count;
      })
      return totalPrice / 10;
    },
    minDeliveryPrice(){
      if (this.totalPrice >= this.minPrice){
        return '去结账'
      }else {
        return `差￥${this.minPrice - this.totalPrice}元起送`
      }
    }
  },
  data(){
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  color: $gray;
  .content {
    position: relative;
    display: flex;
    z-index: 10;
    background-color: #141d27;
    .content-left {
      flex: 1;
      .cart {
        position: relative;
        float: left;
        margin-left: 15px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #2b343c;
        border: 6px solid #141d27;
        margin-top: -8px;
        text-align: center;
        color: #80858a;
        &.light {
          background-color: $blue;
          color: $white;
          .cart-icon{
            color: rgba(255, 255, 255, 1);
          }
        }
        .cart-icon{
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -12px;
          margin-top: -12px;
          font-size: 24px;
          color: rgba(255, 255, 255, .3);
        }
        .totalCount{
          position: absolute;
          top: -5px;
          right: -5px;
          width: 20px;
          padding: 2px 0;
          border-radius: 8px;
          font-size: 10px;
          color: $white;
          background-color: $red;
        }
      }
      .prices{
        float: left;
        line-height: 48px;
        font-size: 16px;
        .price{
          margin-left: 18px;
          padding-right: 12px;
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          font-weight: 700;
          border-right: 1px solid #262e38;
          &.light{
            color: $white;
          }
        }
        .freight{
          font-size: 10px;
          margin-left: 12px;
          font-weight: 200; 
          color: $white;
        }
      }
    }
    .content-right{
      width: 105px;
      .buy {
        float: right;
        width: 105px;
        height: 48px;
        font-size: 14px;
        background-color: #2b333b;        
        line-height: 48px;
        text-align: center;
        font-weight: 700;
        color:rgba(255, 255, 255, 0.4);
        &.light{
          background-color: orange;
          color: $white;
        }
      } 
    }
  }
  .list {
    position: absolute;    
    right: 0; 
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #fff;
    transform: translate3d(0,-100%,0);
    &.list-enter-active, &.list-leave-active{
      transition: all 300ms;
    }
    &.list-enter, &.list-leave-to{
      transform: translate3d(0,0,0);
    }
    .list-header{ 
      padding: 0 18px;
      height: 40px;
      line-height: 40px;
      background-color: #f3f5f7;
      border: 1px solid rgba(7,17,27,0.1);
      font-size: 14px;
      .title{
        font-weight: 200;
        color: rgb(7,17,27);
      }
      .clear{
        float: right;
        font-size: 12px;
        color: $blue;
      }
    }
    .list-content {
      min-height: 200px;
      max-height: 200px;
      overflow: hidden;
      .list-item {
        height: 48px;
        text-align-last: justify;
        padding: 0 18px;
        line-height: 48px;
        border: 1px solid rgba(7,17,27,0.1);
        font-size: 14px;
        .food-name{
          display: inline-block;
          color: rgb(7,17,27);
        }
        .food-price{
          display: inline-block;
          .price{
            font-weight: 700;
            color: rgb(240,20,20);
            vertical-align: middle;
          }
        }
      }   
    }
  }
  .bg-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }
}
</style>
