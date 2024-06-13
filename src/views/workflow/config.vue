<template>
  <div
    v-loading="isSaveLoading"
    element-loading-text="保存中"
    element-loading-spinner="el-icon-loading"
    class="main-div"
  >
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <div class="form-div">
          <el-form
            :model="workForm"
            ref="workForm"
            :inline="true"
            class="demo-form-inline"
            label-width="140px"
          >
            <el-form-item label="任务组描述:" style="width: 47%; margin-bottom: 5px">
              <el-input v-model="workForm.jobDesc" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责人:" style="width: 47%; margin-bottom: 5px">
              <el-input v-model="workForm.author" size="small" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="divider">
      <div class="operating">
        <span>流程图 </span>
        <div class="operating-div">
          <el-tooltip class="item" effect="dark" content="新增任务" placement="bottom">
            <el-icon @click="toAddTask"><CirclePlus /></el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
            <el-icon @click="zoomInFn"><ZoomIn /></el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
            <el-icon :class="{ opacity: !canZoomOut }" @click="zoomOutFn"
              ><ZoomOut
            /></el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="居中" placement="bottom">
            <el-icon @click="center"><Rank /></el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="清除" placement="bottom">
            <el-icon @click="clearFn"><Delete /></el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出PNG" placement="bottom">
            <el-icon @click="exportPNGFn"><Picture /></el-icon>
          </el-tooltip>
        </div>
      </div>

      <div class="button-div">
        <el-button type="primary" @click="saveData" size="small">保 存</el-button>
      </div>
    </div>

    <div id="coverCot" class="parent-container" ref="parentContent">
      <div class="container" ref="containerRef"></div>
    </div>
  </div>
  <el-dialog
    title="新增任务"
    v-model="taskDialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="80%"
    top="3vh"
  >
    <add-task
      v-if="taskDialog"
      :job-type-list="jobTypeList"
      @closeTaskDialog="taskDialog = false"
      @addTaskList="addTaskList"
    ></add-task>
  </el-dialog>
</template>

<script setup name="workflowConfig">
import "@antv/x6-vue-shape";
import { Graph, Shape, FunctionExt, Addon, DataUri } from "@antv/x6";
import { getTaskList, save } from "@/api/config";
import { ports, nodeAttr, edgeAttr, dottedEdgeAttr } from "./methods";
import { deepClone, validatenull } from "@/util/index";
import TaskNode from "./taskNode";
import addTask from "./addTask";
const props = defineProps({
  rowData: {
    type: Object,
  },
  jobTypeList: {
    type: Array,
  },
});

onMounted(() => {
  proxy.$refs.parentContent.style.height = "calc(100% - 145px)";
  nextTick(() => {
    initAntvX6();
  });
});
const { proxy } = getCurrentInstance();
const emit = defineEmits(["refreshList", "handleClose"]);
const isLoading = ref(false);
const isSaveLoading = ref(false);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const canZoomOut = ref(true);
const isShowRun = ref(false);
const type = ref("node");
const taskDialog = ref(false);
const state = reactive({
  graph: null,
  activeNames: [],
  taskList: [],
  selectCell: {},
  nodeData: [],
  selectNodes: [],
  workForm: {
    jobDesc: "",
    author: "",
  },
});
const {
  graph,
  activeNames,
  taskList,
  selectCell,
  nodeData,
  selectNodes,
  workForm,
} = toRefs(state);

