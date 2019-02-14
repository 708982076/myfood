<template>
  <div class="shop-detail" id="shop-detail">
    <div class="detail-t">
      <div class="shop-tel">
        <i class="icon iconfont icon-kefu"></i>
        13939721112
      </div>
      <div class="shop-address">
        <i class="icon iconfont icon-dizhiguanli"></i>
        店铺地址：{{address}}
      </div>
    </div>
    <div class="detail-b">
      <div class="business-time">
        <i class="icon iconfont icon-daishouhuo"></i>
        {{business}}
      </div>
      <div class="service-type">
        <i class="icon iconfont icon-dingdan"></i>
        配送服务：{{seller.description}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    seller: Object
  },
  computed: {
    address() {
        return this.seller.infos && this.seller.infos[2] 
    },
    business() {
        return this.seller.infos && this.seller.infos[3]
    }
  }
}
</script>

<style lang="scss">
  .shop-detail {
    margin-top: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 166px;
    bottom: 0;
    background-color: #efefef;
    font-size: 16px;
    .icon-kefu,
    .icon-dizhiguanli,
    .icon-daishouhuo,
    .icon-dingdan{
      font-size: 20px;
      margin-right: 10px;
    }
    .detail-t{
      background-color: #fff;
      .shop-tel,
      .shop-address {
        padding: 15px;
      }
    }
    .detail-b {
      margin-top: 10px;
      background-color: #fff;
      .business-time, .service-type{
        padding: 15px;
      }
    }
  }
</style>
