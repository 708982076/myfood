<template>
  <div class="comment-label clear">
    <el-badge type="primary" :max="99"
      :value="+label.count" v-for="(label, i) in _labels" :key="i"
      class="comment-label__Itag"
    >
      <el-button size="small" @click="changeLabel(i, $event)">{{label.content}}</el-button>
    </el-badge>
  </div>
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
      return this.labels.map((e) => {
        return {
          ...e,
          content: e.content.match(/[^()\d]+/)[0],
          count: e.content.match(/\d+/)[0]
        }
      })
    }
  }
};
</script>

<style lang="scss">
.comment-label {
  padding: 20px 0;
  border-bottom: 1px solid #f3f3f3;
  &__Itag {
    margin-right: 25px;
    margin: 5px 12px;
  }
}
</style>
