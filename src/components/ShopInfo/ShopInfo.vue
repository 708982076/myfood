<template>
  <div class="shop-info">
    <router-link clsss="shop-wrapper" :to="{ path: '/store', query:{ id: store._id } }">
      <div class="avatar">
        <img :src="store.avatar">
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
          <i class="description">{{store.description}}</i>
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
.shop-info {
  margin: 0 0.5rem;
  padding: 0.5rem 0;
  height: 3.5rem;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  .avatar {
    position: absolute;
    width: 5rem;
    height: 3.5rem;
    border: 1px solid #ccc;
    overflow: hidden;
    img {
        width: 100%;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    margin-left: 5.3rem;
    height: 100%;
    justify-content: center;
    text-align: left;
    .shop-title {
      flex: 1;
      font-size: .8rem;
      font-weight: bold;
    }
    .shop-mid span,
    .shop-mid-btm span {
      color: gray;
    }
    .shop-mid {
      flex: 1;
      margin-top: 0.3rem;
      .mid-left {
        float: left;
        line-height: 2;
        font-size: 0.6rem;
      }
      .mid-right {
        float: right;
        line-height: 2;
        font-size: 0.6rem;
        color: #fff;
      }
    }
    .shop-mid-btm {
      flex: 1;
      margin-top: 0.2rem;
      font-size: 0.7rem;
      .min-price {
        float: left;
      }
      .vertical {
        margin-right: 7px;
      }
      .delivery-price {
        float: left;
      }
      .description {
        float: right;
        padding: 0.1rem 0.2rem;
        background-color: orange;
        color: #333;
      }
    }
  }
}
</style>
