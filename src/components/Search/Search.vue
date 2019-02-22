<template>
  <div class="search-page">
    <Header :go-back="true">
      <div class="search-bar" slot="search-bar">
        <input type="text" class="search-input" placeholder="店铺、商品名称" v-model.trim="q">
      </div>
    </Header>
    <ShopList :sellers="sellers"></ShopList>
    <div class="no-res" v-show="!sellers.length">
      无结果
    </div>
  </div>
</template>

<script>
import {jsonp} from 'root/getData'
import Header from '../Header/Header'
import ShopList from '../ShopList/ShopList'
import {debounce, getDate} from 'lib/utils'
export default {
  components: {
    Header,
    ShopList
  },
  data() {
    return {
      q: '',
      sellers: []
    }
  },
  created() {
    this.$watch('q', debounce(q => {
      if (q) {
        jsonp('/nearbySeller', {q}, null).then(res => {
          this.sellers = res 
        }).catch(e => console.log(e))
      }
    }, 200))
  }

}
</script>

<style lang="scss">
  .search-page{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    .no-res{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -7px;
      margin-right: -7px;
      font-size: 14px;
    }
  }
</style>
