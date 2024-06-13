<template>
  <div class="content-div">
    <div class="left-div">
      <div class="main-search">
        <div class="search-box">
          <el-input
            placeholder="请输入内容"
            suffix-icon="Search"
            v-model="keywords"
            size="small"
          >
          </el-input>
        </div>
        <div class="button-div">
          <el-button type="primary" size="small" icon="Plus" @click="addData"
            >新增</el-button
          >
          <el-button type="danger" size="small" icon="Delete" @click="removeData"
            >删除</el-button
          >
        </div>
      </div>
      <div
        class="tree-div"
        v-loading="isLoading"
        :style="{ height: heightValue + 'px' }"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-tree
          ref="menuTree"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="defaultExpandedArr"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          highlight-current
        >
          <template #default="{ node, data }">
            <el-icon style="color: #409eff; font-size: 16px; vertical-align: middle"
              ><component :is="$icon[iconShow(node, data)]"
            /></el-icon>
            <span style="padding-left: 4px; font-size: 12px">{{ data.name }}</span>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="right-div">
      <div class="title">
        <p><span></span>详细信息</p>
      </div>
      <el-form
        labelWidth="160px"
        :model="menuForm"
        :rules="rules"
        ref="menuFormRef"
        class="menu-form"
      >
        <el-form-item label="编号:" prop="code">
          <el-input
            v-model="menuForm.code"
            maxlength="40"
            size="small"
            :disabled="menuForm.id === '1'"
          ></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input
            v-model="menuForm.name"
            size="small"
            maxlength="40"
            :disabled="menuForm.id === '1'"
          ></el-input>
        </el-form-item>

        <el-form-item label="上级菜单:">
          <el-input v-model="menuForm.parentName" size="small" disabled></el-input>
        </el-form-item>

        <el-form-item label="类型:" prop="category" :disabled="menuForm.id === '1'">
          <el-radio v-model="menuForm.category" label="1">菜单</el-radio>
          <el-radio v-model="menuForm.category" label="2">按钮</el-radio>
          <el-radio v-model="menuForm.category" label="3">iframe</el-radio>
        </el-form-item>

        <el-form-item
          label="路由地址:"
          prop="path"
          v-show="menuForm.category === '1' || menuForm.category === '3'"
        >
          <template #label
            >路由地址:
            <el-popover placement="top-start" width="400" height="500" trigger="hover">
              <div class="custom-content">
                如果类型为iframe,请在此填完整的地址,例如:<br />
                http://xxxxx:xxxx/xxxxx/xxxxx.html<br />
              </div>
              <template #reference
                ><el-icon style="margin-top: 6px; margin-left: 5px; font-size: 14px"
                  ><QuestionFilled /></el-icon
              ></template> </el-popover
          ></template>
          <el-input size="small" v-model="menuForm.path" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="排序:" prop="sort">
          <el-input
            v-model.number="menuForm.sort"
            size="small"
            maxlength="2"
            :disabled="menuForm.id === '1'"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="operation-btn">
        <el-button size="small" type="primary" v-if="!isSaving" @click="submitData">{{
          buttonTitle
        }}</el-button>
        <el-button size="small" type="primary" :loading="true" v-if="isSaving"
          >保存中</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup name="menu">
import { getTreeData, add, update, remove } from "@/api/menu";
import { deepClone, validatenull } from "@/util/index";
import { ElMessage, ElMessageBox } from "element-plus";
onMounted(() => {
  heightValue.value =
    document.getElementsByClassName("el-container")[0].clientHeight - 260;
});

const { proxy } = getCurrentInstance();
const isLoading = ref(false);
const keywords = ref("");
const isSaving = ref(false);
const nodeId = ref("");
const nodeLevel = ref(1);
const isAdd = ref(false);
const heightValue = ref(0);
const buttonTitle = ref("新增");
const state = reactive({
  defaultExpandedArr: [],
  treeData: [],
  defaultProps: {
    children: "children",
    label: "name",
  },
  rules: {
    name: [{ required: true, message: "请填写名称", trigger: "blur" }],
    code: [{ required: true, message: "请填写编号", trigger: "blur" }],
    category: [
      {
        required: true,
        message: "请选择类型",
        trigger: "change",
      },
    ],
    path: [{ required: true, message: "请填写路由地址", trigger: "blur" }],
  },
  menuForm: {
    id: "",
    code: "",
    name: "",
    parentId: "",
    parentName: "",
    path: "",
    sort: "",
    category: "1",
    icon: "Coin",
  },
  nodeData: {},
});
const { defaultExpandedArr, treeData, defaultProps, rules, menuForm, nodeData } = toRefs(
  state
);

watch(
  () => keywords.value,
  (val) => {
    proxy.$refs["menuTree"].filter(val);
  }
);

