<template>
  <div class="content-div">
    <div class="left-div" :style="{ width: isShowRightBox ? '70%' : '100%' }">
      <div class="search-div">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="登录账号:">
            <el-input
              v-model="query.account"
              placeholder="登录账号"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名:">
            <el-input
              v-model="query.name"
              placeholder="用户名"
              size="small"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryData" size="small" icon="Search"
              >查询</el-button
            >
            <el-button @click="resetData" size="small" icon="Refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="button-div">
        <el-button
          type="primary"
          @click="addData"
          size="small"
          icon="Plus"
          v-if="permissionList.addBtn"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="reset"
          size="small"
          icon="Refresh"
          v-if="permissionList.resetBtn"
          >重置密码</el-button
        >
        <el-button
          type="danger"
          @click="removeData"
          size="small"
          icon="Minus"
          v-if="permissionList.delBtn"
          >批量删除</el-button
        >
      </div>
      <el-table
        :data="tableData"
        ref="tableDataRef"
        :height="heightValue"
        border
        style="width: 100%"
        v-loading="isLoading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="account" label="登录账号"> </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="deptName" label="所属机构"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              type="primary"
              @click="updateData(scope.row)"
              size="small"
              icon="Edit"
              link
              v-if="permissionList.editBtn"
              >修改</el-button
            >
            <el-button
              type="primary"
              @click="viewRight(scope.row)"
              size="small"
              icon="View"
              link
              v-if="permissionList.authBtn"
              >权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <div
      class="right-div"
      v-show="isShowRightBox"
      :style="{ width: isShowRightBox ? '29%' : '' }"
    >
      <div class="title">
        <p><span></span>{{ title }}</p>
      </div>
      <div
        class="tree-div"
        v-loading="isSaveMenuLoading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        :style="{ height: treeHeightValue + 'px' }"
      >
        <el-tree
          ref="menuTree"
          node-key="id"
          :props="defaultMenuProps"
          :data="menuTreeData"
          :expand-on-click-node="false"
          :check-strictly="true"
          show-checkbox
        >
          <template #default="{ node, data }">
            <el-icon style="color: #409eff; font-size: 16px; vertical-align: middle"
              ><component :is="$icon[iconShow(node, data)]"
            /></el-icon>
            <span style="padding-left: 4px; font-size: 12px">{{ data.name }}</span>
          </template>
        </el-tree>
      </div>
      <div class="operation-btn">
        <el-button size="small" type="primary" @click="saveData">保存</el-button>
        <el-button size="small" @click="isShowRightBox = false">取消</el-button>
      </div>
    </div>
    <el-dialog
      :title="isAdd ? '新增' : '修改'"
      v-model="detailVisible"
      class="detail-visiable"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="detail-div">
        <el-form
          :inline="true"
          :model="formInline"
          :rules="rules"
          labelWidth="120px"
          ref="userForm"
        >
          <el-form-item label="登录账号:" prop="account">
            <el-input
              v-model="formInline.account"
              placeholder="登录账号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户姓名:" prop="name">
            <el-input
              v-model="formInline.name"
              placeholder="用户姓名"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属机构:" prop="deptName">
            <el-input placeholder="请选择机构" v-model="formInline.deptName" size="small">
              <template #append
                ><el-icon @click="orgVisible = true"><Help /></el-icon
              ></template>
            </el-input>
          </el-form-item>

          <el-form-item label="手机号码:">
            <el-input
              v-model="formInline.phone"
              placeholder="手机号码"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码:" prop="password">
            <el-input
              type="password"
              v-model="formInline.password"
              placeholder="登录密码"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog
        width="30%"
        title="机构"
        v-model="orgVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        append-to-body
      >
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          size="small"
          style="margin-bottom: 10px"
        >
        </el-input>
        <el-tree
          :props="defaultOrgProps"
          :data="orgTreeData"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          node-key="id"
          ref="orgTree"
          :expand-on-click-node="false"
          style="height: 300px"
        >
          <template #default="{ node, data }">
            <span style="font-size: 12px">[{{ data.deptId }}]{{ node.label }}</span>
          </template></el-tree
        >
        <div slot="footer" class="dialog-footer" style="text-align: right">
          <el-button type="primary" size="small" @click="selectOrg">确定</el-button>
          <el-button @click="orgVisible = false" size="small">取消</el-button>
        </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button size="small" type="primary" v-if="!isSaving" @click="submitData"
          >保存</el-button
        >
        <el-button size="small" type="primary" :loading="true" v-if="isSaving"
          >保存中</el-button
        >
        <el-button @click="detailVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup name="ledgerInfo">
