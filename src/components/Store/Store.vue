<template>
  <div class="store-page">
    <a class="back-icon" href="javascript:history.back()">
      <i class="iconfont icon-fanhui"></i>
    </a>
    <GoodsHeader :seller="seller"></GoodsHeader>
    <div class="tab" id="tab-select">
      <div class="tab-item" :class="{active: index == 1}" @click="changeIndex(1)">商品</div>
      <div class="tab-item" :class="{active: index == 2}" @click="changeIndex(2)">评价</div>
      <div class="tab-item" :class="{active: index == 3}" @click="changeIndex(3)">商家</div>
    </div>
    <Goods v-show="index == 1" :seller="seller"></Goods>
    <Comment v-show="index == 2" :seller="seller"></Comment> 
    <ShopDetail v-show="index == 3" :seller="seller"></ShopDetail>
  </div>
</template>

<script>
import Goods from "../Goods/Goods";
import GoodsHeader from "../GoodsHeader/GoodsHeader";
import ShopDetail from "../ShopDetail/ShopDetail";
import Comment from "../Comment/Comment";
import {getSellerInfo, getComment} from 'root/getData'
export default {
  components: {
    Goods,
    GoodsHeader,
    ShopDetail,
    Comment
  },
  data() {
    return {
      seller: {},
      Goods: [],
      index: 1,
      id: 1
    }
  },
  methods: {
    changeIndex(i){
      this.index = i;
    }
  },
  created() {
    this.id = +this.$route.params.id
    getSellerInfo(this.id).then(res => {
      if (res.status == 1){
        this.seller = res.data
      }
    })
  }
};
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.store-page{
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
      line-height: 40px;
      text-align: center;
      flex-grow:  1;
      font-size: 14px;
      color: $black;
      background-color: #fff; 
      border-bottom: 2px solid $white;
      &.active {
        border-bottom: 2px solid orange;
      }
    }
  }
}
</style>
