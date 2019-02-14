<template>
  <div class="shop-list">
    <ShopInfo :seller="seller" v-for="seller in sellers" :key="seller.id"></ShopInfo>
  </div>
</template>

<script>
import ShopInfo from '../ShopInfo/ShopInfo'
export default {
  props: ['sellers'],
  components: {
    ShopInfo
  }
}
</script>

<style lang="scss">
  .shop-list{
    background-color: #fff;
  }
</style>
