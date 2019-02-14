<template>
  <div class="cart-control">
    <transition name="move">
      <i class="icon-remove_circle_outline decrease" v-if="food.count > 0" @click="decreaseCart()"></i>
    </transition>
    <span class="num" v-if="food.count > 0">{{food.count}}</span>
    <i class="icon-add_circle add" @click="addCart()"></i>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    },
    id: {
      type: Number
    }
  },
  methods: {
    addCart(){
      if (!this.food.count){
        this.$set(this.food, 'count', 1)
      }else {
        this.food.count++;
      }
    },
    decreaseCart(){
      if (this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.cart-control{
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  .decrease{
    display: inline-block;
    padding: 5px;    
    color: orange;
    font-size: 28px;
    vertical-align: middle ;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-to{
      transform: translate3d(24px, 0, 0) rotate(-180deg);
      opacity: 0;
    }
  }
  .add{
    display: inline-block;
    padding: 5px;
    color: orange;
    font-size: 28px;
    vertical-align: middle;
  }
  .num{
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


