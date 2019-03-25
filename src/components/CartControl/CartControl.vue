<template>
  <div class="cart-control">
    <transition name="move">
      <i class="icon-remove_circle_outline decrease" @click="decreaseCount" v-if="data.count > 0"></i>
    </transition>
    <span class="num" v-if="data.count > 0">{{data.count}}</span>
    <i class="icon-add_circle add" @click="addCart"></i>
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
@import "../../style/mixin.scss";
.cart-control {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  .decrease {
    display: inline-block;
    padding: 5px;
    color: orange;
    font-size: 28px;
    vertical-align: middle;
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
  .add {
    display: inline-block;
    padding: 5px;
    color: orange;
    font-size: 28px;
    vertical-align: middle;
  }
  .num {
    display: inline-block;
    width: 18px;
    font-size: 10px;
    color: $gray;
    line-height: 28px;
    text-align-last: center;
    vertical-align: middle;
  }
}
</style>


