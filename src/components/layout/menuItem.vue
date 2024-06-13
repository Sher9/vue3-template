<template>
  <template v-for="(item, index) in menuList">
    <el-sub-menu
      :index="item.name"
      :key="index"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>
        <el-icon><component :is="$icon[item.icon]" /></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <menuItem :menuList="item.children" @selectMenu="handleSelect"></menuItem>
    </el-sub-menu>
    <el-menu-item :index="item.path" :key="item.path" @click="handleSelect(item)" v-else>
      <template #title>
        <el-icon><component :is="$icon[item.icon]" /></el-icon>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup name="menuItem">
import { computed } from "vue";

const router = useRouter();
const props = defineProps({
  menuList: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["selectMenu"]);
const handleSelect = (menuItem) => {
  emit("selectMenu", menuItem);
};
</script>
