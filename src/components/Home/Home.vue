<template>
  <div class="home-page">
    <Header>
      <h2 class="loc-header" slot="loc-header">
        <router-link to="/city" class="loc-link">
          <i class="icon iconfont icon-daohangdizhi"></i>
          <span class="loc-name">信阳</span>
          <i class="icon iconfont icon-jiantouyou"></i>
        </router-link>
      </h2>
      <router-link to="/search" slot="search" class="search-link">
        <i class="icon iconfont icon-sousuo"></i>
      </router-link>
      <!-- <router-link :to="{path: isLogin ? '/home' : '/login'}" slot="account" class="account-link">
        <i class="icon iconfont icon-wode"></i>
      </router-link> -->
    </Header>
    <div class="nav-list">
      <router-link to="/channel" class="nav-item">
        <img src="http://p1.meituan.net/jungle/8b5e1702d4145ccf058ba5fb31008c5310912.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p1.meituan.net/jungle/12a9834827909fa55f54bce96e67470711250.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p1.meituan.net/jungle/83bfbcf07221cb1ccbcd9114e81ec7ac9209.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p1.meituan.net/jungle/e54f1fe77b0588d2dfe82a12e424108a9450.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
      <router-link to="/channel" class="nav-item">
        <img src="http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png" class="item-icon">
        <span class="item-title">美食</span>
      </router-link>
    </div>
    <div class="nearby-shop">
      <h2 class="title">—— 附近商家 ——</h2>
      <ShopList :sellers="sellers"></ShopList>
    </div>
  </div>
</template>

<script>
import Header from '../Header/Header';
import ShopList from '../ShopList/ShopList';
import { getNearbySeller } from 'root/getData';
import { mapState, mapActions, mapGetters } from 'vuex';
import { cookieUtils } from 'lib/utils';
export default {
  components: {
    Header,
    ShopList
  },
  created() {
    // this.guessCity.city || this.getCurrentCity()
    getNearbySeller().then(res => {
      this.sellers = res.data
    })
  },
  computed: {
    // ...mapState(['guessCity', 'isLogin']),
    // cityName() {
    //   return this.guessCity.city || this.currentCity.city
    // }
  },
  methods: {
    // ...mapActions(['getCurrentCity'])
  },
  data() {
    return {
      sellers: []
    }
  }
}
</script>
<style lang="scss">
  .home-page {
    .nav-list {
      background-color: #fff;
      padding-bottom: 20px;
      overflow: hidden;
      .nav-item {
        display: block;
        float: left;
        width: 25%;
        padding-top: 14px;
        text-align: center;
        .item-icon {
          display: block;
          margin: 0 auto;
          height: 2.5rem;
        }
        .item-title {
          font-size: 0.7rem;
        }
      }
    }
    .nearby-shop {
      margin-top: 10px;
      background-color: #fff;
      .title {
        padding: .5rem 0;
        font-size: 1rem;
        text-align: center;
      }
    }
  }
</style>