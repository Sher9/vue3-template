<!-- tag盒子 -->
<template>
  <div class="tags-div">
    <div
      v-if="contextmenuFlag"
      class="tags-contentmenu"
      :style="{ left: contentmenuX + 'px', top: contentmenuY + 'px' }"
    >
      <div class="item" @click="closeOthersTags">关闭其它</div>
      <div class="item" @click="closeAllTags">关闭所有</div>
    </div>
    <div class="tags-box">
      <el-tabs
        v-model="active"
        @contextmenu.native="handleContextmenu"
        :closable="tagLen !== 1"
        @tab-click="openTag"
        @edit="menuTag"
      >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in tagList"
          :label="item.name"
          :name="item.code"
        ></el-tab-pane>
      </el-tabs>
      <el-dropdown class="tags-menu">
        <el-button type="primary" size="small" style="border: none">
          更多
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="closeOthersTags">关闭其它</el-dropdown-item>
            <el-dropdown-item @click.native="closeAllTags">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup name="tags">
import useUserStore from "@/store/modules/user";

onMounted(() => {
  setActive();
});
const { proxy } = getCurrentInstance();
const active = ref("");
const contentmenuX = ref("");
const contentmenuY = ref("");
const contextmenuFlag = ref(false);
const tagList = computed(() => useUserStore().tagList);
const tagStore = computed(() => useUserStore().tag);
const navList = computed(() => useUserStore().navList);
const curNav = computed(() => useUserStore().curNav);
const tagLen = computed(() => tagList.value.length || 0);
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["setMenuList", "changeMenu"]);
// 监听当前路由
watch(
  () => contextmenuFlag.value,
  () => {
    window.addEventListener("mousedown", watchContextmenu);
  },
  { immediate: false }
);
//监听当前tag页
watch(
  () => tagStore.value,
  () => {
    setActive();
  }
);
const setActive = () => {
  active.value = tagStore.value.code;
};

const watchContextmenu = (event) => {
  if (event.target.className === "item") {
    return;
  }
  if (
    !proxy.$el.contains(event.target) ||
    event.button !== 0 ||
    event.target.className !== "tablist"
  ) {
    contextmenuFlag.value = false;
  }
  window.removeEventListener("mousedown", watchContextmenu);
};

const handleContextmenu = (event) => {
  let target = event.target;
  // 解决 https://github.com/d2-projects/d2-admin/issues/54
  let flag = false;
  if (target.className.indexOf("el-tabs__item") > -1) {
    flag = true;
  } else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
    target = target.parentNode;
    flag = true;
  }
  if (flag) {
    event.preventDefault();
    event.stopPropagation();
    contentmenuX.value = event.clientX;
    contentmenuY.value = event.clientY;
    contextmenuFlag.value = true;
  }
};

const menuTag = (value, action) => {
  if (action === "remove") {
    let { tag, key } = findTag(value);
    if (tag.path === tagStore.value.path) {
      let tagObject = tagList.value[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
      openTag(tagObject);
    }
    useUserStore().delTag(tagStore.value);
  }
};

const findTag = (value) => {
  let tag, key;
  tagList.value.map((item, index) => {
    if (item.code === value) {
      tag = item;
      key = index;
    }
  });
  return { tag: tag, key: key };
};

const openTag = (item) => {
  //防止当前标签页重复点击
  if (route.name === item.name || route.path === item.name) {
    return;
  }
  contextmenuFlag.value = false;
  let tag;
  if (item.index) {
    tag = tagList.value[item.index];
    useUserStore().setTag(tag);
  } else {
    tag = item;
  }
  //显示左侧菜单栏
  if (tag.parentId === "1") {
    //没有菜单
    emit("setMenuList", []);
    useUserStore().setNav(tag);
  } else {
    const nav = navList.value.find((item) => item.id === tag.navId);
    emit("setMenuList", nav.children);
    //选中左侧菜单栏
    emit("changeMenu", tag.path);
    useUserStore().setNav(nav);
  }
  router.push({
    path: tag.path,
  });
};

const closeOthersTags = () => {
  contextmenuFlag.value = false;
  let tag = tagList.value.find((item) => item.code === active.value);
  useUserStore().delTagOther(tagStore.value.path);
};

const closeAllTags = () => {
  contextmenuFlag.value = false;
  //系统切换，系统名跟着变
  useUserStore().delAllTag();
  emit("changeMenu", tagList.value[0].path);
  //防止当前标签页重复点击
  if (route.name === tagList.value[0].code) {
    return;
  } else {
    //系统切换
    if (curNav.value.navId !== tagList.value[0].navId) {
      const nav = navList.value.find((item) => item.id === tagList.value[0].navId);
      //系统切换，系统名跟着变
      useUserStore().setNav(nav);
      //系统切换，菜单跟着变
      emit("setMenuList", nav.children);
    }
    router.push({
      path: tagList.value[0].path,
    });
  }
};
</script>
<style lang="scss" scoped>
.tags-div {
  user-select: none;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-top: 1px solid #f6f6f6;
  width: 100%;
  .tags-contentmenu {
    position: fixed;
    width: 120px;
    background-color: #fff;
    z-index: 1024;
    border-radius: 5px;
    box-shadow: 1px 2px 10px #ccc;
    .item {
      cursor: pointer;
      font-size: 14px;
      padding: 5px 20px 5px 15px;
      color: #606266;
    }
  }

  .tags-box {
    position: relative;
    box-sizing: border-box;
    padding-right: 100px;
    padding-left: 15px;
    width: 100%;
    height: 40px;
  }
  .tags-menu {
    position: absolute !important;
    top: 5px;
    right: 15px;
    padding: 1px 0 0 15px;
    box-sizing: border-box;
  }
}
</style>
