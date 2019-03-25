<template>
  <div class="shop-list">
    <h2 class="title">—— 附近商家 ——</h2>
    <ShopInfo :store="store" v-for="store in storeList" :key="store._id"></ShopInfo>
  </div>
</template>

<script>
import ShopInfo from '../ShopInfo/ShopInfo'
export default {
  props: {
    storeList: {
      type: Array,
      required: true
    }
  },
  components: {
    ShopInfo
  }
}
</script>

<style lang="scss">
  .shop-list{
    background-color: #fff;
    .title {
      padding: .5rem 0;
      font-size: .7rem;
      text-align: center;
    }
  }
</style>
