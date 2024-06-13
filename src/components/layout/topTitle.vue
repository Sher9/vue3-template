<template>
  <div class="title-div">
    <div class="logo-div">
      <img src="../../assets/img/logo.png" />
      <span>管理后台模板</span>
    </div>

    <div class="right-div">
      <div class="nav-div">
        <div
          class="nav-item"
          v-for="nav in navList"
          :key="nav.id"
          :class="{ active: nav.id === curNav.id }"
          @click="selectNav(nav)"
        >
          {{ nav.name }}
        </div>
      </div>
      <div class="info-div">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup name="topTitle">
import { getMenusAndButtons } from "@/api/user";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const navList = ref([]);
const userInfo = computed(() => useUserStore().userInfo);
const curNav = computed(() => useUserStore().curNav);
const tag = computed(() => useUserStore().tag);
const router = useRouter();
const emit = defineEmits(["setMenuList"]);

//获取菜单和按钮权限
const initData = () => {
  getMenusAndButtons({ userId: userInfo.value.userId }).then((res) => {
    const systemList = res.data.data.auth_menu || [];
    const buttons = res.data.data.auth_button || [];
    useUserStore().setNavList(systemList);
    useUserStore().setButtons(buttons);
    useUserStore().getDicData();
    //默认第一个系统，第一个菜单
    if (systemList.length > 0) {
      if (!tag.value || tag.value.path === "/") {
        const nav = systemList[0];
        useUserStore().setNav(nav);
        setMenuList(nav);
      } else {
        if (curNav.value.children && curNav.value.children.length > 0) {
          const menus = curNav.value.children;
          emit("setMenuList", menus);
        } else {
          //没有菜单
          emit("setMenuList", []);
        }
      }
      navList.value = systemList;
    }
  });
};

const selectNav = (nav) => {
  if (nav.id === curNav.id) {
    return;
  }
  useUserStore().setNav(nav);
  setMenuList(nav);
};

const setMenuList = (nav) => {
  if (nav.children && nav.children.length > 0) {
    const menus = nav.children;
    //切换系统，默认第一个菜单
    useUserStore().addTag({ navId: nav.id, ...menus[0] });
    router.push({
      path: tag.value.path,
    });
    emit("setMenuList", menus);
  } else {
    emit("setMenuList", []);
    //ifram嵌套
    if (nav.category === "3") {
      router.push({
        name: "myiframe",
        path: "/myiframe",
        query: {
          url: nav.path,
        },
      });
    } else {
      //没有菜单
      router.push({
        path: nav.path,
      });
    }
  }
};

const logout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      useUserStore().logOut();
    })
    .catch((e) => {
      console.log(e);
    });
};

initData();
</script>
<style lang="scss" scoped>
.title-div {
  height: 60px;
  line-height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .logo-div {
    height: 60px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    img {
      height: 38px;
      display: inline-block;
      vertical-align: middle;
    }
    span {
      font-size: 20px;
      padding: 0 10px;
      display: block;
      line-height: 32px;
      margin: 18px 0 18px 0;
      color: rgba(0, 0, 0, 0.85);
      margin-left: 5px;
    }
  }
  .right-div {
    padding: 0 15px;
    height: 60px;
    line-height: 60px;
    display: flex;
    .nav-div {
      display: flex;
      color: #606266;
      font-size: 14px;
      padding-top: 1px;
    }
    .info-div {
      padding-left: 10px;
      span {
        height: 60px;
        line-height: 60px;
      }
    }
    .nav-item {
      padding: 0 25px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      &.active {
        color: #409eff;
        border-bottom: 2px solid #409eff;
      }
    }
  }
}
</style>
