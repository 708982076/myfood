<template>
  <div class="loading" v-if="show">
    <div class="loading__icon">
      <i class="icon iconfont icon-huanyihuan"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showtime: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      show: true,
      timer: ''
    }
  },
  created() {
    this.timer = setTimeout(() => {
      this.show = false;
    }, this.showtime);
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 5px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background: rgba(#000, .1);
    i {
      display: inline-block;
      color: rgba(#fff, .3);
      font-size: 20px;
      animation: rotate .8s infinite linear;
    }
  }
}
</style>
