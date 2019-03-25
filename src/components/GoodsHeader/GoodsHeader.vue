<template>
  <div class="store-header" id="store-header">
    <div class="background">
      <img :src="storeItem.avatar">
    </div>
    <div class="header-hd clear">
        <div class="avatar-wrap">
          <img :src="storeItem.avatar">
        </div>
        <div class="info-wrap">
            <div class="info-title">
                <span class="brand"></span>
                <span class="info-name">{{storeItem.name}}</span>
            </div>
            <div class="info-desc">
              美团外卖 / {{storeItem.deliveryTime}}分钟到达
            </div>
        </div>
    </div>
    <div class="header-ft">
      <i class="bulletin"></i>
      <span class="text">{{storeItem.bulletin}}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    storeItem: {
      type: Object,
      required: true
    }
  },
  created(){
    this.mapClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';
.store-header {
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  .header-hd{
    position: relative;
    padding: 20px;
    .avatar-wrap {
      float: left;
      margin-right: 14px; 
      img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 2px;
      }
    }
    .info-wrap {
      .info-title { 
        font-size: 0;
        .brand{
          margin-right: 6px;
          display: inline-block;
          width: 30px;
          height: 20px;
          border-radius: 2px;
          @include bg-image('brand');
          background-size: 30px 20px; 
          vertical-align: middle;
        }
        .info-name{
          font-size: 16px;
          color: $white;
          font-weight: bold;
          vertical-align: middle;
        }
      }
      .info-desc{
        font-size: 12px;
        color: $white;
        font-weight: 200;
        margin-top: 10px;
      }
    }
  }
  .header-ft{
    position: relative;
    padding: 0 10px;
    height: 24px;
    background-color: rgba(7, 17, 27, 0.2);
    color: $white;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .bulletin{
      display: inline-block;
      font-size: 0;
      width: 22px;
      height: 12px;
      margin-right: 2px;
      @include bg-image('bulletin');
      background-size: 100% 100%;  
      vertical-align: middle;
    }
    .text{
      color: $white;
      font-size: 10px;
      line-height: 24px;
      font-weight: 200;
      vertical-align: middle;
    }
  }
  .background{
    position: relative;
    filter: blur(8px);
    opacity: .6;
    img {
      position: absolute;
      margin-top: -30%;
      width: 100%;
    }
  }
}
</style>
