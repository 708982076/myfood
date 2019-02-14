<template>
  <span class="rating">
    <i :class="starClass(1)"></i>
    <i :class="starClass(2)"></i>
    <i :class="starClass(3)"></i>
    <i :class="starClass(4)"></i>
    <i :class="starClass(5)"></i>
  </span>
</template>

<script>
export default {
  props: {
    score: Number
  },
  methods: {
    starClass(num) {
      let score = this.score
      let className = num < score ? 'star-int' : num - 1 < score ? 'star-half' : 'star-no'
      return {
        [className]: true
      }
    }
  }
}
</script>

<style lang="scss">
  .rating{
    font-size: 10px;
    margin-left: 5px;
    margin-right: 5px; 
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-image: url('http://xs01.meituan.net/waimai_i/img/sprite/newstars.ae33dbae.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .star-int{
      background-position-x: 0; 
    }
    .star-half {
      background-position-x: -13px; 
    }
    .star-no {
      background-position-x: -26px; 
    }
  }
</style>


