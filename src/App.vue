<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * 全局调用函数，有全局单次调用的代码都可以写到这里
 */
const doInit = () => {
  console.log("doInit");
};

onMounted(() => {
  doInit();
});
</script>

<style scoped></style>
