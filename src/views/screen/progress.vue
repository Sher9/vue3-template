<template>
  <div class="progress-container">
    <div class="progress" v-for="(item, index) in list" :key="index">
      <el-progress
        type="circle"
        class="circle0"
        :stroke-width="18"
        :percentage="Number(item.value)"
        :color="item.color"
        :format="format"
      ></el-progress>
      <svg width="100%" height="0">
        <defs>
          <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #ebeef5" stop-opacity="0.8"></stop>
            <stop offset="100%" :style="{ 'stop-color': color }" stop-opacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div class="name-div">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup name="progressComponent">
const props = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
});

const list = ref([]);
const color = ref("#20a0ff");

watch(
  () => props.data,
  (value) => {
    if (value) {
      list.value = value.summaryChart;
      color.value =
        list.value.length > 0 && list.value[0].color ? list.value[0].color : "#20a0ff";
    }
  },
  { immediate: true, deep: true }
);

const format = (percentage) => {
  if (!isNaN(percentage)) {
    return `${percentage}%`;
  } else {
    return percentage;
  }
};
</script>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  .progress {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 33%;
    cursor: pointer;
    position: relative;
    &::v-deep {
      svg > path:nth-child(2) {
        stroke: url(#write);
      }
      .el-progress-circle__track {
        stroke: #ebeef5;
      }
      .el-progress__text {
        font-size: 20px !important;
        font-weight: 700;
      }
    }
  }
  .name-div {
    margin: 20px 0;
    color: #686868;
  }
}
</style>
