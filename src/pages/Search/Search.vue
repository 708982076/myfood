<template>
  <div class="search-page">
    <Header :go-back="true">
      <template #mid>
        <div class="search-bar" slot="search-bar">
          <input type="text" class="search-input" placeholder="肯德基，输入其中一字即可搜索到" 
            v-model.trim="q" size="100"/>
        </div>
      </template>
    </Header>
    <div class="search-content">
      <SeachList :tabItems="tabItems" :name="name"></SeachList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import SeachList from "@/components/SeachList/SeachList";
import { debounce } from "lib/utils";
import { storeWordSerach, getStoreList } from "root/getData";

export default {
  components: {
    Header,
    SeachList
  },
  async created() {
    const {data} = await getStoreList();
    this.guesslike_stores = Object.freeze(data);
    this.nearby_stores = data.slice().reverse();
  },
  data() {
    return {
      q: "",
      search_stores: [],
      guesslike_stores: [],
      nearby_stores: [],
      name: 'nearby'
    };
  },
  computed: {
    tabItems() {
      return [{
        label: '附近',
        name: 'nearby',
        data: this.nearby_stores
      }, {
        label: '猜你喜欢',
        name: 'guesslike',
        data: this.guesslike_stores
      }, {
        label: '搜索结果',
        name: 'seach',
        data: this.search_stores
      }]
    }
  },
  watch: {
    q: {
      handler: debounce(async function(n) {
        const {data} = await storeWordSerach(encodeURIComponent(n));
        this.name = "seach";
        this.search_stores = Object.freeze(data);
      }, 500)
    }
  }
};
</script>

<style lang="scss">
.search-page {
  .search-bar {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    height: 30px;
    overflow: hidden;
    .search-input {
      display: block;
      border-radius: 5px;
      width: 100%;
      height: 30px;
      opacity: 0.7;
      text-indent: 1em;
    }
    .search-input:focus {
      opacity: 1;
    }
  }
  .search-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 0;
    background-color: #fff;
  }
}
</style>
