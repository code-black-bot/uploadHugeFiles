<template>
  <div>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "@/components/admin/tabBar"
export default {
  name: "index",
  components:{
    tabBar
  },
};
</script>

<style scoped>
  .index{
    text-align:left;
    font-size:14px;
    font-weight:bold;
    padding:10px;
  }
</style>
