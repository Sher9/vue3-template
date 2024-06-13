<template>
  <div class="timeaxis">
    <div v-for="(item, index) in list" :key="index">
      <div class="box" v-if="index % 2 === 0">
        <div class="item">
          <div class="left" style="font-weight: 700">
            {{ item.name }}
          </div>
        </div>
        <div class="circular-div">
          <div class="circular"></div>
        </div>
        <div class="item2" :title="item.value">
          <div class="bottom">{{ item.value }}</div>
        </div>
      </div>
      <div class="box" v-else>
        <div class="item" :title="item.value">
          <div class="left">{{ item.value }}</div>
        </div>
        <div class="circular-div">
          <div class="circular"></div>
        </div>
        <div class="item2">
          <div class="bottom" style="font-weight: 700">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <el-icon v-show="list.length > 0" class="arrowhead"><ArrowRightBold /></el-icon>
  </div>
</template>

<script setup name="timeline">
const props = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
});

const list = ref([]);
watch(
  () => props.data,
  (value) => {
    if (value) {
      list.value = value.summaryChart;
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.timeaxis {
  width: 100%;
  display: flex;
  padding: 0 15px;
  justify-content: center;
  margin: auto;
  height: 95%;
  overflow-x: auto;
  align-items: center;
}
.timeaxis::-webkit-scrollbar {
  display: none;
}
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 180px;
}
.circular-div {
  height: 3px;
  background: #e8e8e8;
  .circular {
    width: 13px;
    height: 13px;
    border-radius: 13px;
    background: white;
    margin: auto;
    background: #1061e4;
    margin-top: -5px;
  }
}

.arrowhead {
  color: #e8e8e8;
  margin-left: -10px;
  font-size: 28px;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
}

.item {
  height: 40%;
  position: relative;
  text-align: center;
  margin-bottom: 15px;
  .left {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.item2 {
  height: 40%;
  margin-top: 15px;
  .bottom {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
