<template>
  <ul class="comment-label clear">
    <li class="comment-label__Itag" 
      :class="{ 'comment-label__Itag--active': index === i }"
      v-for="(label, i) in _labels" :key="i"
      @click="changeLabel(i, $event)"
    >{{label.content}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeLabel(i, e) {
      this.index = i;
      this.$emit('changelabel');
    }
  },
  data() {
    return {
      index: 0
    };
  },
  computed: {
    _labels() {
      return this.labels;
    }
  }
};
</script>

<style lang="scss">
.comment-label {
  padding: 20px 0;
  border-bottom: 1px solid #f3f3f3;
  &__Itag {
    margin: 3px 5px;
    padding: 0 10px;
    float: left;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    border: 1px solid #dbdbdb;
    color: #6b6b6b;
    border-radius: 20px;
    &--active {
      border: 1px solid #ffb511;
      background-color: #fffbf1;
      color: #ffb511;
    }
  }
}
</style>
