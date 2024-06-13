<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header> <top-title @setMenuList="setMenuList"></top-title></el-header>
      <el-container style="transition: all 0.5s">
        <el-aside :width="widthValue" v-show="isShow">
          <side-bar
            @changeCollapseValue="changeCollapseValue"
            :menuList="menuList"
            ref="menu"
          >
          </side-bar
        ></el-aside>
        <el-main
          ><tags
            @changeMenu="changeMenu"
            @setMenuList="setMenuList"
            v-show="isShow"
          ></tags>
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="names">
              <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import sideBar from "./components/layout/sideBar";
import topTitle from "./components/layout/topTitle";
import tags from "./components/layout/tags";
import useUserStore from "@/store/modules/user";
const widthValue = ref("240px");
const { proxy } = getCurrentInstance();

const tagList = computed(() => useUserStore().tagList);
const menuList = ref([]);
const names = ref("");
const isShow = ref(true);
watch(
  () => tagList.value,
  (value) => {
    if (value && value.length > 0) {
      let nameList = [];
      value.forEach((item) => {
        nameList.push(item.path.slice(item.path.lastIndexOf("/") + 1));
      });
      names.value = nameList.join(",");
    }
  },
  { immediate: true, deep: true }
);

const setMenuList = (data) => {
  useUserStore().setMenuList(data);
  menuList.value = data;
  if (menuList.value.length === 0) {
    isShow.value = false;
  } else {
    isShow.value = true;
  }
};

const changeCollapseValue = (value) => {
  if (value) {
    widthValue.value = "64px";
  } else {
    widthValue.value = "240px";
  }
};
const changeMenu = (value) => {
  proxy.$refs.menu.activeIndex = value;
};
</script>

<style scoped>
.router-view {
  padding: 0 10px;
  height: calc(100% - 64px);
  background: #fff;
  margin: 10px;
}
</style>
