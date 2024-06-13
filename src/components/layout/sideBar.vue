<template>
  <div class="menu-div" :style="{ width: widthValue }">
    <div class="title-div">
      <span v-show="!isCollapse">{{ curNav.name }}</span>
      <el-icon @click="showCollapse"
        ><component :is="$icon[isCollapse ? 'Expand' : 'Fold']"
      /></el-icon>
    </div>
    <el-menu
      :default-active="activeIndex"
      :collapse="isCollapse"
      background-color="#ffffff"
      class="menu-item"
      :style="{ height: heightValue + 'px' }"
    >
      <menuItem :menuList="menuList" @selectMenu="selectMenu"></menuItem>
    </el-menu>
  </div>
</template>

<script setup name="sideBar">
import { reactive, ref } from "vue";
import menuItem from "./menuItem.vue";
import useUserStore from "@/store/modules/user";

onMounted(() => {
  nextTick(() => {
    heightValue.value = document.getElementsByClassName("menu-div")[0].clientHeight - 60;
  });
});

const props = defineProps({
  menuList: {
    type: Array,
  },
});
const curNav = computed(() => useUserStore().curNav);

const heightValue = ref(0);
const data = reactive({
  widthValue: "240px",
  activeIndex: "",
  isCollapse: false,
});
const { widthValue, activeIndex, isCollapse } = toRefs(data);
const emit = defineEmits(["changeCollapseValue"]);
const router = useRouter();

// 监听当前路由
watch(
  () => router.currentRoute.value,
  (newValue) => {
    if (newValue && newValue !== "/") {
      activeIndex.value = newValue.path;
    }
  },
  { immediate: true }
);

//选择菜单跳转
const selectMenu = (menuItem) => {
  if (menuItem.path !== activeIndex.value) {
    activeIndex.value = menuItem.path;
    useUserStore().addTag({ navId: curNav.value.id, ...menuItem });
    router.push({ path: menuItem.path });
  }
};
//展开/折叠功能
const showCollapse = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    widthValue.value = "64px";
  } else {
    widthValue.value = "240px";
  }
  emit("changeCollapseValue", isCollapse.value);
};
</script>

<style lang="scss" scoped>
.menu-div {
  user-select: none;
  position: relative;
  transition: width 0.2s;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 100%;
  .title-div {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    transition: all 0.5s;
    color: #fff;
    background-color: #409eff;
    align-items: center;
    span {
      margin-left: 30px;
    }
    i {
      cursor: pointer;
      line-height: 64px;
      font-size: 20px;
    }
  }
  .menu-item {
    overflow: auto;
    transition: all 0.5s;
    height: calc(100% - 250px);
  }
}
</style>
