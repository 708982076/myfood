<template>
  <div class="cart-control">
    <transition name="move">
      <span class="cart-control-btn decrease" @click="decreaseCount" v-if="foodCount">
        <i class="el-icon-minus"></i>
      </span>
    </transition>
    <span class="num">{{foodCount}}</span>
    <span class="cart-control-btn" @click="increaseCount">
      <i class="el-icon-plus add"></i>
    </span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import {ADD_SHOPCART, RM_SHOPCART} from '@/store/modules/shopcart/mutation-types';
const { mapState, mapMutations } = createNamespacedHelpers("shopcart");
export default {
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['shopCart']),
    foodCount() {
      const id = this.food.id;
      return this.shopCart[id] && this.shopCart[id].count;
    }
  },
  methods: {
    ...mapMutations([ADD_SHOPCART, RM_SHOPCART]),
    decreaseCount() {
      if (!this.foodCount) return; 
      this.RM_SHOPCART(this.food.id)
    },
    increaseCount() {
      this.ADD_SHOPCART({ id: this.food.id, food: this.food })
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.cart-control {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &-btn {
    width: 25px;
    height: 25px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 20px;
    background: $primary;
    .el-icon-minus, .el-icon-plus{
      color: #fff;
    }
  }
  .decrease {
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translateX(24px) rotate(180deg) scale(1) translateZ(0);
      opacity: 0;
    }
  }
  .num {
    flex:1;
    padding: 0 5px;
    font-size: 10px;
    color: $gray;
  }
}
</style>


