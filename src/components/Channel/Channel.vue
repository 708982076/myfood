<template>
  <div class="channel-page">
    <Header :go-back="true"></Header>
    <ShopList :sellers="sellers"></ShopList>
  </div>
</template>

<script>
import {getNearbySeller} from 'root/getData'
import Header from '../Header/Header'
import ShopList from '../ShopList/ShopList'
export default {
  data() {
    return {
      sellers: [] 
    }
  },
  components: {
    Header,
    ShopList
  },
  created() {
    getNearbySeller().then(res => {
      this.sellers = res.data
    })
  }
}
</script>

<style lang="scss">
.channel-page{
  background-color: #fff;
}
</style>
