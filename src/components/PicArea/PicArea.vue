<template>
  <div class="pic-area" @click="hidden">
    <div class="pic-area__title">{{page}}/{{images.length}}</div>
    <div class="pic-area__img-area" ref="area">
      <ul class="pic-area__content" :style="{width: area.wrapperWidth * images.length + 'px'}">
        <li :style="imgStyle(img)" v-for="img in images" :key="img"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import BS from 'better-scroll';

export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    startIndex:{
      type: Number,
      default: 0
    }
  },
  methods: {
    hidden() {
      this.$destroy()
    }
  },
  data() {
    return {
      index: 0,
      area: {},
      page: 1
    }
  },
  computed: {
    imgStyle() {
      return (img) => ({
        'background-image': `url(${img})`,
        'background-repeat': `norepeat`,
        'background-size': 'cover'
      })
    }
  },
  created() {
    this.$emit('created');
    this.$nextTick(() => {
      this.area = new BS(this.$refs.area, {
        scrollX: true,
        scrollY: false,
        click: true,
        swipeTime: 500,
        bounceTime: 300,
        snap: {
          loop: false,
        }
      });
      if (this.images.length === 1) {
        this.area.destroy()       
      }
      this.area.on('scrollEnd', () => {
        const { pageX } = this.area.getCurrentPage();
        let page = pageX+1;
        let imglen = this.images.length;
        this.page = page >= imglen ? imglen : page;
      });
      this.area.goToPage(this.startIndex, 0, 0);
    })
  },
  destroyed() {
    this.$emit('destroyed');
  }
}
</script>

<style lang="scss">
  .pic-area {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    &__title {
      color: #fff;
      text-align: center;
      line-height: 2;
      font-size: 18px;
    }
    &__img-area {
      position: absolute;
      width: 100%;
      top: 50%;
      height: 100vw;
      margin-top: -50vw;
      overflow: hidden;
    }
    &__content {
      width: 1000px;
      overflow: hidden;
      li {
        float: left;
        width: 100vw;
        height: 100vw;
        background: gray;
      }
    }
  }
</style>