const initTreeData = () => {
  isLoading.value = true;
  getTreeData()
    .then((res) => {
      state.treeData = res.data.data || [];
      isLoading.value = false;
      //新增和编辑之后展开和选中
      if (!validatenull(state.menuForm) && nodeId.value) {
        nextTick(() => {
          state.defaultExpandedArr = [state.menuForm.parentId];
          proxy.$refs.menuTree.setCurrentKey(nodeId.value);
        });
      }
    })
    .catch(() => {
      isLoading.value = false;
    });
};

const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.indexOf(value) !== -1;
};

const handleNodeClick = (data, node) => {
  state.menuForm = deepClone(data);
  state.nodeData = node;
  nodeLevel.value = node.level;
  buttonTitle.value = "修改";
  isAdd.value = false;
  proxy.$refs.menuFormRef.resetFields();
};

const iconShow = (node, data) => {
  if (data.category && data.category === "2") {
    return "StarFilled";
  }

  if (data.icon && data.category && (data.category === "1" || data.category === "3")) {
    return data.icon;
  }

  if (node.expanded) {
    return "FolderOpened";
  } else {
    return "Folder";
  }
};

const addData = () => {
  if (!state.nodeData.data) {
    ElMessage.warning("请先选择节点");
    return;
  }
  state.menuForm = {
    id: "",
    code: "",
    name: "",
    path: "",
    sort: "",
    category: "1",
    icon: "Coin",
    parentId: state.nodeData.data.id,
    parentName: state.nodeData.data.name,
  };
  isAdd.value = true;
  buttonTitle.value = "保存";
};

const submitData = () => {
  if (!state.nodeData.id) {
    ElMessage.warning("请先选择节点");
    return;
  }

  if (nodeLevel.value === 1 && !isAdd.value) {
    ElMessage.warning("系统节点不能修改");
    return;
  }

  let requiredCount = 0;
  let validateArry = [];
  if (state.menuForm.category === "2") {
    validateArry = ["code", "name"];
  } else {
    validateArry = ["code", "name", "path"];
  }

  let isAllowNext = false; // 是否允许下一步
  validateArry.forEach(async (item) => {
    await proxy.$refs.menuFormRef.validateField(item, (isValid) => {
      if (!isValid) return; // 验证: 通过 / 失败
      requiredCount += 1;
    });
  }); // 异步

  setTimeout(async () => {
    // 如果当前表单必填项通过的数量与需要必填的数量相等，则进入下一步
    isAllowNext = requiredCount === validateArry.length;
    if (isAllowNext) {
      isSaving.value = true;
      if (buttonTitle.value === "修改") {
        update(state.menuForm)
          .then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                type: "success",
                message: "修改成功!",
              });
              isSaving.value = false;
              nodeId.value = res.data.data;
              initTreeData();
            } else {
              ElMessage({
                type: "warning",
                message: res.data.msg,
              });
              isSaving.value = false;
            }
          })
          .catch(() => {
            isSaving.value = false;
          });
      } else {
        add(state.menuForm)
          .then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                type: "success",
                message: "新增成功!",
              });
              isSaving.value = false;
              nodeId.value = state.menu.id = res.data.data;
              buttonTitle.value = "修改";
              isAdd.value = false;
              initTreeData();
            } else {
              ElMessage({
                type: "warning",
                message: res.data.msg,
              });
              isSaving.value = false;
            }
          })
          .catch(() => (isSaving.value = false));
      }
    }
  });
};

const removeData = () => {
  if (!state.menuForm.id) {
    ElMessage.warning("请先选择节点");
    return;
  }
  if (state.menuForm.children && state.menuForm.children.length > 0) {
    ElMessage.warning("请先删除下级节点");
    return;
  }
  ElMessageBox.confirm("确定将选择数据删除?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return remove({ ids: state.menuForm.id });
    })
    .then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
      state.menuForm = {
        id: "",
        code: "",
        name: "",
        parentId: "",
        parentName: "",
        path: "",
        sort: "",
        category: "1",
        icon: "Coin",
      };
      state.nodeData = {};
      nodeId.value = "";
      nodeLevel.value = 1;
      buttonTitle.value = "保存";
      proxy.$refs["menuFormRef"].resetFields();
      initTreeData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

initTreeData();
</script>

<style lang="scss" scoped>
.content-div {
  overflow: hidden;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  height: 90%;
  .left-div {
    background: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    width: 29%;
    .button-div {
      margin: 5px 0;
    }
    .tree-div {
      border: 1px solid #f6f6f6;
      height: calc(100% - 80px);
      border-radius: 5px;
      padding: 5px;
    }
  }
  .right-div {
    background: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    width: 70%;
    margin-left: 1%;
    .title {
      float: left;
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid #f6f6f6;
      p {
        float: left;
        background: #409eff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: #fff;
        height: 30px;
        line-height: 30px;
        display: block;
        padding: 0 12px;
        margin: 0;
        font-size: 12px;
      }
      span {
        float: left;
        width: 7px;
        height: 7px;
        background: #fff;
        border-radius: 50%;
        display: block;
        margin: 12px 6px 0 0;
      }
    }
    .menu-form {
      margin-top: 50px;
    }
    .operation-btn {
      text-align: right;
    }
  }
}
</style>
