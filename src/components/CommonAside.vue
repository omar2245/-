<template>
  <el-aside :width="width">
    <el-menu
      :default-active="'/home'"
      background-color="#333"
      text-color="white"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="!isCollapse">後台管理系統</h3>
      <h3 v-show="isCollapse">後台</h3>

      <el-menu-item
        :key="item.path"
        :index="item.path"
        @click="direct(item.path)"
        v-for="item in noChildren"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu
        v-for="item in hasChildren"
        :key="item.path"
        :index="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.path"
            :index="subItem.path"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const menuStore = useMenuStore();
const { isCollapse, menuList } = storeToRefs(menuStore);
const router = useRouter();
const width = computed(() => (isCollapse.value ? "64px" : "180px"));
const noChildren = computed(() =>
  menuList.value.filter((item) => !item.children)
);
const hasChildren = computed(() =>
  menuList.value.filter((item) => item.children)
);

function direct(path) {
  router.push(path);
}
</script>

<style scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
.el-menu {
  border-right: none;
  h3 {
    padding: 24px 0;
    line-height: 24px;
    text-align: center;
    color: #fff;
  }
  .link {
    text-decoration: none; /* Removes the underline */
    color: inherit;
    display: flex;

    align-items: center;
  }
}
.el-aside {
  min-height: 100%;
  background-color: #333;
}
</style>
