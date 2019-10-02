<template>
  <div class="cart-control">
    <transition name="move">
      <span class="cart-control-btn decrease" v-if="data.count > 0">
        <i class="el-icon-minus" @click="decreaseCount"></i>
      </span>
    </transition>
    <span class="num" v-if="data.count > 0">{{data.count}}</span>
    <span class="cart-control-btn">
      <i class="el-icon-plus add" @click="addCart"></i>
    </span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("shopcart");

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      data: {
        id: 0,
        count: 0
      }
    };
  },
  async created() {
    this.data.id = this.id;
    const data = await this.updateFoodItemCount(this.data);
    if (data) {
      this.data = data;
    }
  },  
  computed: {
    ...mapState(["foodCountItems"])
  },
  methods: {
    ...mapActions(["addShopCart", "removeShopCart", "updateFoodItemCount", 'clearCache']),
    addCart() {
      this.data.count++;
      this.addShopCart(this.data);
    },
    decreaseCount() {
      if (this.data.count === 0) return;
      this.data.count--;
      this.removeShopCart(this.data);
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


