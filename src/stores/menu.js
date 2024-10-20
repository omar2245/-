import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const isCollapse = ref(false);
  let token = ref("");
  let menuList = ref([]);

  function updateMenuList(val) {
    menuList.value = val;
  }

  return { isCollapse, token, menuList, updateMenuList };
});
