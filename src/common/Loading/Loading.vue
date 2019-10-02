<template>
  <div class="loading" v-loading.fullscreen="loading" v-show="loading"></div>
</template>
<script>
export default {
  name: 'Loading',
  data() {
    return {
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }
}
</script>
