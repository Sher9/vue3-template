<template>
  <div class="task-node">
    <div slot="header" class="clearfix" :style="{ backgroundColor: colorName }">
      <span
        :title="
          nodeInfo.belongTable
            ? `${nodeInfo.executorHandler}(${nodeInfo.belongTable})`
            : nodeInfo.executorHandler
        "
        >{{
          nodeInfo.belongTable
            ? `${nodeInfo.executorHandler}(${nodeInfo.belongTable})`
            : nodeInfo.executorHandler
        }}</span
      >
    </div>
    <div class="content" :title="nodeInfo.name">{{ nodeInfo.name }}</div>
  </div>
</template>

<script setup name="taskNode">
const props = defineProps({
  nodeData: {
    type: Array,
  },
});
const colorName = ref("#66b1ff");

const state = reactive({
  nodeInfo: {
    name: "",
    executorHandler: "",
  },
});

const { nodeInfo } = toRefs(state);
const getNode = inject("getNode");

const node = getNode();
const data = node.store.data.data;
if (data) {
  state.nodeInfo = data;
}
</script>
<style lang="scss" scoped>
.task-node {
  background: #fff;
  border-radius: 6px;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
  .clearfix {
    height: 20px;
    line-height: 20px;
    padding: 5px 10px;
    background: #409eff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    color: #fff;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      width: 140px;
      display: block;
    }
  }
  .content {
    height: 40px;
    line-height: 20px;
    padding: 2.5px 10px;
    font-size: 13px;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
