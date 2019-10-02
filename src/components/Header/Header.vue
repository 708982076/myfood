<template>
  <header class="nav-header">
    <div class="nav-header-slotleft">
      <slot name="left"></slot>
      <a href="javascript:history.back()" v-if="goBack" class="back">
        <i class="el-icon-back icon-midsize icon-fff"></i>
      </a>
    </div>
    <div class="nav-header-slotmid">
      <slot name="mid"></slot>
    </div>
    <div class="nav-header-slotright">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    goBack: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.nav-header {
  display: flex;
  height: 45px;
  color: #fff;
  overflow: hidden;
  padding: 0 10px;
  background-color: #409EFF;
  &-slotleft {
    display: flex;
    align-items: center;
    flex:1;
  }
  &-slotmid {
    display: flex;
    align-items: center;
    color: red;
  }
  &-slotright {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex:1;
  }
  .head-left {
    position: absolute;
    left: 0;
    top: 0;
    .back,
    .go-home {
      display: block;
      padding: 0 0.8rem;
      line-height: 2.4rem;
      .icon-fanhui,
      .icon-shouye {
        color: #fff;
        font-size: 1.1rem;
      }
    }
  }
  .select-city {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    text-align: center;
    line-height: 2.4rem;
  }
  .loc-header {
    font-size: 0.8rem;
    line-height: 2.4rem;
    text-align: center;
    .loc-link {
      display: inline-block;
    }
    .loc-name {
      color: #fff;
      vertical-align: middle;
    }
    .icon-daohangdizhi,
    .icon-jiantouyou {
      font-size: 0.6rem;
      color: #fff;
      vertical-align: middle;
    }
  }
  .head-right {
    position: absolute;
    right: 0;
    top: 0;
    .search-link {
      float: left;
      line-height: 2.4rem;
      padding: 0 15px;
      .icon-sousuo {
        color: #fff;
        font-size: 0.8rem;
      }
    }
    .account-link {
      float: left;
      line-height: 2.4rem;
      padding: 0 0.2rem;
      .icon-wode {
        color: #fff;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
