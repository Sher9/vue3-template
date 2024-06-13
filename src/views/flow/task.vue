<template>
  <div class="content-div">
    <div class="search-div">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="任务名称:">
          <el-input
            v-model="query.jobName"
            placeholder="任务名称"
            size="small"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="任务类型:">
          <el-select
            v-model="query.jobBeanName"
            size="small"
            style="width: 100%"
            placeholder="任务类型"
            clearable
          >
            <el-option
              v-for="item in javaBeanList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" size="small" icon="Search"
            >查询</el-button
          >
          <el-button @click="resetTableData" size="small" icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-div">
      <el-button
        type="primary"
        @click="addData"
        size="small"
        icon="Plus"
        >新增</el-button
      >
      <el-button
        type="danger"
        @click="handleDelete"
        size="small"
        icon="Minus"
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="jobName" label="任务名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="jobBeanName" label="任务类型" show-overflow-tooltip>
        <template #default="scope">
          <span>
            {{ getDictValue(scope.row.jobBeanName, javaBeanList) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="jobDesc" label="任务描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="cronExpression"
        label="cron表达式"
        width="160"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column prop="v1" label="运行状态" width="110" show-overflow-tooltip>
        <template #default="scope" el-dropdown>
          <el-tag size="small" type="warning" v-if="scope.row.v1 === '暂停中'">{{
            scope.row.v1
          }}</el-tag>
          <el-tag size="small" v-else>{{ scope.row.v1 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template #default="scope">
          <el-dropdown>
            <el-button type="primary" size="small" class="operating-button">
              操 作
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="getNextTime(scope.row)"
                  >下次执行时间</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="handleEdit(scope.row)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="rowDel(scope.row)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="stop(scope.row)"
                  >暂停</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="resume(scope.row)"
                  >恢复</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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

    <el-dialog
      :title="isAdd ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-model="isVisible"
    >
      <detail
        ref="taskDetail"
        :row-data="rowData"
        :java-bean-list="javaBeanList"
        :is-add="isAdd"
        @refreshData="
          isVisible = false;
          getTableData();
        "
        @cancelData="isVisible = false"
        v-if="isVisible"
      ></detail>
    </el-dialog>

    <el-dialog
      title="下次执行时间"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-model="isTimeVisible"
      width="30%"
    >
      <el-tag v-for="item in nextTimeList" :key="item" style="margin: 5px 10px">{{
        item
      }}</el-tag>
    </el-dialog>
  </div>
</template>
<script setup name="task">
import {
  getList,
  stopTask,
  resumeTask,
  remove,
  getNextTriggerTime,
} from "@/api/task";
import elementResizeDetectorMaker from "element-resize-detector";
import { ElMessage, ElMessageBox } from "element-plus";
import useUserStore from "@/store/modules/user";
import detail from "../taskMange/detail";

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
});

const { proxy } = getCurrentInstance();
const currentPage = ref(1);
const pageSize = ref(20);
const totalCount = ref(0);
const heightValue = ref(500);
const isLoading = ref(false);
const isVisible = ref(false);
const isTimeVisible = ref(false);
const isAdd = ref(false);

const schemaList = ref([]);
const state = reactive({
  selectionList: [],
  query: {
    jobName: "",
    jobBeanName: "",
  },
  tableData: [],
  nextTimeList: [],
  rowData: {},
});

const { selectionList, query, tableData, nextTimeList, rowData } = toRefs(state);

const javaBeanList = computed(() => useUserStore().dicData.taskType || []);
const ids = computed(() => {
  let ids = [];
  state.selection.forEach((ele) => {
    ids.push(ele.id);
  });
  return ids.join(",");
});

//获取列表
const getTableData = () => {
  isLoading.value = true;
  let params = {};
  Object.keys(state.query).forEach((el) => {
    if (state.query[el]) {
      params[el] = state.query[el];
    }
  });
  getList(currentPage.value, pageSize.value, params)
    .then((res) => {
      state.tableData = res.data.data.records || [];
      totalCount.value = res.data.data.total;
      isLoading.value = false;
    })
    .catch(() => (isLoading.value = false));
};

const searchData = () => {
  currentPage.value = 1;
  getTableData();
};

const resetTableData = () => {
  state.query.jobName = "";
  state.query.jobBeanName = "";
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

const handleSelectionChange = (selectionList) => {
  state.selectionList = selectionList;
};
// 新增
const addData = () => {
  state.rowData = {};
  isAdd.value = true;
  isVisible.value = true;
};
// 编辑
const handleEdit = (row) => {
  state.rowData = row;
  isAdd.value = false;
  isVisible.value = true;
};
const handleDelete = () => {
  if (state.selectionList.length === 0) {
    ElMessage.warning("请选择至少一条数据");
    return;
  }
  ElMessageBox.confirm("确定将选择数据删除?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return remove(state.selectionList);
    })
    .then(() => {
      getTableData();
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
    });
};
const rowDel = (row) => {
  ElMessageBox.confirm("确定将选择数据删除?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return remove([row]);
    })
    .then(() => {
      getTableData();
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
    });
};

const getNextTime = (row) => {
  getNextTriggerTime({ id: row.id })
    .then((res) => {
      isTimeVisible.value = true;
      state.nextTimeList = res.data.data || [];
    })
    .catch(() => (state.nextTimeList = []));
};

const stop = (row) => {
  ElMessageBox.confirm("确定暂停任务?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return stopTask([row]);
    })
    .then(() => {
      getTableData();
      ElMessage({
        type: "success",
        message: "任务暂停成功!",
      });
    });
};
const resume = (row) => {
  ElMessageBox.confirm("确定恢复任务?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return resumeTask([row]);
    })
    .then(() => {
      getTableData();
      ElMessage({
        type: "success",
        message: "任务恢复成功!",
      });
    });
};
getTableData();
</script>
<style lang="scss" scoped>
.content-div {
  background: #fff;
  padding: 10px 15px;
  overflow: hidden;
  border-radius: 5px;
  margin: 10px;
  .search-div {
    :deep(.el-form-item) {
      margin-bottom: 5px;
    }
  }
  .button-div {
    margin: 5px 0 10px 0;
  }
}

.detail-visiable {
  .el-form--inline {
    :deep(.el-form-item) {
      width: 45% !important;
      display: inline-flex;
    }
    :deep(.el-form-item__content) {
      width: calc(100% - 180px) !important;
    }
    :deep(.el-form-item__content div) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
