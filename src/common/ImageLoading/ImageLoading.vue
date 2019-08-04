<template>
  <img src="@assets/img/image_loading.jpg" ref="img"/>
</template>
<script>

export default {
  props: ['src'],
  data() {
    return {
      newSrc: '@assets/img/image_loading.jpg'
    }
  },
  created() {
    let img = new Image();
    img.addEventListener('load', () => {
      this.$refs.img.src = this.src;
      img = null;
    })
    if (this.src) {
      img.src = this.src;
    }
  }
};

</script>