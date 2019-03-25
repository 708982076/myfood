<template>
  <div class="comment" id="comment" ref="scrollWrapper">
    <div class="comment-wrapper">
      <div class="seller-score">
        <div class="score-lf">
          <div class="score-data-lf">{{storeItem.score || 0}}</div>
          <div class="score-title-lf">商家评论</div>
        </div>
        <div class="score-mid">
          <div class="min-wraper">
            <div class="mid-t">
              <span class="mid-title">包装</span>
              <Star :score="storeItem.foodScore"></Star>
              <span class="mid-score">{{storeItem.foodScore || 0}}</span>
            </div>
            <div class="mid-b">
              <span class="mid-title">口味</span>
              <Star :score="storeItem.score"></Star>
              <span class="mid-score">{{storeItem.score || 0}}</span>
            </div>
          </div>
        </div>
        <div class="score-rt">
          <div class="score-data-rt">{{storeItem.serviceScore || 0}}</div>
          <div class="score-title-rt">配送评分</div>
        </div>
      </div>
      <div class="users-comment">
        <CommentLabel :labels="labels" @changelabel="changelabel"/>
        <CommentItem :comments="comments" @piclick="piclick"/>
      </div>
    </div>
    <PicArea v-if="show" @created="disable" @destroyed="destroyed" v-bind="imgObj"/>
    <Loading/>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import Star from "@/components/Star/Star";
import Loading from "@/components/Loading/Loading";
import { getStoreComment } from "root/getData";
import { debounce } from 'lib/utils';
import CommentLabel from "@/components/CommentLabel/CommentLabel";
import CommentItem from "@/components/CommentItem/CommentItem";
import PicArea from "@/components/PicArea/PicArea";
export default {
  components: {
    Star,
    CommentLabel,
    CommentItem,
    PicArea,
    Loading
  },
  props: {
    storeItem: {
      type: Object,
      required: true
    }
  },
  async created() {
    const { id } = this.$route.query;
    const { data, code } = await getStoreComment(id);
    if (code === 0) {
      let flag = true;
      const { labels, comments } = data;
      this.labels = labels;
      this.comments = comments;
      this.$nextTick(() => {
        this.scroller = new Bscroll(this.$refs.scrollWrapper, {
          bounceTime: 300,
          click: true,
          probeType: 3,
          pullUpLoad: {
            threshold: 50
          }
        });

        this.scroller.on("pullingUp", () => {
          this.comments = this.comments.concat(comments);
          this.$nextTick(() => {
            this.scroller.refresh();
            this.scroller.finishPullUp();
          })
        });
      });
    }
  },
  methods: {
    disable() {
      this.scroller.disable();
    },
    destroyed() {
      this.scroller.enable();
      this.show = false;
    },
    piclick(images, i) {
      this.imgObj.images = images;
      this.imgObj.startIndex = i;
      this.show = true;
    },
    changelabel() {
      this.comments = this.breakArr(this.comments);
    },
    breakArr(arr) {
      arr = arr.slice();
      const len = arr.length;
      let i = len;
      let rand = 0;
      let temp;
      while (--i && i !== (rand = Math.floor(Math.random() * len))) {
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
      return arr;
    }
  },
  data() {
    return {
      comments: {},
      scroller: Bscroll,
      labels: [],
      comments: [],
      show: false,
      imgObj: {},
      loading: true
    };
  },
  beforeDestroy() {
    this.scroller.destroy();
  }
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.comment {
  position: absolute;
  left: 0;
  right: 0;
  top: 166px;
  bottom: 0;
  background-color: #efefef;
  overflow: hidden;
  .seller-score {
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
      .min-wraper {
        display: inline-block;
      }
      .mid-t,
      .mid-b {
        font-size: 0;
        text-align: left;
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
    padding: 0 20px;
    margin-top: 10px;
    background-color: #fff;
  }
}
</style>
