<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <el-badge :value="cartCount" class="cart" :hidden="cartCount === 0"
           :class="{ light: cartCount > 0 }"
        >
          <i class="el-icon-shopping-cart-2 cart-icon" @click="toggleShow"></i>
        </el-badge>
        <div class="prices">
          <span class="price" :class="{ light: shopcartPricetotal > 0 }">￥{{ shopcartPricetotal }}</span>
          <span
            class="freight"
            :class="{ remove: payPass }"
          >另需配送费￥{{ payPass ? 0 : deliveryPrice }}元</span>
        </div>
      </div>
      <div class="content-right">
        <div
          class="buy"
          :class="{ light: payPass }"
          @click="payhandle"
        >{{ payPass ? '支付' : '还差￥' + _sum( minPrice - shopcartPricetotal, 1 ) + '起送' }}</div>
      </div>
    </div>
    <div class="list" :class="{ move: isShow }">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="clear" @click="clearShopCartActions">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="list-item" v-for="food in curShopcart" :key="food.id">
            <span class="food-name">{{ food.name }}</span>
            <div class="food-price">
              <span class="price">￥{{ food.price }}</span>
              <CartControl :id="food.id"></CartControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-mask" v-if="isShow" @click="isShow = false"></div>
  </div>
</template>

<script>
import CartControl from "../CartControl/CartControl";
import BS from "better-scroll";
import { sum } from "../../lib/utils";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "shopcart"
);

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
  methods: {
    ...mapActions(["clearShopCart"]),
    toggleShow() {
      if (this.cartCount === 0) {
        return;
      }
      this.isShow = !this.isShow;
    },
    clearShopCartActions() {
      this.clearShopCart();
      this.isShow = false;
    },
    payhandle() {
      if (!this.payPass) return;
      this.curShopcart.forEach((f, index) => {
        console.log(index + 1 + ".", f.name, f.count, f.price);
      });
      console.log("total:", this.shopcartPricetotal, 'count', this.shopcartCount);
    },
    _sum(...args) {
      return sum(...args);
    }
  },
  computed: {
    ...mapState(["shopCart", "shopingCartIdObj"]),
    ...mapGetters(["shopcartPricetotal", "shopcartCount", "curShopcart"]),
    cartCount() {
      const len = this.curShopcart.length;
      if (this.shopCartLen !== len) {
        if (len === 0) this.isShow = false;
        this.shopCartLen = len; 
        this.$nextTick(() => {
          this.sroller.refresh();
        });
      }
      return this.shopcartCount;
    },
    payPass() {
      return this.shopcartPricetotal >= this.minPrice && this.shopcartCount !== 0;
    }
  },
  data() {
    return {
      isShow: false,
      sroller: BS,
      shopCartLen: 0
    };
  },
  mounted() {
    this.sroller = new BS(this.$refs.listContent, {
      click: true
    });
  },
  beforeDestroy() {
    this.sroller.destroy();
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
      min-height: 200px;
      max-height: 200px;
      overflow: hidden;
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
