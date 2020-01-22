<template>
  <el-tabs type="border-card" :value="name" stretch>
    <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabItems" :key="item.name">
      <div v-if="item.data.length == 0" style="text-align: center">无结果</div>
      <ShopInfo v-else v-for="store in item.data" :store="store" :key="store.id"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import ShopInfo from '@/components/ShopInfo/ShopInfo';
  export default {
    components: {
      ShopInfo
    },
    props: {tabItems: Array, name: String}
  }
</script>