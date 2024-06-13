<template>
  <el-form
    ref="taskFormRef"
    :model="taskForm"
    :rules="rules"
    label-width="180px"
    size="small"
    :inline="true"
    class="editForm"
  >
    <el-form-item label="任务名称:" prop="jobName">
      <el-input v-model="taskForm.jobName" placeholder="请输入任务名称"></el-input>
    </el-form-item>
    <el-form-item label="任务类型:" prop="jobBeanName">
      <el-select
        v-model="taskForm.jobBeanName"
        size="small"
        style="width: 100%"
        placeholder="任务类型"
        clearable
        :disabled="!isAdd"
      >
        <el-option
          v-for="item in javaBeanList"
          :key="item.dictKey"
          :label="item.dictValue"
          :value="item.dictKey"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务参数:" prop="jobParams">
      <el-input v-model="taskForm.jobParams" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="任务描述:" prop="jobDesc">
      <el-input v-model="taskForm.jobDesc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Cron表达式:" prop="cronExpression">
      <el-popover
        v-model:visible="cronPopover"
        width="700px"
        trigger="manual"
        placement="top-start"
      >
        <vue-corn i18n="cn" maxHeight="350px" @change="changeCron" />
        <template #reference>
          <el-input v-model="taskForm.cronExpression">
            <template #append>
              <el-button @click="cronPopover = true">设置</el-button>
            </template>
          </el-input>
        </template>
      </el-popover>
    </el-form-item>
  </el-form>
  <div class="dialog-footer">
    <el-button type="primary" @click="saveData" v-if="!isSaving">保存</el-button>
    <el-button type="primary" :loading="true" v-if="isSaving">保存中</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script setup name="tableInfoEdit">
import { add, update } from "@/api/task";
import { deepClone } from "@/util/index";
import { ElMessage } from "element-plus";
import vueCorn from "@/components/corn/index";
const { proxy } = getCurrentInstance();
const props = defineProps({
  rowData: {
    type: Object,
  },
  isAdd: {
    type: Boolean,
  },
  javaBeanList: {
    type: Array,
  },
});
const cronPopover = ref(false);
const isSaving = ref(false);
const state = reactive({
  taskForm: {
    jobName: "",
    jobBeanName: "",
    jobParams: "",
    jobDesc: "",
    triggerName: "",
    triggerGroup: "",
    cronExpression: "",
  },
  // 表单验证规则
  rules: {
    jobName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
    jobBeanName: [{ required: true, message: "请输入任务类型", trigger: "blur" }],
  },
});
const { taskForm, rules } = toRefs(state);

const emit = defineEmits(["refreshData", "cancelData"]);

if (!props.isAdd) {
  state.taskForm = deepClone(props.rowData);
}

const changeCron = (value) => {
  state.taskForm.cronExpression = value;
};
const saveData = () => {
  proxy.$refs["taskFormRef"].validate((valid) => {
    if (valid) {
      state.isSaving = true;
      if (props.isAdd) {
        add(state.taskForm)
          .then(() => {
            ElMessage({
              type: "success",
              message: "新增成功!",
            });
            state.isSaving = false;
            emit("refreshData");
          })
          .catch(() => (isSaving.value = false));
      } else {
        update(state.taskForm)
          .then(() => {
            ElMessage({
              type: "success",
              message: "编辑成功!",
            });
            state.isSaving = false;
            emit("refreshData");
          })
          .catch(() => (isSaving.value = false));
      }
    } else {
      return;
    }
  });
};

const cancel = () => {
  emit("cancelData");
};
</script>
<style lang="scss" scoped>
.editForm {
  :deep(.el-form-item) {
    width: 90% !important;
    display: inline-flex;
  }
  :deep(.el-form-item__content) {
    width: calc(100% - 180px) !important;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 10%;
}
</style>
