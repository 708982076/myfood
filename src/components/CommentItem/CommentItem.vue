<template>
  <ul class="comments">
    <li class="comment-item" v-for="(cmt, i) in _comments" :key="i">
      <div class="comment-item__head">
        <el-avatar :src="cmt.userPicUrl"></el-avatar>
      </div>
      <div class="comment-item__content">
        <div class="comment-item__cont">
          <div class="comment-item__item">
            <span class="comment-item__id">{{cmt.userName}}</span>
            <span class="comment-item__time">{{cmt.commentTime}}</span>
          </div>
          <span class="comment-item__deliveryTime">{{cmt.deliveryTime}}</span>
        </div>
        <div class="comment-item__text">{{cmt.content}}</div>
        <ul class="comment-item__img">
          <li 
            v-for="pic in cmt.pictures" 
            :key="pic.smallPicUrl"
          >
            <el-image
              :src="pic.smallPicUrl" 
              :preview-src-list="cmt.pictures.map(e => e.bigPicUrl)">
            </el-image>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  computed: {
    _comments() {
      return this.comments;
    }
  }
};
</script>

<style lang="scss">
.comments {
  margin-top: 20px;
}
.comment-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
  overflow: hidden;
  &:not(:first-of-type) {
    padding-top: 10px;
  }
  &__title {
    overflow: hidden;
  }
  &__head {
    float: left;
    height: 50px;
    margin-right: 20px;
  }
  &__item {
    line-height: 14px;
  }
  &__id {
    font-size: 16px;
    font-weight: bold;
  }
  &__time {
    float: right;  
  }

  &__time,
  &__deliveryTime {
    color: #6b6b6b;
    font-size: 14px;
  }
  &__deliveryTime {
    font-size: 12px;
  }
  &__content {
    overflow: hidden;
  }
  &__text {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.1;
  }
  &__img {
    overflow: hidden;
    .el-icon-circle-close {
      color: rgba(255,255,255,.8);
    }
    li {
      float: left;
      width: 90px;
      height: 90px;
      margin-right: 5px;
      margin-bottom: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.loadupitem {
  text-align: center;
  // background-color: #000;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(#000, .5);
    font-size: 20px;
    animation: rotate .8s infinite linear;
  }
}
</style>
