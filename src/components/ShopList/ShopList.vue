<template>
  <div class="shop-list">
    <h2 class="title">—— 附近商家 ——</h2>
    <div class="shop-infolist" 
      v-infinite-scroll="loadNewStoreList" 
      :infinite-scroll-disabled="loading"
    >
      <ShopInfo :store="store" v-for="store in newStoreList" :key="store.key"></ShopInfo>
      <p v-if="loading" class="loading-icon">
        <i class="el-icon-loading icon-midsize"></i>
      </p>
    </div>
  </div>
</template>

<script>
import ShopInfo from '../ShopInfo/ShopInfo';
export default {
  props: {
    storeList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      newStoreList: []
    }
  },
  methods: {
    loadNewStoreList() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.newStoreList = this.newStoreList.concat( this.storeList );
      }, 500)
    }
  },
  components: {
    ShopInfo
  }
}
</script>

<style lang="scss">
  .shop-list{
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #fff;
    .title {
      padding: 8px 0;
      font-size: 16px;
      text-align: center;
    }
    .shop-infolist{
      position: absolute;
      top:40px;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
    }
    .loading-icon {
      padding: 5px 0;
      text-align: center;
    }
  }
</style>
