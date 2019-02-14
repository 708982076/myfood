<template>
  <div class="shop-info">
    <div class="avatar">
      <router-link :to="{name: 'store', params:{id: seller.id}}">
        <img :src="seller.avatar">
      </router-link>
    </div>
    <div class="info">
      <router-link :to="{name: 'store', params:{id: seller.id}}">
        <h2 class="shop-title">{{seller.name}}</h2>
        <div class="shop-mid clear">
          <span class="mid-left">
            <Star :score="seller.score / 2"></Star>
            <span class="sell-count">
              月销售{{seller.sellCount}}
            </span>
          </span>
          <span class="mid-right">
            <span class="delivery-time">
              {{seller.deliveryTime}}min
            </span>
            <span>|</span>
            <span class="distance">
              {{seller.distance}}
            </span>
          </span>
        </div> 
        <div class="shop-mid-btm clear">
          <span class="min-price">
            起送价￥{{seller.minPrice}}
            <span class="vertical">|</span>
          </span>
          <span class="delivery-price">
            配送￥{{seller.deliveryPrice}}
          </span>
          <i class="description">{{seller.description}}</i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Star from "../Star/Star";
export default {
  components: {
    Star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
  .shop-info{
    margin: 0 .5rem;
    padding: .5rem 0;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    .avatar {
      position: absolute;
      width: 5rem;
      height: 3.5rem;
      border: 1px solid #ccc;
      overflow: hidden;
      a {
        display: block;
        img {
          width: 100%;
        }
      }
    }
    .info {
      margin-left: 5.5rem;
      text-align: left;
      h2 {
        font-size: .9rem;
        font-weight: bold;
      }
      .shop-mid{
        margin-top: .2rem;
        .mid-left {
          float: left;
          font-size: .6rem; 
        }
        .mid-right {
          margin-top: .1rem;
          float: right;
          font-size: .6rem; 
        }
      }
      .shop-mid-btm {
        margin-top: .2rem;
        font-size: .7rem; 
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
          padding: .1rem .2rem;
          background-color: royalblue;
          color: #fff;
        }
      }
    }
  }
</style>
