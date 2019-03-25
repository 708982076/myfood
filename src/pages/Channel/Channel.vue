<template>
  <div class="channel-page">
    <Header :go-back="true"></Header>
    <!-- <ShopList :sellers="sellers"></ShopList> -->
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import ShopList from '@/components/ShopList/ShopList'

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
  }
}
</script>

<style lang="scss">
.channel-page{
  background-color: #fff;
}
</style>
