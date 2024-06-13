<template>
  <el-form
    ref="detailFormRef"
    :model="workForm"
    :rules="rules"
    label-width="180px"
    size="small"
    :inline="true"
    class="editForm"
  >
    <el-form-item label="任务组描述:" prop="jobDesc">
      <el-input v-model="workForm.jobDesc" placeholder="请输入任务组描述"></el-input>
    </el-form-item>

    <el-form-item label="负责人:" prop="jobDesc">
      <el-input v-model="workForm.author" placeholder="请输入负责人"></el-input>
    </el-form-item>
  </el-form>
  <div class="dialog-footer">
    <el-button type="primary" @click="saveData" v-if="!isSaving">保存</el-button>
    <el-button type="primary" :loading="true" v-if="isSaving">保存中</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script setup name="workflowDetail">
import { add, update } from "@/api/config";
import { deepClone } from "@/util/index";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
const props = defineProps({
  rowData: {
    type: Object,
  },
  isAdd: {
    type: Boolean,
  },
});
const cronPopover = ref(false);
const isSaving = ref(false);
const state = reactive({
  workForm: {
    jobDesc: "",
    author: "",
  },
  // 表单验证规则
  rules: {
    jobDesc: [{ required: true, message: "请输入任务组描述", trigger: "blur" }],
  },
});
const { workForm, rules } = toRefs(state);

const emit = defineEmits(["refreshData", "handleClose"]);

if (!props.isAdd) {
  state.workForm = deepClone(props.rowData);
}


const saveData = () => {
  proxy.$refs["detailFormRef"].validate((valid) => {
    delete state.workForm.addTime;
    delete state.workForm.updateTime;
    delete state.workForm.glueUpdatetime;
    if (valid) {
      state.isSaving = true;
      if (props.isAdd) {
        add(state.workForm)
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
        update(state.workForm)
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
  emit("handleClose");
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
