<template>
  <div class="shop-detail" id="shop-detail">
    <div class="detail-t">
      <div class="detail-item">
        <div class="detail-left">
          <i class="el-icon-location icon-midsize icon-margin-r"></i>
        </div>
        <div class="detail-right">
          <span>{{info.shopAddress}}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-left">
          <i class="el-icon-phone icon-midsize icon-margin-r"></i>
        </div>
        <div class="detail-right">
          <span v-for="(p, i) in phone" :key="i">{{p}}&nbsp;</span>
        </div>
      </div>
    </div>
    <div class="detail-c">
      <div class="detail-item">
        <div class="detail-left">
          <i class="el-icon-s-help icon-midsize icon-margin-r"></i>
        </div>
        <div class="detail-right">
          <span>配送服务：美团外卖</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-left">
          <i class="el-icon-message-solid icon-midsize icon-margin-r"></i>配送时间：
        </div>
        <div class="detail-right">
          <span v-if="serTime.morning">{{'上午：' + serTime.morning}}</span>
          <p v-if="serTime.afternoon">{{'下午：' + serTime.afternoon}}</p>
          <span v-if="!serTime.afternoon && !serTime.morning">随时配送</span>
        </div>
      </div>
    </div>
    <div class="shop-activity">
      <div class="detail-item">
        <div class="detail-left">
          <i class="el-icon-s-order icon-midsize icon-margin-r"></i>
        </div>
        <div class="detail-right">
          <span>{{info.tip}}</span>
        </div>
      </div>
      <ul v-for="(item, i) in _activityList" :key="i" class="activityList">
        <li>
          <img :src="item.iconUrl" class="detail-icon"/>
          <span class="detail-desc">{{item.actDesc}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from '@/components/Star/Star';
import {getStoreInfo} from 'root/getData';

export default {
  props: ['storeItem'],
  components: {
    Star
  },
  data() {
    return{
      info: []
    }
  },
  async created() {
    const {id} = this.$route.query;
    this.info = await getStoreInfo(id);;
  },
  computed: {
    serTime() {
      let [ morning, afternoon ] = this.info.serTime || [];
      return {
        morning,
        afternoon
      };
    },
    phone() {
      return this.info.shopPhone;
    },
    _activityList() {
      return this.info.activityList;
    }
  }
}
</script>

<style lang="scss">
  .shop-detail {
    position: absolute;
    left: 0;
    right: 0;
    top: 166px;
    bottom: 0;
    background-color: #fff;
    font-size: 14px;
    .icon-margin-r {
      margin-right: 5px;
    }
    .detail-c {
      padding: 15px 0; 
    }
    .detail-item {
      padding-left: 20px;
      padding-top: 15px;
      padding-bottom: 15px;
      overflow: hidden;
    }
    .detail-left {
      float: left;
    }
    .detail-right{
      overflow: hidden;
    }
    .activityList {
      padding-left: 20px; 
      li{
        line-height: 1.6;
      }
      .detail-icon {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        vertical-align: text-bottom;
      }
      .detail-desc {
        vertical-align: middle;
      }
    }
  }
</style>
