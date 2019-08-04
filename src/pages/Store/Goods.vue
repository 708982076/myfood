<template>
  <div class="goods" id="goods">
    <div class="goods-left" ref="menuwrapper">
      <div class="menu-wraper">
        <div
          class="menu-wrap"
          ref="menulist"
          v-for="(item, index) in storeItem.food_menu"
          :key="index"
          @click="scrollToGoods(index)"
          :class="{ current: index === currentIndex }"
        >
          <div class="menu-cell">
            <span class="menu-name">{{item.name}}</span>
            <i class="menu-icon" :class="typeClass(item.type)" v-if="item.type > 0"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-right" ref="goodswrapper">
      <div class="goods-wrapper">
        <div class="goods-block" ref="goodslist" v-for="item in storeItem.food_menu" :key="item.id">
          <div class="goods-title">{{item.name}}</div>
          <ul class="goods-wrap">
            <li v-for="food in item.foods" :key="food.id" class="goods-item">
              <div class="image-wrap">
                <ImageLoading :src="food.image" />
              </div>
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
                    <span
                      class="old-price"
                      v-if="food.oldPrice && food.oldPrice !== food.price"
                    >￥{{food.oldPrice}}</span>
                  </div>
                  <CartControl :id="food.id"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ShopCart :minPrice="storeItem.minPrice" :deliveryPrice="storeItem.deliveryPrice"></ShopCart>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ShopCart from "@/components/ShopCart/ShopCart";
import CartControl from "@/components/CartControl/CartControl";
import ImageLoading from "@/common/ImageLoading/ImageLoading";
export default {
  props: {
    storeItem: {
      type: Object,
      required: true
    }
  },
  created() {
    this.$nextTick(() => {
      let params = {
        bounceTime: 300,
        click: true,
        probeType: 3
      };
      this.scroller.menu = new BScroll(this.$refs.menuwrapper, params);
      this.scroller.goods = new BScroll(this.$refs.goodswrapper, params);
      this.scroller.goods.on("scroll", ({ y }) => {
        this.scrollY = Math.abs(Math.floor(y));
      });
      this.computeScroll();
    });
  },
  beforeDestroy() {
    this.scroller.menu.destroy();
    this.scroller.goods.destroy();
  },
  data() {
    return {
      goodsHeight: [],
      scrollY: 0,
      scroller: {}
    };
  },
  components: {
    ShopCart,
    ImageLoading,
    CartControl
  },
  computed: {
    currentIndex() {
      const scrollY = this.scrollY;
      for (let i = 0, heights = this.goodsHeight; i < heights.length; i++) {
        let height1 = heights[i];
        let height2 = heights[i + 1];
        if (!height2 || (scrollY >= height1 && scrollY < height2)) {
          this.scrollToMenu(i);
          return i;
        }
      }
      return 0;
    },
    typeClass() {
      const icons = ["decrease_3", "discount_3", "special_3"];
      return type => ({
        [icons[type - 1]]: true
      });
    }
  },
  methods: {
    scrollToGoods(index) {
      this.scroller.goods.scrollToElement(this.$refs.goodslist[index], 300);
    },
    scrollToMenu(index) {
      this.scroller.menu.scrollToElement(this.$refs.menulist[index], 300, -100);
    },
    computeScroll() {
      const heights = [];
      const doms = this.$refs.goodslist;
      if (!doms) {
        return;
      }
      let h = 0;
      for (const dom of doms) {
        heights.push(h);
        h += dom.offsetHeight;
      }
      this.goodsHeight = heights;
    }
  },
  watch: {
    storeItem() {
      this.$nextTick(() => {
        this.computeScroll();
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.goods {
  position: absolute;
  left: 0;
  right: 0;
  top: 166px;
  bottom: 0;
  display: flex;
  padding-bottom: 50px;
  background-color: $white;
  .goods-left {
    width: 80px;
    background-color: #f3f5f7;
    overflow: hidden;
    .menu-wrap {
      position: relative;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      font-size: 12px;
      &.current {
        margin-top: -1px;
        background-color: $white;
        border-top: 1px solid #fff;
        & .menu-cell::after {
          border-color: $white;
        }
        & .menu-cell .menu-name {
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
          width: 15px;
          height: 15px;
          vertical-align: top;
        }
        .menu-name {
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
          .price {
            display: inline-block;
            vertical-align: middle;
            .new-price {
              font-size: 14px;
              line-height: 24px;
              color: $red;
              font-weight: 700;
            }
            .old-price {
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