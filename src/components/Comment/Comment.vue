<template>
  <div class="comment" id="comment">
    <div class="seller-score">
      <div class="score-lf">
        <div class="score-data-lf">{{seller.score / 2}}</div>
        <div class="score-title-lf">商家评论</div>
      </div>
      <div class="score-mid">
        <div class="mid-t">
          <span class="mid-title">包装</span>
          <Star :score="seller.foodScore / 2"></Star>
          <span class="mid-score">{{(seller.foodScore / 2).toFixed(1)}}</span>
        </div>
        <div class="mid-b">
          <span class="mid-title">口味</span>
          <Star :score="seller.score / 2"></Star>
          <span class="mid-score">{{(seller.score / 2).toFixed(1)}}</span>
        </div>
      </div>
      <div class="score-rt">
        <div class="score-data-rt">{{seller.serviceScore}}</div>
        <div class="score-title-rt">配送评分</div>
      </div>
    </div>
    <div class="users-comment">
      <ul class="comment-list">
        <li class="comment-item" v-for="(comment, index) in comments" :key="index">
          <div class="item-lt">
            <img :src="comment.avatar" class="user-pic">
          </div>
          <div class="item-rt">
            <div class="item-rt-t">
              <span class="user-name">{{comment.username}}</span>
              <span class="date-info">{{ getDate(new Date(comment.rateTime)) }}</span>
            </div>
            <div class="item-rt-m">
              <Star :score="comment.score"/>
              <span class="delivery-time">{{comment.deliveryTime}}分钟送达</span>
            </div>
            <div class="item-rt-b">{{comment.text}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from "../Star/Star";
import { getComment } from "root/getData";
import { getDate } from "lib/utils";
export default {
  components: {
    Star
  },
  props: {
    seller: Object
  },
  methods: {
    getDate
  },
  data() {
    return {
      comments: []
    };
  },
  created() {
    this.id = +this.$route.params.id;
    getComment(this.id).then(res => {
      if (res.status == 1) {
        this.comments = res.data.comments;
      }
    });
  }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.comment {
  position: absolute;
  left: 0;
  right: 0;
  top: 166px;
  bottom: 0;
  background-color: #efefef;
  .seller-score {
    margin-top: 10px;
    position: relative;
    height: 100px;
    background-color: $white;
    border-bottom: 1px solid #eee;
    .score-lf {
      position: absolute;
      width: 26%;
      padding-top: 20px;
      text-align: center;
      .score-data-lf {
        color: orange;
        font-size: 28px;
      }
      .score-title-lf {
        font-size: 14px;
      }
    }
    .score-mid {
      margin-left: 26%;
      margin-right: 26%;
      padding-top: 26px;
      text-align: center;
      .mid-t,
      .mid-b {
        font-size: 0;
      }
      .mid-title {
        font-size: 14px;
      }
      .mid-score {
        font-size: 14px;
        color: orange;
      }
    }
    .score-rt {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 20px;
      width: 26%;
      text-align: center;
      border-left: 1px solid #aaa;
      .score-data-rt {
        color: #aaa;
        font-size: 28px;
      }
      .score-title-rt {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
  .users-comment {
    margin-top: 10px;
    background-color: $white;
    .comment-list {
      .comment-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        .item-lt {
          float: left;
          width: 50px;
          height: 50px;
          .user-pic {
            width: 100%;
          }
        }
        .item-rt {
          margin-left: 60px;
          .item-rt-t {
            font-size: 14px;
            .user-name {
              font-weight: 600;
            }
            .date-info {
              float: right;
            }
          }
          .item-rt-m {
            font-size: 14px;
          }
          .item-rt-b {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
