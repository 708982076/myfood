<template>
  <img :src="loadSrc"/>
</template>
<script>
import loadSrc from '@assets/img/image_loading.jpg';

export default {
  props: ['src'],
  data() {
    return {
      loadSrc
    }
  },
  created() {
    console.log(this.src);
  }
};

</script>