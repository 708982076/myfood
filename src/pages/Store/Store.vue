<template>
  <div class="store-page">
    <a class="back-icon" href="javascript:history.back()">
      <i class="el-icon-arrow-left icon-fff"></i>
    </a>
    <GoodsHeader :storeItem="storeItem"></GoodsHeader>
    <div class="tab" id="tab-select">
      <div class="tab-item">
        <router-link active-class="" exact-active-class="active" :to="{ name: 'goods', query:{ id } }" replace>商家</router-link>
      </div>
      <div class="tab-item">
        <router-link active-class="" exact-active-class="active" :to="{ name: 'comment' , query:{ id }}" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link active-class="" exact-active-class="active" :to="{ name: 'shopdetail', query:{ id } }" replace>商家</router-link>
      </div>
    </div>
    <transition :name="slidename">
      <keep-alive>
        <router-view :storeItem="storeItem"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import GoodsHeader from "@/components/GoodsHeader/GoodsHeader";
import {createNamespacedHelpers} from 'vuex';
import {getStoreList} from 'root/getData'

export default {
  components: {
    GoodsHeader
  },
  data() {
    return {
      storeItem: {},
      slidename: ''
    }
  },
  async created() {
    const id = this.id = this.$route.query.id;
    if ( !id ) {
      this.$router.replace( { path: '/error' } );
    }else {
      const storeItem = await getStoreList(id);
      this.storeItem = storeItem;
    }
  },
  destroyed() {
    this.$store.commit(`shopcart/CLEAR_SHOPCART`);
  },
  watch: {
    '$route'(n, o) {
      if ( n.meta.i > o.meta.i) {
        this.slidename = 'left'
      }else {
        this.slidename = 'right'
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.store-page{
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .left-enter {
    transform: translateX(100%);
  }
  .left-enter-to {
    transform: translateX(0);
  }
  .left-leave {
    transform: translateX(0);
  }
  .left-leave-to {
    transform: translateX(-100%);
  }

  .right-enter {
    transform: translateX(-100%);
  }
  .right-enter-to {
    transform: translateX(0);
  }
  .right-leave {
    transform: translateX(0);
  }
  .right-leave-to {
    transform: translateX(100%);
  }

  .left-enter-active,
  .left-leave-active,
  .right-enter-active,
  .right-leave-active {
    transition: transform .3s;
  }

  .back-icon{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    z-index: 1;
    padding: 10px;
    .icon-fanhui {
      font-weight: 600;
      color: $white;
    }
  }
  .tab{
    display: flex;
    .tab-item {
      text-align: center;
      flex-grow:  1;
      font-size: 14px;
      color: $black;
      background-color: #fff; 
      border-bottom: 2px solid $white;
      a {
        display: inline-block;
        width: 100%;
        line-height: 40px;
        &.active {
          border-bottom: 2px solid $primary;
        }
      }
    }
  }
}
</style>