import {
  getList,
  resetPassword,
  add,
  update,
  remove,
  getDeptTree,
  getUserMenu,
  saveRight,
} from "@/api/user";
import {getTreeData} from "@/api/menu"
import { deepClone } from "@/util/index";
import { getSm2DataHexByString } from "@/util/sm2";
import elementResizeDetectorMaker from "element-resize-detector";
import useUserStore from "@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
onMounted(() => {
  //监听div宽度高度发生变化，之所以这样做是为了解决当菜单展开时，会导致div挤压，页码div被遮挡的问题
  const erd = elementResizeDetectorMaker();
  erd.listenTo(document.getElementsByClassName("search-div"), () => {
    nextTick(() => {
      //整个内容高度
      let bodyHeight = document.getElementsByClassName("el-container")[0].clientHeight;
      //搜索栏高度
      let searchHeight = document.getElementsByClassName("search-div")[0].clientHeight;
      if (searchHeight < 100) {
        heightValue.value = bodyHeight - 250 + "px";
      } else {
        heightValue.value = bodyHeight - 290 + "px";
      }
    });
  });
  treeHeightValue.value =
    document.getElementsByClassName("el-container")[0].clientHeight - 260;
});
const { proxy } = getCurrentInstance();

const currentPage = ref(1);
const pageSize = ref(20);
const totalCount = ref(0);
const heightValue = ref(500);
const isLoading = ref(false);
const title = ref("权限配置");
const isSaving = ref(false);
const detailVisible = ref(false);
const orgVisible = ref(false);
const isShowRightBox = ref(false);
const filterText = ref("");
const isSaveMenuLoading = ref(false);
const orgId = ref("");
const orgName = ref("");
const isAdd = ref("");
const password = ref("");
const treeHeightValue = ref(0);
const state = reactive({
  query: {
    account: "",
    name: "",
  },
  orgTypes: [],
  organization: {
    orgName: "",
    orgType: "",
    regionLevel: "",
    businessGuideDept: "",
    memberNum: "",
    primaryDuty: "",
    regionID: -1,
    regionType: -1,
    regionName: "",
  },
  tableData: [],
  selection: [],
  formInline: {
    account: "",
    name: "",
    phone: "",
    password: "",
    deptId: "",
    deptName: "",
  },
  rules: {
    account: [{ required: true, message: "登录账号不能为空", trigger: "blur" }],
    name: [{ required: true, message: "用户姓名不能为空", trigger: "blur" }],
    deptName: [{ required: true, message: "所属机构不能为空", trigger: "blur" }],
    password: [{ required: true, message: "登录密码不能为空", trigger: "blur" }],
  },
  orgTreeData: [],
  defaultOrgProps: {
    children: "children",
    label: "title",
  },
  menuTreeData: [],
  defaultMenuProps: {
    children: "children",
    label: "name",
  },
  defaultCheckedKeys: [],
});

const {
  query,
  orgTypes,
  organization,
  tableData,
  selection,
  formInline,
  rules,
  orgTreeData,
  defaultOrgProps,
  menuTreeData,
  defaultMenuProps,
  defaultCheckedKeys,
} = toRefs(state);

const permission = computed(() => useUserStore().permission);

const permissionList = computed(() => {
  return {
    addBtn: proxy.vaildData(permission.value, "user_add"),
    delBtn: proxy.vaildData(permission.value, "user_del"),
    editBtn: proxy.vaildData(permission.value, "user_update"),
    resetBtn: proxy.vaildData(permission.value, "user_reset"),
    authBtn: proxy.vaildData(permission.value, "user_auth"),
  };
});

const ids = computed(() => {
  let ids = [];
  state.selection.forEach((ele) => {
    ids.push(ele.id);
  });
  return ids.join(",");
});

watch(
  () => filterText.value,
  (value) => {
    proxy.$refs.orgTree.filter(val);
  }
);
//获取树数据
const initTreeData = () => {
  Promise.all([getDeptTree(), getTreeData()]).then((res) => {
    state.orgTreeData = res[0].data.data || [];
    state.menuTreeData = res[1].data.data || [];
  });
};
//获取列表
const getTableData = () => {
  isLoading.value = true;
  let params = {};
  Object.keys(state.query).forEach((el) => {
    if (state.query[el]) {
      params[el] = state.query[el];
    }
  });
  getList({ current: currentPage.value, ...state.query })
    .then((res) => {
      state.tableData = res.data.data.records || [];
      totalCount.value = res.data.data.total;
      isLoading.value = false;
    })
    .catch(() => (isLoading.value = false));
};

const queryData = () => {
  currentPage.value = 1;
  getTableData();
};

