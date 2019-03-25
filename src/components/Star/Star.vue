<template>
  <span class="rating">
    <i :class="starClass(i)" v-for="i in 5" :key="i"></i>
  </span>
</template>

<script>
export default {
  props: {
    score: {
      type: Number
    }
  },
  methods: {
    starClass(num) {
      const score = this.score;
      const className =
        score >= num ? 'star-int' : (
            score + 1 - num >= 0.5 ? 'star-half' : 'star-no'
        );
      return {
        [className]: true
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.rating {
  margin-left: 5px;
  margin-right: 5px;
  i {
    display: inline-block;
    width: 12px;
    height: 12px;
  }
  .star-int {
    @include bg-image("star48_on");
  }
  .star-half {
    @include bg-image("star48_half");
  }
  .star-no {
    @include bg-image("star48_off");
  }
}
</style>


