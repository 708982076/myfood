<template>
  <div class="shop-info">
    <router-link clsss="shop-wrapper" :to="{ path: '/store', query:{ id: store._id } }">
      <div class="avatar">
        <el-image :src="store.avatar"></el-image>
      </div>
      <div class="info">
        <h2 class="shop-title">{{store.name}}</h2>
        <div class="shop-mid">
          <span class="mid-left">
            <Star :score="store.score"></Star>
            <span class="sell-count">月销售{{store.sellCount}}</span>
          </span>
          <span class="mid-right">
            <span class="delivery-time">{{store.deliveryTime}}min</span>
            <span>|</span>
            <span class="distance">{{store.distance}}</span>
          </span>
        </div>
        <div class="shop-mid-btm">
          <span class="min-price">
            起送价￥{{store.minPrice}}
            <span class="vertical">|</span>
          </span>
          <span class="delivery-price">配送￥{{store.deliveryPrice}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Star from "../Star/Star";

export default {
  components: {
    Star
  },
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';

.shop-info {
  height: 80px;
  padding: 8px;
  overflow: hidden;
  & + & {
    border-top: 1px solid #ccc;
  }
  .avatar {
    float: left;
    width: 100px;
    height: 75px;
    border: 1px solid #ccc;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .info {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    .shop-title {
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      @include breakPoint();
    }
    .shop-mid span,
    .shop-mid-btm span {
      color: gray;
    }
    .shop-mid {
      flex: 1;
      margin: 6px 0;
      .mid-left {
        float: left;
      }
      .mid-right {
        float: right;
        color: #fff;
      }
    }
    .shop-mid-btm {
      flex: 1;
      .min-price {
        float: left;
      }
      .vertical {
        // margin-right: 7px;
      }
      .delivery-price {
        float: left;
      }
      .description {
        float: right;
        background-color: orange;
        color: #333;
      }
    }
  }
}
</style>
