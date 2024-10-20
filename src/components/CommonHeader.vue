<template>
  <div class="header">
    <div class="l-content">
      <el-button :icon="Fold" @click="handleCollapse"> </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="bread">
          首頁
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="28"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        /></span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item>個人中心</el-dropdown-item> -->
            <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fold } from "@element-plus/icons-vue";
import { useMenuStore } from "@/stores/menu";
import { useRouter } from "vue-router";

const menuStore = useMenuStore();
const router = useRouter();

function handleLogout() {
  router.replace("/login");
}
function handleCollapse() {
  menuStore.isCollapse = !menuStore.isCollapse;
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    padding: 8px;
    border: 0;
    margin-right: 20px;
  }
}
.icons {
  width: 20px;
  height: 20px;
  color: black;
}
</style>
