<template>
  <div class="search-page">
    <Header :go-back="true">
      <div class="search-bar" slot="search-bar">
        <input type="text" class="search-input" placeholder="肯德基，输入其中一字即可搜索到" 
        v-model.trim="q"
      >
      </div>
    </Header>
    <div class="search-content">
      <ShopInfo v-for="store in stores" :store="store" :key="store._id"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import ShopInfo from "@/components/ShopInfo/ShopInfo";
import { debounce } from "lib/utils";
import { storeWordSerach } from "root/getData";

export default {
  components: {
    Header,
    ShopInfo
  },
  data() {
    return {
      q: "",
      stores: []
    };
  },
  watch: {
    q: {
      handler: debounce(async function(n) {
        const {data, code} = await storeWordSerach(encodeURIComponent(n));
        if (code === 0) {
          this.stores = data;
        }
      }, 500)
    }
  }
};
</script>

<style lang="scss">
.search-page {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-top: 2.4rem;
  background-color: #fff;
  .no-res {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -7px;
    margin-right: -7px;
    font-size: 14px;
  }
}
</style>
