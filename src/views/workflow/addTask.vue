<template>
  <div class="content-div">
    <div class="search-div">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="任务描述:">
          <el-input
            v-model="query.jobDesc"
            placeholder="任务描述"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="任务类型:">
          <el-select
            v-model="query.executorHandler"
            size="small"
            style="width: 100%"
            placeholder="全部"
          >
            <el-option
              v-for="item in jobTypeList"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input
            v-model="query.author"
            placeholder="负责人"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" size="small" @click="getTableData"
            >查询</el-button
          >
          <el-button @click="searchReset" icon="Refresh" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      :height="heightValue"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="任务编号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="executorHandler" label="任务类型" show-overflow-tooltip>
        <template #default="scope">
          <span>
            {{ getDictValue(scope.row.executorHandler, jobTypeList) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="jobDesc" label="任务描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="belongTable" label="归属表" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="author" label="负责人" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="->, total, sizes, prev, pager, next"
      :total="totalCount"
    >
    </el-pagination>
    <div class="dialog-footer">
      <el-button type="primary" @click="submitTask" size="small">保存</el-button>
      <el-button size="small" @click="closeTaskDialog">取消</el-button>
    </div>
  </div>
</template>

<script setup name="addTask">
import { getList } from "@/api/task";
import { ElMessage } from "element-plus";
const props = defineProps({
  jobTypeList: {
    type: Array,
  },
});

const loading = ref(false);
const currentPage = ref(1);
const totalCount = ref(0);
const pageSize = ref(10);
const heightValue = ref(360);
const emit = defineEmits(["addTaskList", "closeTaskDialog"]);
const state = reactive({
  selectionList: [],
  query: {
    jobDesc: "",
    executorHandler: "",
    actuator: "",
  },
  tableData: [],
});

const { selectionList, query, tableData } = toRefs(state);
const ids = computed(() => {
  let ids = [];
  state.selection.forEach((ele) => {
    ids.push(ele.id);
  });
  return ids.join(",");
});

const getTableData = () => {
  loading.value = true;
  getList(currentPage.value, pageSize.value, state.query)
    .then((res) => {
      tableData.value = res.data.data.records || [];
      totalCount.value = res.data.data.total;
      loading.value = false;
    })
    .catch(() => (loading.value = false));
};
const searchReset = () => {
  state.query = {
    jobDesc: "",
    jobType: "",
    actuator: "",
  };
  currentPage.value = 1;
  getTableData();
};
const currentChange = (currentPage) => {
  currentPage.value = currentPage;
  getTableData();
};
const sizeChange = (pageSize) => {
  currentPage.value = 1;
  pageSize.value = pageSize;
  getTableData();
};
const selectionChange = (list) => {
  state.selectionList = list;
};
const submitTask = () => {
  if (state.selectionList.length === 0) {
    ElMessage.warning("请先勾选列表数据");
    return;
  }
  let taskList = [];
  state.selectionList.forEach((selection) => {
    let jobName = "";
    const typeObj = props.jobTypeList.find(
      (item) => item.name == selection.executorHandler
    );
    if (typeObj) {
      jobName = typeObj.label;
    }
    let taskObj = {
      id: selection.id,
      name: selection.jobDesc,
      executorHandler: jobName,
      executorParam: selection.executorParam,
      belongTable: selection.belongTable,
    };
    taskList.push(taskObj);
  });
  emit("addTaskList", taskList);
};
//关闭弹框
const closeTaskDialog = () => {
  emit("closeTaskDialog");
};
getTableData();
</script>

<style scoped>
.dialog-footer {
  text-align: right;
  margin-top: 10px;
}
</style>