const initAntvX6 = () => {
  const containerRef = proxy.$refs.containerRef;
  canvasWidth.value = proxy.$refs.parentContent.clientWidth;
  canvasHeight.value = proxy.$refs.parentContent.clientHeight;
  const graph = new Graph({
    container: containerRef, // 画布的容器
    width: canvasWidth.value,
    height: canvasHeight.value,
    autoResize: true,
    //画布是否能拖动
    panning: false,
    // 启用框选
    selecting: {
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    },
    snapline: true, // 对齐线
    history: true, // 启动历史记录
    background: {
      color: "#ffffff",
    },
    // 网格
    grid: {
      size: 10,
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#E7E8EA",
          thickness: 1,
        },
        {
          color: "#CBCED3",
          thickness: 1,
          factor: 5,
        },
      ],
    },
    // Scroller 使画布具备滚动、平移、居中、缩放等能力
    scroller: true,
    // 鼠标滚轮的默认行为是滚动页面
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl", "meta"],
      minScale: 0.5,
      maxScale: 2,
    },
    // 节点连接
    connecting: {
      anchor: "center",
      connectionPoint: "anchor",
      snap: true, // 自动吸附
      allowBlank: false, // 是否允许连接到画布空白位置的点
      allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
      allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#1890ff",
              strokeWidth: 1,
              targetMarker: {
                name: "classic",
                size: 8,
              },
              strokeDasharray: 0, //虚线
              style: {
                animation: "ant-line 30s infinite linear",
              },
            },
          },
          connector: "normal",
          router: {
            name: "manhattan",
          },
          zIndex: 0,
        });
      },
    },
  });
  //注册自定义节点
  Graph.registerVueComponent(
    "task-node-component",
    {
      template: `<task-node :node-data="nodeData"></task-node>`,
      data() {
        return {
          nodeData: nodeData,
        };
      },
      components: {
        TaskNode,
      },
    },
    true
  );
  state.graph = graph;
  // 清除 history 版本
  state.graph.history.redo();
  state.graph.history.undo();
  //编辑，流程图数据反显
  if (!validatenull(props.rowData.workflowData)) {
    let fromNodes = [];
    let fromEdges = [];
    //添加节点配置参数
    props.rowData.workflowData.nodes.forEach((node) => {
      if (node.data.executorHandler) {
        //任务类型名称
        let jobTypeObj = props.jobTypeList.find(
          (jobType) => jobType.name === node.data.executorHandler
        );
        let executorHandlerName = "";
        if (jobTypeObj) {
          executorHandlerName = jobTypeObj.label;
        }
        node.data.executorHandler = executorHandlerName;
      }
      fromNodes.push({ ...node, ...nodeAttr });
    });
    //添加连线配置参数
    props.rowData.workflowData.edges.forEach((edge) => {
      let edgeObject = {};
      //虚线
      if (edge.lineType && edge.lineType === 1) {
        edgeObject = { ...edge, ...dottedEdgeAttr };
      } else {
        edgeObject = { ...edge, ...edgeAttr };
      }
      fromEdges.push(edgeObject);
    });
    state.graph.fromJSON({
      nodes: fromNodes,
      edges: fromEdges,
    });
    state.graph.centerContent();
    //清除所有连接点
    const ports = containerRef.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
  }
  // 点击空白处关闭右则菜单
  state.graph.on("blank:click", () => {
    //清空工具栏，主要是节点活边的删除按钮
    state.graph.removeTools();
    //清空框选效果
    state.graph.cleanSelection();
    //清空连接点
    const ports = containerRef.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
  });

  // 节点鼠标移入
  state.graph.on(
    "node:mouseenter",
    FunctionExt.debounce(({ node }) => {
      // 添加连接点
      const ports = containerRef.querySelectorAll(".x6-port-body");
      showPorts(ports, true);
      const x = 150;
      node.addTools({
        name: "button-remove",
        args: {
          x: 0,
          y: 0,
          offset: { x: x, y: 10 },
        },
      });
    }),
    500
  );
  // 节点鼠标移出
  state.graph.on("node:mouseleave", ({ node }) => {
    // 添加连接点
    const ports = containerRef.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
    // 移除删除
    node.removeTools();
  });
  // 连接线鼠标移入
  state.graph.on("edge:mouseenter", ({ edge }) => {
    edge.addTools([
      "source-arrowhead",
      "target-arrowhead",
      {
        name: "button-remove",
        args: {
          distance: -30,
        },
      },
    ]);
  });
  // 连接线鼠标移出
  state.graph.on("edge:mouseleave", ({ edge }) => {
    edge.removeTools();
  });
  //节点新增
  state.graph.on("node:added", ({ node }) => {
    const data = node.store.data;
    state.nodeData.push(data);
  });
  //节点删除
  state.graph.on("node:removed", ({ node }) => {
    const data = node.store.data;
    const posIndex = state.nodeData.findIndex((item) => item.id === data.id);
    state.nodeData.splice(posIndex, 1);
  });
  //选中的节点/边发生改变(增删)时触发。
  state.graph.on("selection:changed", (args) => {
    args.added.forEach((cell) => {
      state.selectCell = cell;
    });
  });
};

// 显示连线节点
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};

// 放大
const zoomInFn = () => {
  state.graph.zoom(0.1);
  canZoomOut.value = true;
};
// 缩小
const zoomOutFn = () => {
  if (!canZoomOut.value) return;
  const Num = Number(state.graph.zoom().toFixed(1));
  if (Num > 0.1) {
    state.graph.zoom(-0.1);
  } else {
    canZoomOut.value = false;
  }
};
//新增任务
const toAddTask = () => {
  taskDialog.value = true;
};
//保存新增任务
const addTaskList = (taskList) => {
  taskDialog.value = false;
  state.graph.removeTools();
  //清空框选效果
  state.graph.cleanSelection();
  const allNodes = state.graph.getNodes();
  //筛选已存在的节点
  let filterNodes = taskList.filter(
    (item) =>
      !allNodes.some(
        (node) => node.data.id === item.id.toString() || node.data.id === item.id
      )
  );
  filterNodes.forEach((item, index) => {
    const xValue = index * 200;
    let y = 0;
    //判断画布的该位置是否已经有了节点，节点位置进行往下偏移
    if (
      allNodes.findIndex((node) => {
        return node.store.data.position.x === xValue && node.store.data.position.y === 0;
      }) > -1
    ) {
      y = y + 50;
    }
    state.graph.addNode({
      type: "taskNode",
      shape: "vue-shape",
      x: xValue,
      y: y,
      width: 150,
      height: 80,
      ports,
      data: item,
      component: "task-node-component",
    });
  });
};