const resetData = () => {
  state.query = {
    account: "",
    name: "",
  };
  currentPage.value = 1;
  getTableData();
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  getTableData();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  getTableData();
};

//重置密码
const reset = () => {
  if (state.selection.length === 0) {
    ElMessage.warning("请先选择数据");
  }
  resetPassword({ userIds: ids.value }).then(() => {
    ElMessage.value({
      type: "success",
      message: "操作成功!",
    });
    currentPage.value = 1;
    getTableData();
  });
};

//删除数据
const removeData = () => {
  if (state.selection.length === 0) {
    ElMessage.warning("请先选择数据");
    return;
  }
  ElMessageBox.confirm("确定将选择数据删除?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return remove({ ids: ids.value });
    })
    .then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
      currentPage.value = 1;
      getTableData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
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
const handleSelectionChange = (val) => {
  state.selection = val;
};

//新增数据
const addData = () => {
  state.formInline = {
    account: "",
    name: "",
    phone: "",
    password: "",
    deptId: "",
    deptName: "",
  };
  isAdd.value = true;
  proxy.$refs.userForm && proxy.$refs.userForm.resetFields();
  detailVisible.value = true;
};

const updateData = (row) => {
  password.value = row.password;
  state.formInline = deepClone(row);
  isAdd.value = false;
  proxy.$refs.userForm && proxy.$refs.userForm.resetFields();
  detailVisible.value = true;
};

const submitData = () => {
  proxy.$refs.userForm.validate((valid) => {
    if (valid) {
      isSaving.value = true;
      let tempObj = deepClone(state.formInline);
      if (password.value !== state.formInline.password) {
        tempObj.password = getSm2DataHexByString(tempObj.password);
      }
      if (isAdd.value) {
        add(tempObj)
          .then(() => {
            ElMessage({
              type: "success",
              message: "新增成功!",
            });
            isSaving.value = false;
            proxy.$refs.userForm.resetFields();
            detailVisible.value = false;
            getTableData();
          })
          .catch(() => (isSaving.value = false));
      } else {
        update(tempObj)
          .then(() => {
            ElMessage({
              type: "success",
              message: "修改成功!",
            });
            isSaving.value = false;
            proxy.$refs.userForm.resetFields();
            detailVisible.value = false;
            getTableData();
          })
          .catch(() => (isSaving.value = false));
      }
    } else {
      return false;
    }
  });
};

//查看权限
const viewRight = (row) => {
  state.formInline = row;
  title.value = `权限[${state.formInline.name}]`;
  getUserMenu({ userId: row.id }).then((res) => {
    isShowRightBox.value = true;
    nextTick(() => {
      proxy.$refs.menuTree.setCheckedKeys(res.data.data);
    });
  });
};

//机构树点击
const handleNodeClick = (data) => {
  orgId.value = data.deptId;
  orgName.value = data.deptName;
};

//机构树选择
const selectOrg = () => {
  if (!orgId.value) {
    ElMessage.warning("请选择机构");
    return;
  }
  state.formInline.deptId = orgId.value;
  state.formInline.deptName = orgName.value;
  orgVisible.value = false;
};
//保存权限
const saveData = () => {
  let menuIds = proxy.$refs.menuTree
    .getCheckedKeys()
    .concat(proxy.$refs.menuTree.getHalfCheckedKeys())
    .filter((item) => item !== "1")
    .join(",");
  isSaveMenuLoading.value = true;
  saveRight({
    menuIds: menuIds,
    userId: state.formInline.id,
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
      isSaveMenuLoading.value = false;
      isShowRightBox.value = false;
    })
    .catch(() => (isSaveMenuLoading.value = false));
};

getTableData();
initTreeData();
</script>
<style lang="scss" scoped>
.content-div {
  overflow: hidden;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  .left-div {
    background: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    width: 70%;
    transition: all 0.5s;
    .search-div {
      :deep(.el-form-item) {
        margin-bottom: 5px;
      }
    }
    .button-div {
      margin: 5px 0 10px 0;
    }
  }
  .right-div {
    background: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    width: 29%;
    margin-left: 1%;
    transition: all 0.5s;
    .title {
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid #f6f6f6;
      height: 30px;
      margin-top: 5px;
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
    .tree-div {
      border: 1px solid #ebeef5;
      height: 78%;
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 5px;
    }
    .operation-btn {
      text-align: right;
    }
  }
}

.detail-div {
  .el-form--inline {
    :deep(.el-form-item) {
      width: 100%;
    }
    :deep(.el-form-item__content) {
      width: calc(100% - 180px) !important;
    }
    :deep(.el-form-item__content .el-input-group) {
      vertical-align: middle;
    }
  }
}
</style>
