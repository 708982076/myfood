<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <el-badge class="cart" 
          :value="shopCartCount" 
          :hidden="!shopCartCount" 
          :class="{light: shopCartCount}"
          @click.native="openList">
          <i class="el-icon-shopping-cart-2 cart-icon"></i>
        </el-badge>
        <div class="prices">
          <span class="price">￥{{shopCartPrice}}</span>
          <span
            class="freight"
          >配送费￥{{minPrice}}元</span>
        </div>
      </div>
      <div class="content-right">
        <div
          class="buy"
          :class="{light:payPass}"
          @click="pay"
        >{{payPass ? `支付` : `还差￥${ minPrice - shopCartPrice }起送`}}</div>
      </div>
    </div>
    <div class="list" :class="{move: showCount}">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="clear" @click="clearCart">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="list-item" v-for="({food}) in shopCart" :key="food.id">
            <span class="food-name">{{food.name}}</span>
            <div class="food-price">
              <span class="price">￥{{food.price}}</span>
              <CartControl :food="food"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from "../CartControl/CartControl";
import { sum } from "../../lib/utils";

import { CLEAR_SHOPCART } from '@/store/modules/shopcart/mutation-types';
import { createNamespacedHelpers } from "vuex";
const { 
  mapState, mapGetters, mapMutations 
} = createNamespacedHelpers("shopcart");

export default {
  components: {
    CartControl
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    ...mapMutations([CLEAR_SHOPCART]),
    openList() {
      this.isShow = !this.isShow;
    },
    clearCart() {
      this.CLEAR_SHOPCART();
      this.isShow = false;
    },
    pay() {
      console.log(Object.values(this.shopCart))
      for (const {food: {name}, food, count} of Object.values(this.shopCart)) {
        console.log(name, food, count);
      }
      console.log('total: ', this.shopCartPrice)
    }
  },
  computed: {
    ...mapGetters(["shopCartCount", "shopCartPrice"]),
    ...mapState(['shopCart']),
    payPass() {
      return this.minPrice - this.shopCartPrice <= 0
    },
    showCount() {
      if (!this.shopCartCount) {
        this.isShow = false;
      }
      return this.isShow && this.shopCartCount
    }
  }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.shopcart {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  color: $gray;
  .content {
    position: relative;
    display: flex;
    background-color: #141d27;
    height: 50px;
    z-index: 1;
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
          background-color: $primary;
          color: $white;
          .cart-icon {
            color: rgba(255, 255, 255, 1);
          }
        }
        .cart-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -12px;
          margin-top: -12px;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.3);
        }
        .totalCount {
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
      .prices {
        display: inline-flex;
        height: 50px;
        justify-content: center;
        align-items: center;
        .price {
          margin-left: 18px;
          padding-right: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          border-right: 1px solid #262e38;
          &.light {
            color: $white;
          }
        }
        .freight {
          font-size: 10px;
          margin-left: 12px;
          font-weight: 200;
          color: $white;
          &.remove {
            color: #999;
          }
        }
      }
    }
    .content-right {
      width: 105px;
      .buy {
        float: right;
        width: 105px;
        font-size: 14px;
        background-color: #2b333b;
        line-height: 50px;
        text-align: center;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.light {
          background-color: $primary;
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
    background-color: #fff;
    transform: translateY(100%);
    transition: transform 0.3s linear;
    &.move {
      transform: translateY(-100%);
    }
    .list-header {
      padding: 0 18px;
      height: 40px;
      line-height: 40px;
      background-color: #f3f5f7;
      border: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 14px;
      .title {
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
      .clear {
        float: right;
        font-size: 12px;
        color: $blue;
      }
    }
    .list-content {
      max-height: 200px;
      min-height: 200px;
      overflow: auto;
      .list-item {
        display: flex;
        height: 48px;
        padding: 0 18px;
        line-height: 48px;
        font-size: 14px;
        .food-name {
          flex: 1;
          color: rgb(7, 17, 27);
        }
        .food-price {
          .price {
            margin-right: 5px;
            font-weight: 700;
            color: rgb(240, 20, 20);
            line-height: 48px;
          }
        }
      }
    }
  }
  .bg-mask {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
