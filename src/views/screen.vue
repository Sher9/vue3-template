<template>
  <div id="content">
    <grid-layout
      ref="gridlayout"
      :layout.sync="layout"
      :col-num="24"
      :row-height="26"
      :is-draggable="false"
      :is-resizable="false"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        :key="item.i"
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div class="title-div" v-show="item.name">
          <div class="panel-title">{{ item.name }}</div>
        </div>
        <component
          :is="component[item.component]"
          :ref="'component-' + item.i"
          :data="item.data"
          :module-id="item.moduleId"
        />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup name="screen">
import { getIndexData } from "@/api/screen";
import { default as lineComponent } from "./screen/line.vue";
import { default as progressComponent } from "./screen/progress.vue";
const timeline = defineAsyncComponent(() => import("./screen/timeline.vue"));
let component = shallowReactive({
  timeline,
  lineComponent,
  progressComponent,
});

const layout = ref([]);

onMounted(() => {
  getIndexData().then((res) => {
    const data = res.data.data || [];
    let layoutData = [];
    data.forEach((item) => {
      layoutData.push({
        x: item.moduleRow,
        y: item.moduleColumn,
        w: item.moduleWidth,
        h: item.moduleHeight,
        i: item.moduleId,
        data: item.data,
        name: item.title,
        moduleId: item.moduleId,
        component: item.type,
      });
    });
    layout.value = layoutData;
  });
});
</script>

<style lang="scss" scoped>
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
  border-radius: 6px;
}

.title-div {
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .panel-title {
    cursor: move;
    font-weight: 700;
    font-size: 17px;
  }
}
</style>
