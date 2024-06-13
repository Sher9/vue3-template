<template>
  <el-row :gutter="20" style="height: 90%">
    <el-col :span="24" style="height: 100%; display: flex">
      <div class="chartsdom" :id="lineChartId"></div>
    </el-col>
  </el-row>
</template>

<script setup name="lineComponent">
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
const props = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
  moduleId: {
    type: String,
  },
});
const lineChartId = ref("");
const myChart = ref(null);
onMounted(() => {
  //当div宽度高度发生变化（菜单栏产生、展开、收起），e-charts表格自适应
  const erd = elementResizeDetectorMaker();
  erd.listenTo(document.getElementsByClassName("el-col"), () => {
    nextTick(() => {
      myChart.value && myChart.value.resize();
    });
  });
});

watch(
  () => props.data,
  (value) => {
    if (value) {
      lineChartId.value = `line-chart-${props.moduleId}-${new Date().getTime()}`;
      nextTick(() => {
        getEchart();
      });
    }
  },
  { immediate: true, deep: true }
);

const getEchart = () => {
  let chartDiv = document.getElementById(lineChartId.value);
  if (chartDiv) {
    myChart.value = markRaw(echarts.init(chartDiv));
  } else {
    return;
  }
  let seriesData = [];
  let legendData = [];
  let yAxisFormatter = "";
  if (props.data.data && props.data.data.length > 0) {
    props.data.data.forEach((item) => {
      let seriesItem = {};
      if (item.color) {
        seriesItem = {
          name: item.name,
          type: "line",
          data: item.data,
          needPer: item.needPer || "", //是否给tooltip数值加上百分号
          lineStyle: {
            // 设置线条的style等
            color: item.color,
          },
          itemStyle: {
            // 设置线条上点的颜色
            color: item.color,
          },
        };
      } else {
        seriesItem = {
          name: item.name,
          type: "line",
          data: item.data,
          needPer: item.needPer || "", //是否给tooltip数值加上百分号
        };
      }
      //线段是否平滑
      if (item.smooth && item.smooth === "N") {
        seriesItem.smooth = false;
      } else {
        seriesItem.smooth = true;
      }
      //是否显示阴影
      if (item.areastyle && item.areastyle === "Y") {
        seriesItem.areaStyle = {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 渐变颜色
              {
                offset: 0,
                color: item.color ? item.color : "red",
              },
              {
                offset: 1,
                color: "#ebeef5",
              },
            ],
            global: false,
          },
        };
        seriesItem.lineStyle.width = 0;
        seriesItem.showSymbol = false;
      }
      seriesData.push(seriesItem);
      item.name && legendData.push(item.name);
      yAxisFormatter = props.data.data[0].yunit ? props.data.data[0].yunit : "";
    });
  }
  const option = {
    tooltip: {
      trigger: "axis",
    },
    // tooltip: {
    //   trigger: "axis",
    //   formatter: function (params) {
    //     let list = [];
    //     let listItem = "";
    //     for (let i = 0; i < params.length; i++) {
    //       //是否给数值加上百分号
    //       let isPrecent =
    //         seriesData[params[i].seriesIndex].needPer &&
    //         seriesData[params[i].seriesIndex].needPer === "1";
    //       const appendHtml = isPrecent ? "%</div></div>" : "</div></div>";
    //       list.push(
    //         '<div  style="display:flex;justify-content: space-between;width:260px;padding:3px 0"><div>' +
    //           params[i].marker +
    //           params[i].seriesName +
    //           "</div><div>" +
    //           params[i].value +
    //           appendHtml
    //       );
    //     }
    //     listItem = list.join(" ");
    //     return "<div>" + params[0].name + "</div><div>" + listItem + "</div>";
    //   },
    // },
    legend: { type: "scroll", data: legendData },
    grid: {
      top: 35,
      left: "8%",
      right: 30,
      bottom: "20%",
      containLabel: true, //轴上的数值
      width: "85%", // 宽度
      height: "70%", // 高度
    },
    xAxis: {
      type: "category",
      data: props.data.xdata,
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: "{value}",
      },
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
        lineStyle: {
          color: "#999",
        },
      },
      axisLabel: {
        formatter: "{value}" + yAxisFormatter,
      },
    },
    series: seriesData,
  };
  myChart.value.setOption(option, true);

  window.addEventListener("resize", () => {
    myChart.value.resize();
  });
};
</script>

<style scoped>
.chartsdom {
  width: 100%;
  min-height: 160px;
}
</style>