// 拖拽节点新增
const startDragToGraph = (type, item, e) => {
  state.graph.removeTools();
  //清空框选效果
  state.graph.cleanSelection();
  let allNodes = state.graph.getNodes();
  if (
    allNodes.findIndex(
      (node) => node.data.id === item.id.toString() || node.data.id === item.id
    ) > -1
  ) {
    ElMessage.warning("任务节点已存在");
    return;
  }
  //任务类型名称
  let jobTypeObj = props.jobTypeList.find(
    (jobType) => jobType.name === item.executorHandler
  );
  let executorHandlerName = "";
  if (jobTypeObj) {
    executorHandlerName = jobTypeObj.label;
  } else {
    //删除后又新增数据
    executorHandlerName = item.executorHandler;
  }

  let node = state.graph.createNode({
    type: "taskNode",
    shape: "vue-shape",
    x: 300,
    y: 300,
    width: 150,
    height: 80,
    ports,
    data: {
      id: item.id,
      executorHandler: executorHandlerName,
      name: item.jobDesc,
      executorParam: item.executorParam,
    },
    component: "task-node-component",
  });
  const dnd = new Addon.Dnd({ target: state.graph });
  dnd.start(node, e);
};
//内容居中
const center = () => {
  state.graph.centerContent();
};
// 导出PNG
const exportPNGFn = () => {
  nextTick(() => {
    state.graph.toPNG(
      (dataUri) => {
        // 下载
        DataUri.downloadDataUri(dataUri, "流程图.png");
      },
      {
        backgroundColor: "white",
        padding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        quality: 1,
        copyStyles: false,
      }
    );
  });
};

// 清除
const clearFn = () => {
  state.graph.clearCells();
};
// 保存
const saveData = () => {
  let toNodes = [];
  let toEdges = [];
  let cells = state.graph.toJSON().cells || [];
  if (cells && cells.length > 0) {
    //处理节点
    let filterNodes = cells.filter(
      (item) => item.shape === "vue-shape" && item.type === "taskNode"
    );
    filterNodes.forEach((node) => {
      let nodeObj = {};
      nodeObj.position = node.position;
      nodeObj.id = node.id;
      nodeObj.data = node.data;
      toNodes.push(nodeObj);
    });
    //处理连线数据，lineType为1是虚线，0为实线
    let filterEdges = cells.filter((item) => item.shape === "edge");
    filterEdges.forEach((edge) => {
      let edgeObj = {};
      edgeObj.id = edge.id;
      edgeObj.source = edge.source;
      edgeObj.target = edge.target;
      edgeObj.lineType = edge.attrs.line.strokeDasharray === 5 ? 1 : 0;
      toEdges.push(edgeObj);
    });
  }
  let params = {
    id: props.rowData.id,
    workflowData: {
      nodes: toNodes,
      edges: toEdges,
    },
  };
  isSaveLoading.value = true;
  save(params)
    .then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
      isSaveLoading.value = false;
      emit("refreshList");
    })
    .catch(() => {
      isSaveLoading.value = false;
    });
};
const cancel = () => {
  emit("handleClose");
};

onUnmounted(() => {
  // 在组件销毁后执行
  state.graph && state.graph.dispose();
});
</script>

<style lang="scss" scoped>
.main-div {
  position: absolute;
  bottom: 20px;
  top: 60px;
  left: 0;
  right: 0;
  padding: 0 20px;
  .divider {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    .operating {
      display: flex;
      span {
        font-size: 13px;
        color: #303133;
        line-height: 30px;
        margin-right: 15px;
      }
      i {
        font-size: 24px;
        cursor: pointer;
        margin: 0 10px;
        color: #515a6e;
        &:hover {
          color: #2d8cf0;
        }
        &.opacity {
          opacity: 0.5;
        }
      }
    }
  }

  .parent-container {
    height: 500px;
    padding: 0;
    display: flex;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 1px solid #e0e1e2;
    .parentContent {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
