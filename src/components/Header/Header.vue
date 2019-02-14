<template>
  <header class="nav-header">
    <div class="head-left">
      <slot name="go-home"></slot>
      <a href="javascript:history.back()" v-if="goBack" class="back">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </div>
    <slot name="select-city"></slot>
    <slot name="loc-header"></slot>
    <slot name="search-bar"></slot>
    <div class="head-right">
      <slot name="search"></slot>
      <slot name="account"></slot>
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
    },
    data() {
      return {
        msg: '111'
      }
    }
  }
</script>

<style lang="scss">
  header.nav-header{
    position: relative;
    height: 2.4rem;
    color: #fff;
    overflow: hidden;
    background-color:#06c1ae;
    .head-left{
      position: absolute;
      left: 0;
      top: 0;
      .back, .go-home{
        display: block;
        padding: 0 .8rem;
        line-height: 2.4rem;
        .icon-fanhui, .icon-shouye{
          color: #fff;
          font-size: 1.1rem;
        }
      }
    }
    .search-bar{
      position: relative;
      margin-left: 3rem;
      margin-right: 1rem;
      margin-top: .4rem;
      height: 1.5rem;
      border-radius: 5px;
      overflow: hidden;
      .search-input {
        display: block;
        width: 100%;
        height: 1.5rem;
        opacity: .7;
        text-indent: .4rem
      }
      .search-input:focus{
        opacity: 1;
      }
    }
    .select-city{
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
      .loc-link{
        display: inline-block;
      }
      .loc-name {
        color: #fff;
        vertical-align: middle;
      }
      .icon-daohangdizhi, .icon-jiantouyou{
        font-size: 0.6rem;
        color: #fff;
        vertical-align: middle;
      }
    }
    .head-right{
      position: absolute;
      right: 0;
      top: 0;
      .search-link {
        float: left;
        line-height: 2.4rem;
        padding: 0 0.2rem;
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
