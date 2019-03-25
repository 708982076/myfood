<template>
  <ul class="comments">
    <li class="comment-item" v-for="(cmt, i) in _comments" :key="i">
      <div class="comment-item__head">
        <img :src="cmt.userPicUrl" v-if="cmt.userPicUrl"/>
        <img src="@assets/img/default.jpg" v-else>
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
            v-for="(pic, i) in cmt.pictures" 
            :key="pic.smallPicUrl"
            @click="picByClick(cmt.pictures, i, $event)"
          >
            <img :src="pic.smallPicUrl"/>
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
  },
  methods: {
    picByClick(imgs, i) {
      imgs = imgs.map(item => {
        return item.bigPicUrl;
      })
      this.$emit('piclick', imgs, i);
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
    width: 15%;
    height: 50px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
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
    margin-left: 15%;
  }
  &__text {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.1;
  }
  &__img {
    overflow: hidden;
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
</style>
