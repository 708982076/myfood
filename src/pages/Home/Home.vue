<template>
  <div class="home-page">
    <Header>
      <template #mid>
        <router-link to="/city" class="loc-link">
          <i class="el-icon-location icon-fff"></i>
          <span class="loc-name">{{ currentCity.name }}</span>
        </router-link>
      </template>
      <template #right>
        <router-link to="/search" slot="search" class="search-link">
          <i class="el-icon-search icon-midsize icon-fff"></i>
        </router-link>
      </template>
    </Header>
    <ShopList :storeList="storeList"></ShopList>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import ShopList from "@/components/ShopList/ShopList";
import { getStoreList } from "root/getData";
import { mapState, mapActions } from "vuex";
import { cookieUtils, removeStorage } from "lib/utils";
export default {
  components: {
    Header,
    ShopList
  },
  data() {
    return {
      storeList: [],
      city: {}
    };
  },
  async created() {
    const { pinyin, id } = this.$route.params;
    if (pinyin && id) {
      removeStorage("currentCity", { type: "session" });
    }
    const [storeList] = await Promise.all([
      getStoreList(),
      this.getPositionAction(this.$route.params)
    ]);
    this.storeList = Object.freeze(storeList.data);
    this.$router.replace(`/home/${this.currentCity.pinyin}`).catch(e => e);
  },
  mounted() {
    this.loading = false;
  },
  computed: {
    ...mapState(["currentCity"])
  },
  methods: {
    ...mapActions(["getPositionAction"])
  }
};
</script>
<style lang="scss">
.home-page {
  .loc-name {
    color: #fff;
  }
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