<template>
  <div class="home-page">
    <Header>
      <h2 class="loc-header" slot="loc-header">
        <router-link to="/city" class="loc-link">
          <i class="icon iconfont icon-daohangdizhi"></i>
          <span class="loc-name">{{ currentCity.name }}</span>
          <i class="icon iconfont icon-jiantouyou"></i>
        </router-link>
      </h2>
      <router-link to="/search" slot="search" class="search-link">
        <i class="icon iconfont icon-sousuo"></i>
      </router-link>
    </Header>
    <ShopList :storeList="storeList"></ShopList>
    <Loading/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';
import ShopList from '@/components/ShopList/ShopList';
import Loading from '@/components/Loading/Loading';
import { getStoreList } from 'root/getData';
import { mapState, mapActions } from 'vuex';
import { cookieUtils, removeStorage } from 'lib/utils';
export default {
  components: {
    Header,
    ShopList,
    Loading
  },
  data() {
    return {
      storeList: [],
      city: {}
    }
  },
  async created() {
    const { pinyin, id } = this.$route.params
    if ( pinyin && id ) {
      removeStorage('currentCity', { type: 'session' });
    }
    const [ storeList ] = await Promise.all([ 
      getStoreList(), 
      this.getPositionAction(this.$route.params) 
    ]);
    
    this.storeList = storeList.data

    this.$router.replace(`/home/${this.currentCity.pinyin}`);
  },
  computed: {
    ...mapState(['currentCity']),
    // cityName() {
    //   return this.guessCity.city || this.currentCity.city
    // }
  },
  methods: {
    ...mapActions(['getPositionAction'])
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
  }
</style>