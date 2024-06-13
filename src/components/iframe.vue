<template>
  <div
    class="iframe-container"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
  >
    <iframe ref="Iframe" :src="urlPath" scrolling="auto" frameborder="0" class="frame">
    </iframe>
  </div>
</template>
<script setup name="topTitle">
const urlPath = ref(""); //iframe src 路径
const loading = ref(false);
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  iframeLoad();
});

// 监听当前路由
watch(
  () => router.currentRoute.value,
  () => {
    urlPath.value = getUrlPath();
  }
);

//iframe加载
const iframeLoad = () => {
  loading.value = true;
  const iframe = proxy.$refs.Iframe;
  urlPath.value = getUrlPath();
  if (iframe.attachEvent) {
    // IE
    iframe.attachEvent("onload", () => {
      loading.value = false;
    });
  } else {
    // 非IE
    iframe.onload = () => {
      loading.value = false;
    };
  }
};

const getUrlPath = () => {
  return route.query.url ? route.query.url : "";
};
</script>
<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
  height: 96%;
  .frame {
    width: 100%;
    height: 100%;
  }
}
</style>
