<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <el-header class="header">
          <common-header />
        </el-header>
        <el-main class="right-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
</script>

<style scoped lang="less">
.common-layout,
.lay-container {
  min-height: 100vh;
  background-color: #e3e2e2;
}
.header {
  background-color: #ffffff;
}
</style>
<style>
h1,
h2,
h3,
span,
div,
tr,
td,
p {
  margin: 0;
  padding: 0;
  font-family: Inter, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
</style>
