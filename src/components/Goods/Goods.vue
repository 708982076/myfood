<template>
  <div class="goods" id="goods">
    <div class="goods-left" ref="menuwrapper">
      <div class="menu-wraper">
        <div class="menu-wrap" ref="menulist" 
        v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex === index}" @click="selectMenu($event, index)">
          <div class="menu-cell">
            <i class="menu-icon" v-if="item.type > 0" :class="mapClass[item.type]"></i>
            <span class="menu-name">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-right" ref="goodswrapper">
      <div class="goods-wrapper">
        <div class="goods-block" ref="goodslist"
          v-for="(item, index) in goods" :key="index">
          <div class="goods-title">{{item.name}}</div>
          <ul class="goods-wrap">
            <li v-for="(food, index) in item.foods" :key="index" class="goods-item">
              <div class="image-wrap"><img :src="food.image"></div>
              <div class="goods-info">
                <div class="title">{{food.name}}</div>
                <span class="desc">{{food.description}}</span>
                <div class="sell">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="good-per">好评{{food.rating}}%</span>
                </div>
                <div class="price-wrap">
                  <div class="price"> 
                    <span class="new-price">￥{{food.price}}</span>
                    <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <CartControl :food="food" :id="id"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div> 
    <ShopCart ref="ShopCart" :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></ShopCart>
  </div>
</template>

<script>
import BS from "better-scroll";
import ShopCart from "../ShopCart/ShopCart";
import CartControl from "../CartControl/CartControl";
import {getSellerFoodList} from '../../../getData'
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.mapClass = ["decrease", "discount", "special", "invoice", "guarantee"];
    let id = this.id = Number(this.$route.params.id)
    getSellerFoodList(id).then(res => {
      if (res.status == 1) {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll(); //初始化bs
          this._computeHeight(); //计算高度
        })
      }
    })
  },
  data() {
    return {
      goodsItemHeight: [],
      scrollY: 0,
      goods: [],
      id: 0
    };
  },
  components: {
    ShopCart,
    CartControl
  },
  computed: {
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
    currentIndex() {
      for (let i = 0; i < this.goodsItemHeight.length; i++) {
        let height1 = this.goodsItemHeight[i];
        let height2 = this.goodsItemHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    selectMenu(event, index) {
      let goodslist = this.$refs.goodslist;
      let el = goodslist[index];
      this.goodsScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.menuScroll = new BS(this.$refs.menuwrapper, {
        click: true
      });
      this.goodsScroll = new BS(this.$refs.goodswrapper, {
        click: true,
        probeType: 3
      });
      this.goodsScroll.on("scroll", pos => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _computeHeight() {
      let height = 0;
      let goodslist = this.$refs.goodslist;
      this.goodsItemHeight.push(height);
      for (let i = 0; i < goodslist.length; i++) {
        height += goodslist[i].clientHeight;
        this.goodsItemHeight.push(height);
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menulist;
      let el = menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    }
  }
};
</script>

<style lang="scss">
@import '../../style/mixin.scss';
.goods {
  position: absolute;
  left: 0;
  right: 0;
  top: 166px;
  bottom: 50px;
  display: flex;
  background-color: $white;
  .goods-left{
    width: 80px;
    background-color: #f3f5f7;
    overflow: hidden;
    .menu-wrap{
      position: relative;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      font-size: 12px;
      &.current {
        z-index: 10;
        margin-top: -1px;
        background-color: $white;
        border-top: 1px solid #fff;
        & .menu-cell::after{
          border-color: $white;
        }
        & .menu-cell .menu-name{
          font-weight: 500;
        }
      }
      .menu-cell {
        display: table-cell;
        width: 56px;
        height: 54px;
        text-align: center;
        vertical-align: middle;
        .menu-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 16px 16px;
          vertical-align: text-bottom;
          @include bg-image('decrease_4');
          &.decrease{
            @include bg-image('decrease_4');
          }
          &.discount{
            @include bg-image('discount_4');
          }
          &.special{
            @include bg-image('special_4');
          }
          &.invoice{
            @include bg-image('invoice_4');
          }
          &.guarantee{
            @include bg-image('guarantee_4');
          }
        }
        .menu-name{
          font-weight: 200;
          color: rgb(7, 17, 24);
        }
      }
    }
  }
  .goods-right {
    flex: 1;
    overflow: hidden;
    .goods-title {
      padding-left: 12px;
      background-color: #f3f5f7;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: $gray;
      line-height: 26px;
    }
    .goods-item {
      display: flex;
      padding: 18px;
      .image-wrap {
        float: left;
        height: 100%;
        margin-right: 10px;
        img {
          width: 64px;
          height: 64px;
        }
      }
      .goods-info {
        flex: 1;
        .title {
          font-size: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
          margin-top: 2px;
          font-weight: 700;
        }
        .desc {
          font-size: 10px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
          margin-top: 2px;
          font-weight: 700;
        }
        .sell {
          font-size: 10px;
          color: $gray;
          .sell-count {
            margin-right: 8px;
          }
        }
        .price-wrap {
          text-align-last: justify;
          .price{
            display: inline-block;
            vertical-align: middle;
            .new-price{
              font-size: 14px;
              line-height: 24px;
              color: $red;
              font-weight: 700;
            }
            .old-price{
              font-size: 10px;
              line-height: 14px;
              color: $gray;
              font-weight: 700;
              text-decoration: line-through;
            } 
          }    
        }
      }
    }
  }
}
</style>